import { Badge } from "@/components/ui/badge";
import { TrendingDown, Clock, MessageCircle } from "lucide-react";

const CASES = [
  {
    segment: "Clínica",
    title: "Clínica odontológica — Curitiba",
    challenge:
      "Recepcionista gastava 3h/dia confirmando consultas manualmente pelo WhatsApp. Taxa de faltas chegava a 25%.",
    solution:
      "Automação de confirmação 48h antes com resposta automática e lista de espera para horários cancelados.",
    metrics: [
      { icon: TrendingDown, label: "Redução de faltas", value: "38%", color: "text-emerald-600" },
      { icon: Clock, label: "Horas economizadas/mês", value: "52h", color: "text-primary" },
      { icon: MessageCircle, label: "Confirmações automáticas", value: "100%", color: "text-accent-600" },
    ],
    disclaimer: true,
  },
  {
    segment: "Academia",
    title: "Academia funcional — São Paulo",
    challenge:
      "Cobrança manual de mensalidades gerava inadimplência de 18% e consumia tempo do gestor toda virada de mês.",
    solution:
      "Régua de cobrança automatizada: lembrete 5 dias antes, boleto no vencimento, follow-up 3 e 7 dias após.",
    metrics: [
      { icon: TrendingDown, label: "Queda na inadimplência", value: "60%", color: "text-emerald-600" },
      { icon: Clock, label: "Horas economizadas/mês", value: "18h", color: "text-primary" },
      { icon: MessageCircle, label: "Cobranças sem contato manual", value: "94%", color: "text-accent-600" },
    ],
    disclaimer: true,
  },
];

export function Cases() {
  return (
    <section
      aria-labelledby="cases-heading"
      className="py-20 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2
            id="cases-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Resultados reais
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Exemplos representativos do impacto que automação bem feita gera em
            negócios como o seu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASES.map((c) => (
            <article
              key={c.title}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200 flex flex-col gap-5 hover:shadow-md transition-shadow"
              aria-label={`Case: ${c.title}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge variant="category" className="mb-3">
                    {c.segment}
                  </Badge>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {c.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Desafio
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.challenge}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Solução
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.solution}</p>
                </div>
              </div>

              {/* Metrics */}
              <dl className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-200">
                {c.metrics.map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="text-center">
                    <Icon
                      className={`w-4 h-4 mx-auto mb-1 ${color}`}
                      aria-hidden="true"
                    />
                    <dd
                      className={`text-xl font-bold font-mono tabular-nums ${color}`}
                    >
                      {value}
                    </dd>
                    <dt className="text-xs text-gray-500 leading-tight mt-0.5">
                      {label}
                    </dt>
                  </div>
                ))}
              </dl>

              {c.disclaimer && (
                <p className="text-xs text-gray-400 border-t border-gray-100 pt-3">
                  * Dados baseados em cenários representativos. Resultados reais
                  variam conforme o contexto de cada negócio.
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
