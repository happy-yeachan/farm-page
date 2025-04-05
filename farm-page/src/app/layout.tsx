import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "신선한 농장 - 농산물 직거래 마켓",
  description: "신선한 농산물을 직거래로 만나보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-green-600 text-white p-4 shadow-md">
          <nav className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">신선한 농장</Link>
            <div className="flex space-x-6">
              <Link href="/" className="hover:underline">홈</Link>
              <Link href="/products" className="hover:underline">상품 목록</Link>
              <Link href="/cart" className="hover:underline">장바구니</Link>
            </div>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto py-8 px-4">
          {children}
        </main>
        <footer className="bg-gray-100 mt-12 py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-gray-600">© 2024 신선한 농장. 모든 권리 보유.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
