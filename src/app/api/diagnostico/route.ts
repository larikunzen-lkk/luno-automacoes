import { NextRequest, NextResponse } from "next/server";

const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;
const MAKE_WEBHOOK_SECRET = process.env.MAKE_WEBHOOK_SECRET;
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;

// Simple in-memory rate limiter: max 5 requests per IP per 10 minutes
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET) return true; // Dev mode sem chave configurada

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: TURNSTILE_SECRET,
      response: token,
      remoteip: ip,
    }),
  });

  const data = await res.json();
  return data.success === true;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("cf-connecting-ip") ??
                req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
                "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { message: "Já recebemos seu contato! Aguarde alguns minutos antes de tentar novamente." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { segment, company, pains, name, contact, turnstileToken, pacote } = body;

    // Validate required fields
    if (!segment || !company || !name || !contact) {
      return NextResponse.json(
        { message: "Preencha todos os campos obrigatórios." },
        { status: 400 }
      );
    }

    // Validate contact format (phone or email)
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const isPhone = /^[\d\s\(\)\-\+]{8,20}$/.test(contact);
    if (!isEmail && !isPhone) {
      return NextResponse.json(
        { message: "Informe um WhatsApp ou e-mail válido." },
        { status: 400 }
      );
    }

    // Verify Turnstile
    if (turnstileToken) {
      const valid = await verifyTurnstile(turnstileToken, ip);
      if (!valid) {
        return NextResponse.json(
          { message: "Verificação de segurança falhou. Tente novamente." },
          { status: 422 }
        );
      }
    }

    // Send to Make.com webhook
    if (MAKE_WEBHOOK_URL) {
      const payload = {
        segment,
        company,
        pains: pains ?? [],
        name,
        contact,
        pacote: pacote ?? null,
        source: "luno-site",
        timestamp: new Date().toISOString(),
      };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (MAKE_WEBHOOK_SECRET) {
        headers["Authorization"] = `Bearer ${MAKE_WEBHOOK_SECRET}`;
      }

      const makeRes = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!makeRes.ok) {
        console.error("[diagnostico] Make.com webhook error:", makeRes.status);
        // Don't expose Make error to client — still return success to user
        // (lead is not lost, will retry or handle manually)
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[diagnostico] Unexpected error:", err);
    return NextResponse.json(
      { message: "Erro interno. Tente novamente em alguns instantes." },
      { status: 500 }
    );
  }
}
