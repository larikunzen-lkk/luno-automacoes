import { Search, FileText, Rocket } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Diagnóstico gratuito",
    description:
      "Em uma conversa de 30 minutos, mapeamos quais processos da sua clínica estão consumindo mais tempo e onde a automação gera mais impacto.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    number: "02",
    icon: FileText,
    title: "Proposta personalizada",
    description:
      "Você recebe uma proposta com o que será automatizado, quanto vai economizar por mês e qual o investimento. Sem surpresas.",
    color: "text-accent-600",
    bg: "bg-accent/10",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Entrega em até 7 dias",
    description:
      "Configuramos tudo, testamos com você e ficamos disponíveis para ajustes. Sem precisar de TI, sem complicação técnica.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-heading"
      className="py-20 px-6 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2
            id="how-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Como funciona
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Do primeiro contato à automação funcionando em produção — 3 etapas simples,
            sem jargão técnico.
          </p>
        </div>

        <ol
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          aria-label="Etapas do processo"
        >
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <li
                key={step.number}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow"
              >
                {/* Step number + icon */}
                <div className="flex items-center gap-4">
                  <span
                    className={`flex items-center justify-center w-12 h-12 rounded-xl ${step.bg}`}
                    aria-hidden="true"
                  >
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </span>
                  <span
                    className="text-4xl font-extrabold text-gray-100 font-mono select-none"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
