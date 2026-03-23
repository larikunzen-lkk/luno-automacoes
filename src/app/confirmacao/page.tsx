import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, MessageCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Diagnóstico Recebido! | Luno Automações",
  description: "Seu diagnóstico foi recebido. Agende agora sua conversa com a Luno Automações.",
  robots: { index: false },
};

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;
const WHATSAPP_NUMBER = "5551999999999"; // substituir pelo número real

interface ConfirmacaoPageProps {
  searchParams: Promise<{ nome?: string }>;
}

export default async function ConfirmacaoPage({ searchParams }: ConfirmacaoPageProps) {
  const { nome } = await searchParams;
  const firstName = nome ? nome.split(" ")[0] : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simplified header */}
      <header className="bg-white border-b border-gray-100 py-4 px-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-gray-900 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
            aria-label="Luno Automações — página inicial"
          >
            <span className="flex items-center justify-center w-7 h-7 bg-primary rounded-lg">
              <Zap className="w-3.5 h-3.5 text-white" aria-hidden="true" />
            </span>
            <span>Luno <span className="text-primary">Automações</span></span>
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-1 py-12 px-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
          {/* Success message */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
            <div className="flex justify-center mb-4">
              <span className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full">
                <CheckCircle className="w-8 h-8 text-emerald-600" aria-hidden="true" />
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {firstName ? `Boa, ${firstName}! ` : ""}Recebi seu diagnóstico.
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Analisarei suas respostas e entrarei em contato em até{" "}
              <strong>2 horas úteis</strong> com uma proposta personalizada.
              Para agilizar, agende nossa conversa agora:
            </p>
          </div>

          {/* Calendly embed or fallback */}
          {CALENDLY_URL ? (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">
                  Agende nossa conversa
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Escolha o horário que for melhor para você.
                </p>
              </div>
              <iframe
                src={`${CALENDLY_URL}?embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1`}
                width="100%"
                height="500"
                frameBorder="0"
                title="Agendar conversa com a Luno Automações"
                className="block"
              />
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-2">
                Agende nossa conversa
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Configure a URL do Calendly em{" "}
                <code className="bg-gray-100 px-1 rounded text-xs">NEXT_PUBLIC_CALENDLY_URL</code>{" "}
                para exibir o agendamento aqui.
              </p>
              <Button asChild size="lg">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Acabei de preencher o diagnóstico gratuito no site da Luno Automações.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 w-5 h-5" aria-hidden="true" />
                  Chamar no WhatsApp
                </a>
              </Button>
            </div>
          )}

          {/* WhatsApp alternative */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">Prefere pelo WhatsApp?</p>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Acabei de preencher o diagnóstico gratuito no site da Luno Automações.")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Entrar em contato via WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                Chamar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
