"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export function CookieBanner() {
  const { showBanner, accept, reject } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies e privacidade"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-50 bg-white rounded-2xl shadow-xl border border-gray-200 p-5 flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-300"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <span
          className="flex items-center justify-center w-9 h-9 bg-primary/10 rounded-lg shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <Cookie className="w-5 h-5 text-primary" />
        </span>
        <div>
          <p className="text-sm font-semibold text-gray-900">
            Sua privacidade importa
          </p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Usamos cookies para personalizar anúncios e medir resultados.
            Veja nossa{" "}
            <Link
              href="/privacidade"
              className="text-primary underline underline-offset-2 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm"
            >
              política de privacidade
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={accept}
          size="sm"
          className="flex-1 text-sm"
        >
          Aceitar
        </Button>
        <Button
          onClick={reject}
          variant="ghost"
          size="sm"
          className="flex-1 text-sm text-gray-600 hover:text-gray-900"
        >
          Recusar
        </Button>
      </div>
    </div>
  );
}
