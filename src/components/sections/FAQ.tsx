"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Preciso ter uma equipe de TI para isso funcionar?",
    a: "Não. Configuramos tudo para você — do início ao fim. Basta ter acesso ao WhatsApp Business e ao Google Agenda (ou o sistema que você já usa). Nenhum conhecimento técnico necessário.",
  },
  {
    q: "Quanto tempo leva para a automação estar funcionando?",
    a: "A maioria dos projetos fica no ar em até 7 dias úteis após o diagnóstico e aprovação da proposta. Projetos Turbo com múltiplas integrações podem levar de 15 a 30 dias — definimos o prazo juntos.",
  },
  {
    q: "O que acontece se a automação parar de funcionar?",
    a: "Todos os pacotes incluem suporte pós-entrega (30 a 90 dias). Se algo parar de funcionar por falha da automação nesse período, corrigimos sem custo adicional. Também fornecemos documentação completa para você entender o que foi feito.",
  },
  {
    q: "R$ 900 é caro para o tamanho da minha clínica?",
    a: "Depende do quanto você perde hoje. Se sua equipe gasta 10 horas por semana em tarefas manuais — confirmações, cobranças, respostas repetitivas — o custo mensal disso é R$ 1.500 a R$ 2.000 em horas. A automação se paga no primeiro mês.",
  },
  {
    q: "Funciona com o sistema que já uso (agenda, prontuário)?",
    a: "Na maioria dos casos, sim. Trabalhamos com Make.com, n8n e Zapier, que integram com centenas de ferramentas. No diagnóstico gratuito verificamos a compatibilidade com os seus sistemas antes de qualquer comprometimento.",
  },
  {
    q: "E se eu quiser cancelar ou mudar de ideia?",
    a: "Os projetos são pagamento único — não há assinatura ou fidelidade. Se após o diagnóstico você decidir não avançar, tudo bem. Sem pressão.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section aria-labelledby="faq-heading" className="py-20 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2
          id="faq-heading"
          className="text-3xl font-bold text-gray-900 mb-10 text-center"
        >
          Perguntas frequentes
        </h2>

        <dl className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <dt>
                <button
                  type="button"
                  id={`faq-btn-${i}`}
                  aria-expanded={open === i}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                >
                  {faq.q}
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200",
                      open === i && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </button>
              </dt>
              <dd
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                hidden={open !== i}
                className="px-6 pb-5 text-sm text-gray-600 leading-relaxed"
              >
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
