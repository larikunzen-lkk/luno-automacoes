import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
          aria-label="Luno Automações — página inicial"
        >
          <span className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Zap className="w-4 h-4 text-white" aria-hidden="true" />
          </span>
          <span>Luno</span>
          <span className="text-primary">Automações</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-6">
          <Link
            href="/servicos"
            className="text-sm font-medium text-gray-600 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-1"
          >
            Serviços
          </Link>
          <Button asChild size="sm">
            <Link href="/diagnostico">Diagnóstico gratuito</Link>
          </Button>
        </nav>

        {/* Mobile: CTA only */}
        <div className="md:hidden">
          <Button asChild size="sm">
            <Link href="/diagnostico">Diagnóstico</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
