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
  title: "행복한 감귤농장 - 제주 직송 농산물 마켓",
  description: "제주도에서 직접 재배한 신선한 감귤과 농산물을 만나보세요",
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
        <header className="bg-orange-500 text-white p-4 shadow-md">
          <nav className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold flex items-center">
              <span className="mr-2">🍊</span>
              행복한 감귤농장
            </Link>
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
        <footer className="bg-blue-50 mt-12 py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">행복한 감귤농장</h3>
                <p className="text-gray-600">제주특별자치도 서귀포시 감귤로 123</p>
                <p className="text-gray-600">전화: 064-123-4567</p>
                <p className="text-gray-600">이메일: hello@jejumandarin.com</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">농장 소개</h3>
                <p className="text-gray-600">제주도 해안가에 위치한 친환경 감귤 농장입니다. 제주의 맑은 공기와 깨끗한 물로 재배한 감귤을 직접 배송해 드립니다.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">영업 시간</h3>
                <p className="text-gray-600">온라인 주문: 24시간</p>
                <p className="text-gray-600">농장 방문: 9:00 - 17:00 (월-토)</p>
                <p className="text-gray-600">휴무일: 일요일</p>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-8 pt-8 text-center">
              <p className="text-gray-600">© 2024 행복한 감귤농장. 모든 권리 보유.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
