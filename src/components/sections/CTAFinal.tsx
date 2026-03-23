import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";

export function CTAFinal() {
  return (
    <section
      aria-labelledby="cta-final-heading"
      className="py-24 px-6 bg-gradient-to-br from-primary to-violet-700"
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Clock className="w-4 h-4" aria-hidden="true" />
          Resposta em até 2 horas úteis
        </div>

        <h2
          id="cta-final-heading"
          className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
        >
          Pronto para parar de fazer
          <br />
          o que a tecnologia pode fazer?
        </h2>

        <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
          Diagnóstico 100% gratuito. Em 30 minutos descobrimos onde a automação
          gera mais resultado para o seu negócio — sem compromisso.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-gray-50 text-base font-semibold"
          >
            <Link href="/diagnostico">
              Quero meu diagnóstico gratuito
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10 border border-white/30 text-base"
          >
            <Link href="/servicos">Ver serviços</Link>
          </Button>
        </div>

        <p className="mt-6 text-sm text-white/60">
          Sem cadastro. Sem cartão de crédito. Apenas uma conversa.
        </p>
      </div>
    </section>
  );
}
