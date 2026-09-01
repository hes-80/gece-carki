import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gece-carki.vercel.app"),
  title: "Gece Çarkı — doğum haritası",
  applicationName: "Gece Çarkı",
  description:
    "Doğum tarihi ve yeriyle eğlence amaçlı natal okuma: şans, aşk, para, sağlık, kariyer, ruh. Tıbbi veya finansal tavsiye değildir.",
  openGraph: {
    title: "Gece Çarkı",
    description: "Doğum haritası, radar ve günün tarotu. Eğlence amaçlıdır.",
    url: "https://gece-carki.vercel.app",
    locale: "tr_TR",
    type: "website",
  },
  appleWebApp: {
    capable: true,
    title: "Gece Çarkı",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/signs/aslan.jpg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}