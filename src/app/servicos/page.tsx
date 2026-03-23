import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = {
  title: "Serviços | Luno Automações",
  description:
    "Conheça os pacotes de automação da Luno: Piloto, Automático e Turbo. Preços claros, entrega em até 7 dias.",
};

const PACKAGES = [
  {
    name: "Piloto",
    price: "R$ 597",
    period: "projeto único",
    description:
      "Ideal para validar automação com uma dor específica e medir resultado antes de escalar.",
    features: [
      "1 automação personalizada",
      "Integração com WhatsApp ou e-mail",
      "Documentação do processo",
      "Suporte por 30 dias",
      "Entrega em até 5 dias úteis",
    ],
    notIncluded: [
      "Múltiplas integrações",
      "Manutenção mensal",
    ],
    cta: "Começar com o Piloto",
    featured: false,
  },
  {
    name: "Automático",
    price: "R$ 900",
    period: "projeto único",
    description:
      "O pacote mais completo para clínicas que querem automatizar os processos essenciais de uma vez.",
    features: [
      "Até 3 automações personalizadas",
      "Confirmação automática de consultas",
      "Cobrança e régua de inadimplência",
      "Respostas automáticas no WhatsApp",
      "Integração com Google Agenda/Planilhas",
      "Documentação completa",
      "Suporte por 60 dias",
      "Entrega em até 7 dias úteis",
    ],
    notIncluded: [],
    cta: "Escolher Automático",
    featured: true,
  },
  {
    name: "Turbo",
    price: "Sob consulta",
    period: "projeto customizado",
    description:
      "Para operações complexas que precisam de múltiplas integrações e fluxos customizados.",
    features: [
      "Automações ilimitadas",
      "Integrações customizadas (ERP, CRM, etc.)",
      "Análise de processos completa",
      "Treinamento da equipe",
      "Suporte dedicado por 90 dias",
      "Prazo definido em conjunto",
    ],
    notIncluded: [],
    cta: "Falar sobre o Turbo",
    featured: false,
  },
];

export default function ServicosPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero pequeno */}
        <section
          aria-labelledby="servicos-heading"
          className="py-16 px-6 bg-gradient-to-br from-background via-violet-50/30 to-background"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h1
              id="servicos-heading"
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Escolha como automatizar
            </h1>
            <p className="text-lg text-gray-600">
              Três pacotes pensados para diferentes momentos da sua jornada.
              Todos incluem diagnóstico gratuito e onboarding.
            </p>
          </div>
        </section>

        {/* Packages */}
        <section
          aria-label="Pacotes de serviço"
          className="py-16 px-6 bg-white"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PACKAGES.map((pkg) => (
                <article
                  key={pkg.name}
                  className={`relative flex flex-col rounded-2xl p-8 border transition-shadow hover:shadow-md ${
                    pkg.featured
                      ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary bg-white"
                      : "border-gray-200 bg-white"
                  }`}
                  aria-label={`Pacote ${pkg.name}`}
                >
                  {pkg.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="featured">Mais popular</Badge>
                    </div>
                  )}

                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{pkg.name}</h2>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-4xl font-extrabold text-primary font-mono">
                        {pkg.price}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {pkg.period}
                    </span>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  <ul
                    className="flex flex-col gap-2.5 flex-1 mb-8"
                    aria-label={`Incluso no pacote ${pkg.name}`}
                  >
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check
                          className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        {f}
                      </li>
                    ))}
                    {pkg.notIncluded.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-gray-400 line-through"
                        aria-label={`Não incluso: ${f}`}
                      >
                        <span className="w-4 h-4 shrink-0 mt-0.5 flex items-center justify-center" aria-hidden="true">
                          —
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant={pkg.featured ? "default" : "outline"}
                    size="lg"
                    className="w-full"
                  >
                    <Link href={`/diagnostico?pacote=${pkg.name.toLowerCase()}`}>
                      {pkg.cta}
                      <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </article>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              Não tem certeza qual escolher?{" "}
              <Link
                href="/diagnostico"
                className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm"
              >
                Faça o diagnóstico gratuito
              </Link>{" "}
              e receba uma recomendação personalizada.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <FAQ />

        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
