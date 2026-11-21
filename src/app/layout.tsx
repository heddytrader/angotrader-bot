import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AngoTrader Bot - Analisa como os grandes. Opera como angolano.",
  description: "Web app de análise de trading institucional com IA, estratégia EGGY SMC, varredura de liquidez e cobertura completa de Forex, Cripto, Ações, Índices e Commodities.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#07090e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="dark">
      <body className="bg-[#07090e] text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
