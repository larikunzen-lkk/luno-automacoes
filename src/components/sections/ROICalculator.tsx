"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

const HOURLY_RATE = 35; // R$ estimado por hora de trabalho manual (mercado brasileiro)
const WEEKS_PER_MONTH = 4.33;
const SERVICE_COST = 900;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ROICalculator() {
  const [hours, setHours] = useState(10);
  const [displayValue, setDisplayValue] = useState(0);
  const monthlyCost = Math.round(hours * HOURLY_RATE * WEEKS_PER_MONTH);
  const roi = monthlyCost - SERVICE_COST;
  const roiPercent = Math.round((roi / SERVICE_COST) * 100);

  // Animate count-up
  const animateValue = useCallback((target: number) => {
    const duration = 600;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setDisplayValue(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cleanup = animateValue(monthlyCost);
    return cleanup;
  }, [monthlyCost, animateValue]);

  return (
    <section
      aria-labelledby="roi-heading"
      className="py-20 px-6 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" aria-hidden="true" />
            Calculadora de ROI
          </div>
          <h2
            id="roi-heading"
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Quanto você perde com trabalho manual?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ajuste o slider com o número de horas que sua equipe gasta por semana
            em tarefas repetitivas. Veja em tempo real quanto isso custa — e quanto
            você economizaria automatizando.
          </p>
        </div>

        {/* Calculator card */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Slider side */}
            <div className="w-full md:w-1/2">
              <label
                htmlFor="hours-slider"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Horas por semana em tarefas manuais
              </label>
              <div className="flex items-center gap-4 mb-4">
                <input
                  id="hours-slider"
                  type="range"
                  min={1}
                  max={80}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-valuemin={1}
                  aria-valuemax={80}
                  aria-valuenow={hours}
                  aria-valuetext={`${hours} horas por semana`}
                />
                <span className="text-2xl font-bold text-primary w-16 text-right font-mono tabular-nums">
                  {hours}h
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>1h</span>
                <span>40h</span>
                <span>80h</span>
              </div>

              <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">
                  Tarefas como: agendamentos manuais, confirmações de consulta,
                  cobranças, respostas repetitivas no WhatsApp.
                </p>
              </div>
            </div>

            {/* Results side */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              {/* Main metric */}
              <div
                className="bg-primary/5 rounded-xl p-6 border border-primary/20"
                aria-live="polite"
                aria-atomic="true"
                aria-label={`Custo mensal estimado: ${formatCurrency(displayValue)}`}
              >
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Custo mensal do trabalho manual
                </p>
                <p className="text-4xl font-bold text-gray-900 font-mono tabular-nums">
                  {formatCurrency(displayValue)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Baseado em R${HOURLY_RATE}/h (custo operacional médio)
                </p>
              </div>

              {/* Comparison */}
              {monthlyCost > SERVICE_COST && (
                <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                  <p className="text-sm font-medium text-emerald-800 mb-1">
                    Economia ao automatizar
                  </p>
                  <p className="text-2xl font-bold text-emerald-700 font-mono tabular-nums">
                    {formatCurrency(roi)}/mês
                  </p>
                  <p className="text-xs text-emerald-600 mt-1">
                    ROI de {roiPercent}% vs. investimento de {formatCurrency(SERVICE_COST)}
                  </p>
                </div>
              )}

              {monthlyCost <= SERVICE_COST && (
                <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    Com esse volume, a automação se paga em ganho de tempo e
                    qualidade — não só em custo. Vamos conversar?
                  </p>
                </div>
              )}

              {/* CTA */}
              <Button asChild size="lg" className="w-full mt-2">
                <Link href="/diagnostico">
                  Automatizar agora
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          * Estimativa baseada em custo operacional médio de R${HOURLY_RATE}/hora.
          Resultado real depende do seu contexto.
        </p>
      </div>
    </section>
  );
}
