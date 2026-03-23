import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";

const PACKAGES = [
  {
    name: "Piloto",
    price: "R$ 597",
    description: "Ideal para testar automação com uma dor específica e medir o resultado.",
    features: ["1 automação personalizada", "Integração com WhatsApp", "Suporte 30 dias"],
    cta: "Começar com o Piloto",
    featured: false,
  },
  {
    name: "Automático",
    price: "R$ 900",
    description: "O pacote mais completo para clínicas que querem automatizar o essencial.",
    features: [
      "Até 3 automações",
      "Confirmação de consultas",
      "Cobrança automática",
      "Suporte 60 dias",
    ],
    cta: "Escolher Automático",
    featured: true,
  },
  {
    name: "Turbo",
    price: "Sob consulta",
    description: "Para operações complexas que precisam de múltiplas integrações.",
    features: ["Automações ilimitadas", "Integrações customizadas", "Suporte dedicado"],
    cta: "Falar sobre o Turbo",
    featured: false,
  },
];

export function PackagesPreview() {
  return (
    <section
      aria-labelledby="packages-heading"
      className="py-20 px-6 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2
            id="packages-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Escolha como automatizar
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Três pacotes pensados para diferentes momentos da sua jornada.
            Todos incluem diagnóstico e onboarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.name}
              className={`relative bg-white rounded-2xl p-8 border flex flex-col gap-5 transition-shadow hover:shadow-md ${
                pkg.featured
                  ? "border-primary shadow-lg shadow-primary/10 ring-1 ring-primary"
                  : "border-gray-200"
              }`}
              aria-label={`Pacote ${pkg.name}`}
            >
              {pkg.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="featured">Mais popular</Badge>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
                <p className="text-3xl font-extrabold text-primary font-mono">
                  {pkg.price}
                </p>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              <ul className="flex flex-col gap-2 flex-1" aria-label={`Incluso no pacote ${pkg.name}`}>
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={pkg.featured ? "default" : "outline"}
                className="w-full"
              >
                <Link href={`/diagnostico?pacote=${pkg.name.toLowerCase()}`}>
                  {pkg.cta}
                </Link>
              </Button>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="ghost">
            <Link href="/servicos" className="gap-2">
              Ver detalhes completos dos pacotes
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
