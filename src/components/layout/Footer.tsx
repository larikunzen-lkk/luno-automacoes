import Link from "next/link";
import { Zap, Instagram, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-md w-fit"
              aria-label="Luno Automações — página inicial"
            >
              <span className="flex items-center justify-center w-7 h-7 bg-primary rounded-lg">
                <Zap className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              </span>
              <span>Luno <span className="text-primary">Automações</span></span>
            </Link>
            <p className="text-sm leading-relaxed">
              A geração imediatista não espera. Sua operação também não deveria.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Links do rodapé" className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Links
            </p>
            <Link
              href="/servicos"
              className="text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-sm"
            >
              Serviços
            </Link>
            <Link
              href="/diagnostico"
              className="text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-sm"
            >
              Diagnóstico gratuito
            </Link>
            <Link
              href="/privacidade"
              className="text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-sm"
            >
              Privacidade
            </Link>
          </nav>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Contato
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/lunoautomacoes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Luno Automações no Instagram"
                className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-sm p-0.5"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://facebook.com/lunoautomacoes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Luno Automações no Facebook"
                className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-sm p-0.5"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="mailto:contato@lunoautomacoes.com.br"
                aria-label="Enviar e-mail para a Luno Automações"
                className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-sm p-0.5"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-xs text-gray-600 text-center">
          © {new Date().getFullYear()} Luno Automações. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
