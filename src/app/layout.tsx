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
  title: "행복한 감귤농장 - 제주 감귤, 한라봉, 천혜향 직거래 쇼핑몰",
  description: "제주도 서귀포시에서 직접 재배한 프리미엄 감귤, 한라봉, 천혜향, 황금향 등 감귤류를 산지 직송으로 신선하게 만나보세요. 유기농 재배, 당일 수확 배송, 제주 감귤 농장 체험까지.",
  keywords: "제주 감귤, 한라봉, 천혜향, 황금향, 밀감, 감귤 직거래, 제주도 특산품, 과일 선물세트, 제주 감귤농장, 농장 체험",
  authors: [{ name: "행복한 감귤농장", url: "https://jejumandarin.com" }],
  creator: "행복한 감귤농장",
  publisher: "행복한 감귤농장",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://jejumandarin.com",
    title: "행복한 감귤농장 - 제주 감귤, 한라봉, 천혜향 직거래 쇼핑몰",
    description: "제주도 서귀포시에서 직접 재배한 프리미엄 감귤류를 산지 직송으로 신선하게 만나보세요.",
    siteName: "행복한 감귤농장",
  },
  twitter: {
    card: "summary_large_image",
    title: "행복한 감귤농장 - 제주 감귤, 한라봉, 천혜향 직거래 쇼핑몰",
    description: "제주도 서귀포시에서 직접 재배한 프리미엄 감귤류를 산지 직송으로 신선하게 만나보세요.",
  },
  alternates: {
    canonical: "https://jejumandarin.com",
  },
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
              <Link href="/notice" className="hover:underline">공지사항</Link>
              <Link href="/inquiry" className="hover:underline">문의하기</Link>
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
                <h3 className="font-bold text-lg mb-4">바로가기</h3>
                <ul className="space-y-2">
                  <li><Link href="/notice" className="text-gray-600 hover:text-orange-500">공지사항</Link></li>
                  <li><Link href="/inquiry" className="text-gray-600 hover:text-orange-500">문의하기</Link></li>
                  <li><Link href="/" className="text-gray-600 hover:text-orange-500">사이트맵</Link></li>
                  <li><Link href="/" className="text-gray-600 hover:text-orange-500">개인정보처리방침</Link></li>
                </ul>
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
