"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";

const NAV_LINKS = [{ href: "/servicos", label: "Serviços" }];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, closeMenu]);

  // Close on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
          aria-label="Luno Automações — página inicial"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <span className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Zap className="w-4 h-4 text-white" aria-hidden="true" />
          </span>
          <span>Luno</span>
          <span className="text-primary">Automações</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-1 ${
                pathname === href
                  ? "text-primary font-semibold"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link href="/diagnostico">Diagnóstico gratuito</Link>
          </Button>
        </nav>

        {/* Mobile: hamburger + CTA */}
        <div className="md:hidden flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/diagnostico">Diagnóstico</Link>
          </Button>
          <button
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
          >
            {menuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Menu mobile"
          className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              onClick={closeMenu}
              className={`text-base font-medium py-2 px-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                pathname === href
                  ? "text-primary bg-primary/5 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
