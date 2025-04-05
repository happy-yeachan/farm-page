'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 가상의 주문 데이터
const orders = [
  {
    id: 'ORD-2024-0015',
    date: '2024-03-25',
    customer: '김제주',
    items: [
      { name: '프리미엄 한라봉 세트', quantity: 1, price: 34000 },
      { name: '유기농 노지 감귤 3kg', quantity: 2, price: 15000 }
    ],
    total: 64000,
    status: '배송준비중',
    payment: '신용카드',
    phone: '010-1234-5678',
    address: '제주특별자치도 제주시 연동 123',
    postcode: '63122'
  },
  {
    id: 'ORD-2024-0014',
    date: '2024-03-24',
    customer: '이한라',
    items: [
      { name: '제주 천혜향 5kg', quantity: 1, price: 45000 }
    ],
    total: 45000,
    status: '배송중',
    payment: '계좌이체',
    phone: '010-9876-5432',
    address: '서울특별시 강남구 역삼동 456',
    postcode: '06092'
  },
  {
    id: 'ORD-2024-0013',
    date: '2024-03-23',
    customer: '박귤림',
    items: [
      { name: '하우스 감귤 2kg', quantity: 1, price: 19000 },
      { name: '감귤 쿠키 세트', quantity: 1, price: 12000 }
    ],
    total: 31000,
    status: '배송완료',
    payment: '카카오페이',
    phone: '010-5555-6666',
    address: '경기도 성남시 분당구 서현동 789',
    postcode: '13591'
  },
  {
    id: 'ORD-2024-0012',
    date: '2024-03-22',
    customer: '최감귤',
    items: [
      { name: '프리미엄 한라봉 세트', quantity: 2, price: 34000 }
    ],
    total: 68000,
    status: '배송완료',
    payment: '신용카드',
    phone: '010-7777-8888',
    address: '부산광역시 해운대구 우동 101',
    postcode: '48095'
  }
];

// 주문 상태 목록
const statusList = ['전체', '주문접수', '결제완료', '배송준비중', '배송중', '배송완료', '취소/환불'];

export default function AdminOrdersPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<{isAdmin: boolean} | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
  useEffect(() => {
    // 관리자 인증 확인
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
        // 관리자가 아니면, 로그인 페이지로 이동
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
  
  // 주문 필터링
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = selectedStatus === '전체' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // 주문 상태 변경
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // 실제로는 API 호출을 통해 변경
    alert(`주문 ${orderId}의 상태가 ${newStatus}로 변경되었습니다.`);
  };

  // 주문 상세 토글
  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  return (
    <div className="container mx-auto px-0 sm:px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">주문 관리</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            고객 주문 내역을 관리하고 상태를 업데이트하세요
          </p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/admin/dashboard" 
            className="bg-orange-100 text-orange-800 px-3 sm:px-4 py-2 rounded-lg hover:bg-orange-200 text-center sm:text-left text-sm sm:text-base"
          >
            대시보드로 돌아가기
          </Link>
        </div>
      </div>
      
      {/* 검색 및 필터 */}
      <div className="mb-6 bg-white p-3 sm:p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              주문 검색
            </label>
            <input
              type="text"
              id="search"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="주문번호, 고객명, 상품명..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              주문 상태 필터
            </label>
            <div className="flex flex-wrap gap-2">
              {statusList.map(status => (
                <button
                  key={status}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                    selectedStatus === status
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                  }`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 주문 목록 */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
            검색 결과가 없습니다.
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* 주문 요약 정보 */}
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 flex flex-col sm:flex-row justify-between gap-3"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span className="font-medium">{order.id}</span>
                    <span className="text-gray-500 text-sm">
                      {order.date} | {order.customer}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-1">
                    {order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col justify-between items-end sm:items-end gap-2">
                  <div className={`inline-block px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                    order.status === '배송완료' ? 'bg-green-100 text-green-800' :
                    order.status === '배송중' ? 'bg-blue-100 text-blue-800' :
                    order.status === '배송준비중' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === '취소/환불' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </div>
                  <div className="font-medium">{order.total.toLocaleString()}원</div>
                </div>
                <div className="flex sm:hidden items-center text-xs text-gray-400">
                  {expandedOrder === order.id ? '접기' : '상세보기'} 
                  <svg 
                    className={`ml-1 w-4 h-4 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* 주문 상세 정보 */}
              {expandedOrder === order.id && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="font-medium mb-2 text-sm">주문 정보</h3>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-gray-500">주문일시:</span> {order.date}</p>
                        <p><span className="text-gray-500">주문상태:</span> {order.status}</p>
                        <p><span className="text-gray-500">결제방법:</span> {order.payment}</p>
                        <p><span className="text-gray-500">총 금액:</span> {order.total.toLocaleString()}원</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-sm">배송 정보</h3>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-gray-500">받는분:</span> {order.customer}</p>
                        <p><span className="text-gray-500">연락처:</span> {order.phone}</p>
                        <p><span className="text-gray-500">우편번호:</span> {order.postcode}</p>
                        <p><span className="text-gray-500">주소:</span> {order.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-medium mb-2 text-sm">주문 상품</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead>
                          <tr>
                            <th className="px-3 py-2 text-left">상품명</th>
                            <th className="px-3 py-2 text-center">수량</th>
                            <th className="px-3 py-2 text-right">금액</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {order.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-3 py-2">{item.name}</td>
                              <td className="px-3 py-2 text-center">{item.quantity}</td>
                              <td className="px-3 py-2 text-right">{item.price.toLocaleString()}원</td>
                            </tr>
                          ))}
                          <tr className="bg-gray-50 font-medium">
                            <td className="px-3 py-2 text-right" colSpan={2}>총 금액</td>
                            <td className="px-3 py-2 text-right">{order.total.toLocaleString()}원</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
                    <select 
                      className="px-3 py-1.5 border border-gray-300 rounded text-sm"
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    >
                      <option value="주문접수">주문접수</option>
                      <option value="결제완료">결제완료</option>
                      <option value="배송준비중">배송준비중</option>
                      <option value="배송중">배송중</option>
                      <option value="배송완료">배송완료</option>
                      <option value="취소/환불">취소/환불</option>
                    </select>
                    <button className="bg-orange-500 text-white px-3 py-1.5 rounded text-sm">
                      상태 변경
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {filteredOrders.length > 0 && (
        <div className="mt-6 flex justify-center">
          <nav className="flex space-x-1">
            <button className="px-3 py-1 border rounded hover:bg-orange-50">이전</button>
            <button className="px-3 py-1 border rounded bg-orange-500 text-white">1</button>
            <button className="px-3 py-1 border rounded hover:bg-orange-50">다음</button>
          </nav>
        </div>
      )}
    </div>
  );
} 