'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<{email: string, isAdmin: boolean, name: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 페이지 로드 시 로그인 상태 확인
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user.isAdmin) {
            setUserData(user);
            setLoading(false);
            return;
          }
        } 
        // 관리자가 아니거나 로그인되지 않은 경우
        router.push('/login');
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">인증 확인 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">관리자 대시보드</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            안녕하세요, {userData?.name}님. 행복한 감귤농장 관리자 페이지입니다.
          </p>
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem('user');
            router.push('/login');
          }}
          className="bg-orange-100 text-orange-800 px-3 sm:px-4 py-2 rounded-lg hover:bg-orange-200 text-sm sm:text-base"
        >
          로그아웃
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* 주문 통계 카드 */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 border-l-4 border-orange-500">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">주문 현황</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">신규 주문</p>
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">12</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">배송 중</p>
              <p className="text-2xl sm:text-3xl font-bold text-orange-400">8</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">완료</p>
              <p className="text-2xl sm:text-3xl font-bold text-orange-300">24</p>
            </div>
          </div>
        </div>

        {/* 상품 통계 카드 */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 border-l-4 border-green-500">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">상품 현황</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">총 상품</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">15</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">품절</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-400">2</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">할인 중</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-300">5</p>
            </div>
          </div>
        </div>

        {/* 회원 통계 카드 */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 border-l-4 border-blue-500">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">회원 현황</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">총 회원</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">138</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">신규 회원</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-400">7</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">문의</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-300">3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* 관리 메뉴 */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">관리 메뉴</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
            <Link 
              href="/admin/products"
              className="flex items-center p-3 sm:p-4 border rounded-lg hover:bg-orange-50"
            >
              <span className="text-xl mr-2 sm:mr-3">📦</span>
              <div>
                <p className="font-medium text-sm sm:text-base">상품 관리</p>
                <p className="text-xs sm:text-sm text-gray-500">상품 등록 및 수정</p>
              </div>
            </Link>
            <Link 
              href="/admin/orders" 
              className="flex items-center p-3 sm:p-4 border rounded-lg hover:bg-orange-50"
            >
              <span className="text-xl mr-2 sm:mr-3">🚚</span>
              <div>
                <p className="font-medium text-sm sm:text-base">주문 관리</p>
                <p className="text-xs sm:text-sm text-gray-500">주문 확인 및 배송 관리</p>
              </div>
            </Link>
            <Link 
              href="/admin/members" 
              className="flex items-center p-3 sm:p-4 border rounded-lg hover:bg-orange-50"
            >
              <span className="text-xl mr-2 sm:mr-3">👥</span>
              <div>
                <p className="font-medium text-sm sm:text-base">회원 관리</p>
                <p className="text-xs sm:text-sm text-gray-500">회원 정보 및 등급 관리</p>
              </div>
            </Link>
            <Link 
              href="/admin/notices" 
              className="flex items-center p-3 sm:p-4 border rounded-lg hover:bg-orange-50"
            >
              <span className="text-xl mr-2 sm:mr-3">📢</span>
              <div>
                <p className="font-medium text-sm sm:text-base">공지사항 관리</p>
                <p className="text-xs sm:text-sm text-gray-500">공지 등록 및 수정</p>
              </div>
            </Link>
            <Link 
              href="/admin/inquiries" 
              className="flex items-center p-3 sm:p-4 border rounded-lg hover:bg-orange-50"
            >
              <span className="text-xl mr-2 sm:mr-3">💬</span>
              <div>
                <p className="font-medium text-sm sm:text-base">문의 관리</p>
                <p className="text-xs sm:text-sm text-gray-500">고객 문의 답변</p>
              </div>
            </Link>
            <Link 
              href="/admin/settings" 
              className="flex items-center p-3 sm:p-4 border rounded-lg hover:bg-orange-50"
            >
              <span className="text-xl mr-2 sm:mr-3">⚙️</span>
              <div>
                <p className="font-medium text-sm sm:text-base">사이트 설정</p>
                <p className="text-xs sm:text-sm text-gray-500">기본 설정 및 배너 관리</p>
              </div>
            </Link>
          </div>
        </div>

        {/* 최근 주문 */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">최근 주문</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-orange-50">
                  <th className="p-2 text-left">주문번호</th>
                  <th className="p-2 text-left">고객명</th>
                  <th className="hidden sm:table-cell p-2 text-left">상품</th>
                  <th className="p-2 text-right">금액</th>
                  <th className="p-2 text-center">상태</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">ORD-2403-001</td>
                  <td className="p-2">김제주</td>
                  <td className="hidden sm:table-cell p-2">프리미엄 한라봉 선물세트</td>
                  <td className="p-2 text-right">58,000원</td>
                  <td className="p-2 text-center">
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap">배송준비</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">ORD-2403-002</td>
                  <td className="p-2">이한라</td>
                  <td className="hidden sm:table-cell p-2">천혜향 3kg</td>
                  <td className="p-2 text-right">42,000원</td>
                  <td className="p-2 text-center">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap">배송중</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">ORD-2403-003</td>
                  <td className="p-2">박감귤</td>
                  <td className="hidden sm:table-cell p-2">제주 감귤 5kg</td>
                  <td className="p-2 text-right">25,000원</td>
                  <td className="p-2 text-center">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap">배송완료</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">ORD-2403-004</td>
                  <td className="p-2">최제주</td>
                  <td className="hidden sm:table-cell p-2">황금향 혼합 세트</td>
                  <td className="p-2 text-right">36,000원</td>
                  <td className="p-2 text-center">
                    <span className="inline-block bg-red-100 text-red-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap">결제확인중</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-2">ORD-2403-005</td>
                  <td className="p-2">정한라</td>
                  <td className="hidden sm:table-cell p-2">레드향 2kg</td>
                  <td className="p-2 text-right">34,000원</td>
                  <td className="p-2 text-center">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap">배송중</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 sm:mt-4 text-right">
            <Link href="/admin/orders" className="text-orange-600 hover:underline text-sm sm:text-base">
              모든 주문 보기 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 