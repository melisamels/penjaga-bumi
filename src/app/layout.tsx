import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🌍 PENJAGA BUMI AI — Selamatkan Bumi, Satu Misi Sekaligus!",
  description: "Game web edukasi petualangan penjaga bumi untuk anak SD. Selamatkan bumi dengan aksi nyata!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className="antialiased min-h-screen bg-slate-900 text-slate-800">
        {children}
      </body>
    </html>
  );
}
