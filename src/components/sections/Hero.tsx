import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const PROOF_POINTS = [
  "Sem contratar mais funcionários",
  "Resultados em até 7 dias",
  "Suporte incluso",
];

const INTEGRATIONS = [
  { name: "Make", label: "Make.com" },
  { name: "n8n", label: "n8n" },
  { name: "Zapier", label: "Zapier" },
  { name: "Google", label: "Google" },
  { name: "WhatsApp", label: "WhatsApp" },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background via-violet-50/40 to-background py-20 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" aria-hidden="true" />
            Automação para clínicas brasileiras
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
          >
            A geração imediatista{" "}
            <span className="text-primary">não espera.</span>
            <br />
            Sua operação{" "}
            <span className="text-primary">também não deveria.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
            Confirmação automática de consultas, resposta instantânea no WhatsApp
            e cobranças sem intervenção manual. Enquanto você cuida dos pacientes,
            a Luno cuida da operação.
          </p>

          {/* Proof points */}
          <ul className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-10" aria-label="Diferenciais">
            {PROOF_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-base font-semibold">
              <Link href="/diagnostico">
                Quero meu diagnóstico gratuito
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link href="/servicos">Ver serviços e preços</Link>
            </Button>
          </div>

          {/* Social proof */}
          <p className="mt-6 text-xs text-gray-500">
            Diagnóstico 100% gratuito, sem compromisso. Resposta em até 2h úteis.
          </p>
        </div>

        {/* Integrations strip */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
            Integramos com as ferramentas que você já usa
          </p>
          <div
            className="flex flex-wrap gap-3"
            role="list"
            aria-label="Integrações disponíveis"
          >
            {INTEGRATIONS.map(({ name, label }) => (
              <div
                key={name}
                role="listitem"
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
              >
                <span aria-hidden="true" className="text-primary font-bold text-xs">
                  {name[0]}
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
