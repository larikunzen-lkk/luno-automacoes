import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SkipLink } from "@/components/ui/skip-link";
import { CookieBanner } from "@/components/cookies/CookieBanner";
import { MetaPixelLoader } from "@/components/cookies/MetaPixelLoader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luno Automações | Automatize sua clínica e escale sem contratar",
  description:
    "Confirmação automática de consultas, redução de faltas e atendimento 24h no WhatsApp. Soluções de automação para clínicas, academias e e-commerces.",
  keywords: [
    "automação para clínicas",
    "automação de processos",
    "WhatsApp automático",
    "agendamento automático",
    "Make.com",
    "n8n",
    "Zapier",
  ],
  authors: [{ name: "Luno Automações" }],
  metadataBase: new URL("https://luno-automacoes.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Luno Automações | Automatize sua clínica e escale sem contratar",
    description:
      "A geração imediatista não espera. Sua operação também não deveria.",
    type: "website",
    locale: "pt_BR",
    url: "https://luno-automacoes.vercel.app",
    siteName: "Luno Automações",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luno Automações | Automatize sua clínica e escale sem contratar",
    description:
      "A geração imediatista não espera. Sua operação também não deveria.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SkipLink />
        {children}
        <CookieBanner />
        <MetaPixelLoader />
      </body>
    </html>
  );
}
