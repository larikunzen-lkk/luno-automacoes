"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
import { Button } from "@/components/ui/button";
import { FormStepper } from "./FormStepper";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

const STEP_LABELS = ["Segmento", "Desafio", "Contato", "Confirmação"];
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const SEGMENTS = [
  { value: "clinica", label: "Clínica", emoji: "🏥" },
  { value: "academia", label: "Academia", emoji: "🏋️" },
  { value: "ecommerce", label: "E-commerce", emoji: "🛒" },
  { value: "outro", label: "Outro", emoji: "🏢" },
];

const PAINS = [
  { value: "agendamentos", label: "Agendamentos manuais" },
  { value: "cobrancas", label: "Cobranças e inadimplência" },
  { value: "atendimento", label: "Atendimento no WhatsApp" },
  { value: "relatorios", label: "Relatórios e planilhas" },
];

interface FormData {
  segment: string;
  company: string;
  pains: string[];
  name: string;
  contact: string;
  turnstileToken: string;
}

const INITIAL: FormData = {
  segment: "",
  company: "",
  pains: [],
  name: "",
  contact: "",
  turnstileToken: "",
};

export function DiagnosticoForm({ pacote }: { pacote?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const next = useCallback(() => setStep((s) => Math.min(s + 1, 4)), []);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 1)), []);

  const togglePain = (value: string) => {
    setData((d) => ({
      ...d,
      pains: d.pains.includes(value)
        ? d.pains.filter((p) => p !== value)
        : [...d.pains, value],
    }));
  };

  const handleSubmit = async () => {
    if (!data.turnstileToken) {
      setError("Complete a verificação de segurança.");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, pacote }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Erro ao enviar. Tente novamente.");
      }

      router.push(`/confirmacao?nome=${encodeURIComponent(data.name)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <FormStepper currentStep={step} totalSteps={4} labels={STEP_LABELS} />

      <div className="mt-10 min-h-[320px]">
        {/* Step 1 — Segmento */}
        {step === 1 && (
          <fieldset>
            <legend className="text-2xl font-bold text-gray-900 mb-2">
              Qual é o seu segmento?
            </legend>
            <p className="text-gray-500 text-sm mb-6">
              Isso nos ajuda a preparar as melhores opções para você.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6" role="group" aria-label="Segmento do negócio">
              {SEGMENTS.map(({ value, label, emoji }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setData((d) => ({ ...d, segment: value }))}
                  aria-pressed={data.segment === value}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    data.segment === value
                      ? "border-primary bg-primary/5 text-primary font-semibold"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl" aria-hidden="true">{emoji}</span>
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Nome da empresa
              </label>
              <input
                id="company"
                type="text"
                value={data.company}
                onChange={(e) => setData((d) => ({ ...d, company: e.target.value }))}
                placeholder="Ex: Clínica Saúde Total"
                autoComplete="organization"
                className="w-full h-11 px-4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              />
            </div>

            <Button
              onClick={next}
              disabled={!data.segment || !data.company.trim()}
              size="lg"
              className="w-full"
            >
              Próximo
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Button>
          </fieldset>
        )}

        {/* Step 2 — Dores */}
        {step === 2 && (
          <fieldset>
            <legend className="text-2xl font-bold text-gray-900 mb-2">
              O que mais toma seu tempo?
            </legend>
            <p className="text-gray-500 text-sm mb-6">
              Selecione um ou mais desafios que sua equipe enfrenta.
            </p>

            <div className="flex flex-col gap-3 mb-8" role="group" aria-label="Principais desafios">
              {PAINS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => togglePain(value)}
                  aria-pressed={data.pains.includes(value)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    data.pains.includes(value)
                      ? "border-primary bg-primary/5 text-primary font-semibold"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="text-sm">{label}</span>
                  <span
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                      data.pains.includes(value)
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                    aria-hidden="true"
                  >
                    {data.pains.includes(value) && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button onClick={back} variant="outline" size="lg" className="flex-1">
                <ArrowLeft className="mr-2 w-5 h-5" aria-hidden="true" />
                Voltar
              </Button>
              <Button
                onClick={next}
                disabled={data.pains.length === 0}
                size="lg"
                className="flex-1"
              >
                Próximo
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          </fieldset>
        )}

        {/* Step 3 — Contato */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Quase lá! Como posso te chamar?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Entraremos em contato em até 2 horas úteis.
            </p>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Seu nome
                </label>
                <input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                  placeholder="Ex: Ana Silva"
                  autoComplete="name"
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                />
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  WhatsApp ou e-mail
                </label>
                <input
                  id="contact"
                  type="text"
                  value={data.contact}
                  onChange={(e) => setData((d) => ({ ...d, contact: e.target.value }))}
                  placeholder="(51) 99999-9999 ou email@empresa.com"
                  autoComplete="tel"
                  className="w-full h-11 px-4 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                />
              </div>
            </div>

            {/* Turnstile */}
            {SITE_KEY && (
              <div className="mb-6 flex justify-center">
                <Turnstile
                  siteKey={SITE_KEY}
                  onSuccess={(token) => setData((d) => ({ ...d, turnstileToken: token }))}
                  onError={() => setError("Falha na verificação. Recarregue a página.")}
                />
              </div>
            )}

            {/* Error */}
            {error && (
              <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-4">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <Button onClick={back} variant="outline" size="lg" className="flex-1">
                <ArrowLeft className="mr-2 w-5 h-5" aria-hidden="true" />
                Voltar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!data.name.trim() || !data.contact.trim() || submitting || (!SITE_KEY ? false : !data.turnstileToken)}
                size="lg"
                className="flex-1"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar
                    <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
