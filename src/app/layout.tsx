import type { Metadata } from "next";
import { Abhaya_Libre, Montserrat } from 'next/font/google'
import "./globals.css";

const abhayaLibre = Abhaya_Libre({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-abhaya-libre',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Lahiru Laddusinghe Photography",
  description: "Professional Photography Services in Sri Lanka",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${abhayaLibre.variable} ${montserrat.variable} font-sans`}>{children}</body>
    </html>
  );
}
