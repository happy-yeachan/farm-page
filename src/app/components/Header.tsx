'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  return (
    <header className="bg-orange-500 text-white shadow-md sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link href="/" className="text-xl md:text-2xl font-bold flex items-center">
            <span className="mr-2">🍊</span>
            <span className="hidden sm:inline">행복한 감귤농장</span>
            <span className="sm:hidden">감귤농장</span>
          </Link>
          
          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:underline">홈</Link>
            <Link href="/products" className="hover:underline">상품 목록</Link>
            <Link href="/notice" className="hover:underline">공지사항</Link>
            <Link href="/inquiry" className="hover:underline">문의하기</Link>
            <Link href="/cart" className="hover:underline">장바구니</Link>
            <Link href="/login" className="hover:underline">로그인</Link>
          </div>
          
          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <span className="text-2xl">×</span>
              ) : (
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* 모바일 메뉴 패널 */}
        <div 
          className={`${
            isMenuOpen ? 'max-h-60' : 'max-h-0'
          } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col space-y-3 pb-4">
            <Link href="/" className="hover:bg-orange-600 px-2 py-2 rounded">홈</Link>
            <Link href="/products" className="hover:bg-orange-600 px-2 py-2 rounded">상품 목록</Link>
            <Link href="/notice" className="hover:bg-orange-600 px-2 py-2 rounded">공지사항</Link>
            <Link href="/inquiry" className="hover:bg-orange-600 px-2 py-2 rounded">문의하기</Link>
            <Link href="/cart" className="hover:bg-orange-600 px-2 py-2 rounded">장바구니</Link>
            <Link href="/login" className="hover:bg-orange-600 px-2 py-2 rounded">로그인</Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 