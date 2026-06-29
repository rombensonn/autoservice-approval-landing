import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./design-system.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Согласование допработ для автосервисов — меньше простоев и звонков",
  description:
    "Сервис для автосервисов: отправляйте клиенту фото, цену и срок по ссылке, фиксируйте решение и сокращайте простой машин на согласовании дополнительных работ.",
  icons: {
    icon: "/favicon.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
