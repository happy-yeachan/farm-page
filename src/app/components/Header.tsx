'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getCartItemsCount } from "@/app/lib/cartUtils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  // 장바구니 개수 및 로그인 상태 확인
  useEffect(() => {
    try {
      // 로그인 상태 확인
      const userData = localStorage.getItem('user');
      const loggedIn = !!userData;
      setIsLoggedIn(loggedIn);
      
      // 장바구니 개수 가져오기
      const count = getCartItemsCount(loggedIn);
      setCartCount(count);
      
      // 장바구니 변경 감지
      const handleStorageChange = () => {
        const newCount = getCartItemsCount(loggedIn);
        setCartCount(newCount);
      };
      
      window.addEventListener('storage', handleStorageChange);
      
      // 커스텀 이벤트 리스너 추가
      const handleCartChange = () => {
        const newCount = getCartItemsCount(loggedIn);
        setCartCount(newCount);
      };
      
      window.addEventListener('cartChange', handleCartChange);
      
      // 주기적 확인
      const intervalId = setInterval(() => {
        const newCount = getCartItemsCount(loggedIn);
        if (newCount !== cartCount) {
          setCartCount(newCount);
        }
      }, 3000);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('cartChange', handleCartChange);
        clearInterval(intervalId);
      };
    } catch (error) {
      console.error('장바구니 정보 로드 오류:', error);
    }
  }, [pathname, cartCount]);
  
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
            <Link href="/cart" className="hover:underline relative">
              장바구니
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
            <Link href="/login" className="hover:underline">로그인</Link>
          </div>
          
          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden flex items-center">
            <Link href="/cart" className="mr-3 relative">
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
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
            <Link href="/cart" className="hover:bg-orange-600 px-2 py-2 rounded flex items-center">
              장바구니
              {cartCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
            <Link href="/login" className="hover:bg-orange-600 px-2 py-2 rounded">로그인</Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 