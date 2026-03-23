import type { Metadata } from "next";
import Link from "next/link";
import { Zap } from "lucide-react";
import { DiagnosticoForm } from "@/components/forms/DiagnosticoForm";

export const metadata: Metadata = {
  title: "Diagnóstico Gratuito | Luno Automações",
  description:
    "Descubra em 3 minutos quais processos da sua clínica podem ser automatizados. Diagnóstico gratuito, sem compromisso.",
};

interface DiagnosticoPageProps {
  searchParams: Promise<{ pacote?: string }>;
}

export default async function DiagnosticoPage({ searchParams }: DiagnosticoPageProps) {
  const { pacote } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simplified header */}
      <header className="bg-white border-b border-gray-100 py-4 px-6">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
            aria-label="Luno Automações — página inicial"
          >
            <span className="flex items-center justify-center w-7 h-7 bg-primary rounded-lg">
              <Zap className="w-3.5 h-3.5 text-white" aria-hidden="true" />
            </span>
            <span>Luno <span className="text-primary">Automações</span></span>
          </Link>
          <span className="text-sm text-gray-500">Diagnóstico gratuito</span>
        </div>
      </header>

      {/* Form */}
      <main id="main-content" className="flex-1 flex items-start justify-center py-12 px-6">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {pacote && (
            <div className="mb-6 text-xs bg-primary/5 text-primary border border-primary/20 rounded-lg px-3 py-2 font-medium">
              Pacote selecionado: <span className="capitalize">{pacote}</span>
            </div>
          )}
          <DiagnosticoForm pacote={pacote} />
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="py-4 px-6 text-center">
        <p className="text-xs text-gray-400">
          Seus dados estão seguros.{" "}
          <Link
            href="/privacidade"
            className="underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm"
          >
            Política de Privacidade
          </Link>
        </p>
      </footer>
    </div>
  );
}
