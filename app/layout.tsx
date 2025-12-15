import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EnCasa - Profesionales de confianza en Mar del Plata",
  description:
    "Encontrá electricistas, plomeros, carpinteros y más en Mar del Plata. Profesionales verificados, con reseñas reales. Respuesta en menos de 2 horas.",
  keywords:
    "profesionales mar del plata, electricista, plomero, carpintero, servicios hogar, reparaciones",
  openGraph: {
    title: "EnCasa - Profesionales de confianza en Mar del Plata",
    description:
      "Profesionales verificados para tu hogar. Respuesta en menos de 2 horas.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
