import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidade | Luno Automações",
  description:
    "Como a Luno Automações coleta, usa e protege seus dados pessoais conforme a LGPD.",
};

export default function PrivacidadePage() {
  const updated = "22 de março de 2026";

  return (
    <main id="main-content" className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Voltar para o início
        </Link>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Política de Privacidade
          </h1>
          <p className="text-sm text-gray-500">
            Última atualização: {updated}
          </p>
        </header>

        {/* Content */}
        <article className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
          <section aria-labelledby="intro-heading">
            <h2 id="intro-heading" className="text-xl font-semibold text-gray-900 mb-3">
              1. Quem somos
            </h2>
            <p>
              A <strong>Luno Automações</strong> é uma prestadora de serviços de automação de
              processos para pequenas e médias empresas brasileiras. Este site é operado por
              Larissa Kuster, responsável pelo tratamento dos dados pessoais aqui coletados.
            </p>
          </section>

          <section aria-labelledby="dados-heading">
            <h2 id="dados-heading" className="text-xl font-semibold text-gray-900 mb-3">
              2. Dados que coletamos
            </h2>
            <p>Coletamos apenas os dados necessários para prestar nossos serviços:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong>Formulário de diagnóstico:</strong> nome, WhatsApp ou e-mail,
                segmento do negócio e principal dor operacional.
              </li>
              <li>
                <strong>Cookies de analytics:</strong> somente com seu consentimento,
                via Meta Pixel (Facebook/Instagram) para medir efetividade de anúncios.
              </li>
              <li>
                <strong>Logs técnicos:</strong> dados de acesso gerados automaticamente
                pelo servidor (IP, navegador, horário) por motivos de segurança.
              </li>
            </ul>
          </section>

          <section aria-labelledby="uso-heading">
            <h2 id="uso-heading" className="text-xl font-semibold text-gray-900 mb-3">
              3. Como usamos seus dados
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Entrar em contato para responder seu diagnóstico gratuito</li>
              <li>Enviar proposta personalizada de automação</li>
              <li>Agendar conversa via Calendly (caso você solicite)</li>
              <li>Medir o desempenho de campanhas de anúncio (com seu consentimento)</li>
            </ul>
            <p className="mt-3">
              <strong>Não vendemos, alugamos ou compartilhamos seus dados</strong> com
              terceiros para fins comerciais.
            </p>
          </section>

          <section aria-labelledby="cookies-heading">
            <h2 id="cookies-heading" className="text-xl font-semibold text-gray-900 mb-3">
              4. Cookies e rastreamento
            </h2>
            <p>
              Utilizamos o <strong>Meta Pixel</strong> (Facebook/Instagram) exclusivamente
              para medir conversões de anúncios pagos. Este cookie só é ativado
              <strong> após seu consentimento explícito</strong> no banner que aparece
              na primeira visita.
            </p>
            <p className="mt-2">
              Você pode revogar o consentimento a qualquer momento limpando os dados
              do navegador (<code className="bg-gray-100 px-1 rounded text-sm">localStorage</code>)
              ou entrando em contato conosco.
            </p>
          </section>

          <section aria-labelledby="direitos-heading">
            <h2 id="direitos-heading" className="text-xl font-semibold text-gray-900 mb-3">
              5. Seus direitos (LGPD — Lei 13.709/2018)
            </h2>
            <p>Como titular de dados, você tem direito a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Confirmar se tratamos seus dados</li>
              <li>Acessar os dados que temos sobre você</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a exclusão dos seus dados</li>
              <li>Revogar consentimento a qualquer momento</li>
              <li>Solicitar portabilidade dos dados</li>
            </ul>
            <p className="mt-3">
              Para exercer qualquer um desses direitos, entre em contato por e-mail:
              <a
                href="mailto:contato@lunoautomacoes.com.br"
                className="text-primary hover:underline ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm"
              >
                contato@lunoautomacoes.com.br
              </a>
            </p>
          </section>

          <section aria-labelledby="retencao-heading">
            <h2 id="retencao-heading" className="text-xl font-semibold text-gray-900 mb-3">
              6. Retenção de dados
            </h2>
            <p>
              Dados de leads são mantidos por até <strong>24 meses</strong> após o último
              contato ou enquanto houver relação comercial ativa. Após esse período,
              os dados são excluídos ou anonimizados.
            </p>
          </section>

          <section aria-labelledby="contato-heading">
            <h2 id="contato-heading" className="text-xl font-semibold text-gray-900 mb-3">
              7. Contato e encarregado
            </h2>
            <p>
              Responsável pelo tratamento de dados:<br />
              <strong>Larissa Kuster — Luno Automações</strong><br />
              E-mail:{" "}
              <a
                href="mailto:contato@lunoautomacoes.com.br"
                className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-sm"
              >
                contato@lunoautomacoes.com.br
              </a>
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
