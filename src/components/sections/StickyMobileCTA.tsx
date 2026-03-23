"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SCROLL_THRESHOLD = 300;

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-3 shadow-lg"
      role="complementary"
      aria-label="Botão de ação rápida"
    >
      <Button asChild size="lg" className="w-full text-base font-semibold">
        <Link href="/diagnostico">
          Diagnóstico gratuito
          <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
}
