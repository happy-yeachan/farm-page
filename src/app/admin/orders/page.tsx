'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 가상의 주문 데이터
const orders = [
  {
    id: 'ORD-2403-001',
    customerName: '김제주',
    customerEmail: 'kim@example.com',
    customerPhone: '010-1234-5678',
    productName: '프리미엄 한라봉 선물세트',
    price: 58000,
    quantity: 1,
    totalAmount: 58000,
    orderDate: '2024-03-15 14:22:35',
    status: '배송준비',
    paymentMethod: '신용카드',
    address: '제주특별자치도 제주시 제주로 123',
    memo: '부재시 경비실에 맡겨주세요',
  },
  {
    id: 'ORD-2403-002',
    customerName: '이한라',
    customerEmail: 'lee@example.com',
    customerPhone: '010-2345-6789',
    productName: '천혜향 3kg',
    price: 42000,
    quantity: 1,
    totalAmount: 42000,
    orderDate: '2024-03-14 10:11:24',
    status: '배송중',
    paymentMethod: '계좌이체',
    address: '서울특별시 강남구 테헤란로 123, 456동 789호',
    memo: '',
  },
  {
    id: 'ORD-2403-003',
    customerName: '박감귤',
    customerEmail: 'park@example.com',
    customerPhone: '010-3456-7890',
    productName: '제주 감귤 5kg',
    price: 25000,
    quantity: 1,
    totalAmount: 25000,
    orderDate: '2024-03-10 16:45:12',
    status: '배송완료',
    paymentMethod: '카카오페이',
    address: '경기도 성남시 분당구 판교로 123',
    memo: '문 앞에 놓아주세요',
  },
  {
    id: 'ORD-2403-004',
    customerName: '최제주',
    customerEmail: 'choi@example.com',
    customerPhone: '010-4567-8901',
    productName: '황금향 혼합 세트',
    price: 36000,
    quantity: 1,
    totalAmount: 36000,
    orderDate: '2024-03-15 09:33:27',
    status: '결제확인중',
    paymentMethod: '가상계좌',
    address: '부산광역시 해운대구 해운대로 123',
    memo: '',
  },
  {
    id: 'ORD-2403-005',
    customerName: '정한라',
    customerEmail: 'jung@example.com',
    customerPhone: '010-5678-9012',
    productName: '레드향 2kg',
    price: 34000,
    quantity: 1,
    totalAmount: 34000,
    orderDate: '2024-03-14 11:22:08',
    status: '배송중',
    paymentMethod: '신용카드',
    address: '인천광역시 연수구 연수로 123',
    memo: '경비실에 맡겨주세요',
  },
  {
    id: 'ORD-2403-006',
    customerName: '강감귤',
    customerEmail: 'kang@example.com',
    customerPhone: '010-6789-0123',
    productName: '한라봉 5kg',
    price: 45000,
    quantity: 2,
    totalAmount: 90000,
    orderDate: '2024-03-13 15:42:19',
    status: '배송준비',
    paymentMethod: '네이버페이',
    address: '대전광역시 유성구 대학로 123',
    memo: '부재시 연락주세요',
  },
  {
    id: 'ORD-2403-007',
    customerName: '윤감귤',
    customerEmail: 'yoon@example.com',
    customerPhone: '010-7890-1234',
    productName: '천혜향 2kg 선물세트',
    price: 32000,
    quantity: 1,
    totalAmount: 32000,
    orderDate: '2024-03-12 13:18:56',
    status: '배송완료',
    paymentMethod: '신용카드',
    address: '경상남도 창원시 의창구 창원대로 123',
    memo: '',
  },
  {
    id: 'ORD-2403-008',
    customerName: '장제주',
    customerEmail: 'jang@example.com',
    customerPhone: '010-8901-2345',
    productName: '감귤 10kg',
    price: 38000,
    quantity: 1,
    totalAmount: 38000,
    orderDate: '2024-03-11 16:29:45',
    status: '배송완료',
    paymentMethod: '계좌이체',
    address: '전라북도 전주시 완산구 전주로 123',
    memo: '택배함에 넣어주세요',
  }
];

// 주문 상태 목록
const orderStatuses = ['전체', '결제확인중', '배송준비', '배송중', '배송완료', '취소/환불'];

export default function AdminOrdersPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<{isAdmin: boolean} | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
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
        // 관리자가 아니면 로그인 페이지로 이동
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
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === '전체' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // 주문 상태 업데이트 핸들러
  const handleStatusChange = (orderId: string, newStatus: string) => {
    // 실제로는 API 호출을 통해 상태 업데이트
    console.log(`주문 ${orderId}의 상태를 ${newStatus}로 변경`);
    alert(`주문 상태가 변경되었습니다: ${newStatus}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">주문 관리</h1>
          <p className="text-gray-600">
            고객 주문 내역을 확인하고 관리하세요
          </p>
        </div>
        <Link 
          href="/admin/dashboard" 
          className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg hover:bg-orange-200"
        >
          대시보드로 돌아가기
        </Link>
      </div>
      
      {/* 검색 및 필터 */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              주문번호/고객명/이메일/상품 검색
            </label>
            <input
              type="text"
              id="search"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="검색어 입력..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              주문 상태 필터
            </label>
            <div className="flex flex-wrap gap-2">
              {orderStatuses.map(status => (
                <button
                  key={status}
                  className={`px-3 py-1 rounded-full text-sm ${
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
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">주문번호</th>
                <th className="px-4 py-3 text-left">날짜</th>
                <th className="px-4 py-3 text-left">고객 정보</th>
                <th className="px-4 py-3 text-left">상품</th>
                <th className="px-4 py-3 text-right">금액</th>
                <th className="px-4 py-3 text-center">상태</th>
                <th className="px-4 py-3 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <React.Fragment key={order.id}>
                  <tr className={`hover:bg-gray-50 ${expandedOrderId === order.id ? 'bg-orange-50' : ''}`}>
                    <td className="px-4 py-3 font-medium">{order.id}</td>
                    <td className="px-4 py-3 text-gray-500">{order.orderDate.split(' ')[0]}</td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-xs text-gray-500">{order.customerEmail}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div>{order.productName}</div>
                        <div className="text-xs text-gray-500">{order.quantity}개</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      {order.totalAmount.toLocaleString()}원
                    </td>
                    <td className="px-4 py-3 text-center">
                      {order.status === '결제확인중' && (
                        <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          결제확인중
                        </span>
                      )}
                      {order.status === '배송준비' && (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          배송준비
                        </span>
                      )}
                      {order.status === '배송중' && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          배송중
                        </span>
                      )}
                      {order.status === '배송완료' && (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          배송완료
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                        >
                          {expandedOrderId === order.id ? '접기' : '상세'}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedOrderId === order.id && (
                    <tr>
                      <td colSpan={7} className="px-4 py-4 bg-orange-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">주문 상세 정보</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex">
                                <span className="w-28 text-gray-500">주문 시간:</span>
                                <span>{order.orderDate}</span>
                              </div>
                              <div className="flex">
                                <span className="w-28 text-gray-500">결제 방법:</span>
                                <span>{order.paymentMethod}</span>
                              </div>
                              <div className="flex">
                                <span className="w-28 text-gray-500">주문자 연락처:</span>
                                <span>{order.customerPhone}</span>
                              </div>
                              <div className="flex">
                                <span className="w-28 text-gray-500">배송지 주소:</span>
                                <span>{order.address}</span>
                              </div>
                              {order.memo && (
                                <div className="flex">
                                  <span className="w-28 text-gray-500">배송 메모:</span>
                                  <span>{order.memo}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">주문 상태 관리</h4>
                            <div className="space-y-3">
                              <div className="flex flex-wrap gap-2">
                                <button 
                                  className={`px-3 py-1 text-xs rounded-full ${order.status === '결제확인중' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
                                  onClick={() => handleStatusChange(order.id, '결제확인중')}
                                >
                                  결제확인중
                                </button>
                                <button 
                                  className={`px-3 py-1 text-xs rounded-full ${order.status === '배송준비' ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
                                  onClick={() => handleStatusChange(order.id, '배송준비')}
                                >
                                  배송준비
                                </button>
                                <button 
                                  className={`px-3 py-1 text-xs rounded-full ${order.status === '배송중' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                                  onClick={() => handleStatusChange(order.id, '배송중')}
                                >
                                  배송중
                                </button>
                                <button 
                                  className={`px-3 py-1 text-xs rounded-full ${order.status === '배송완료' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
                                  onClick={() => handleStatusChange(order.id, '배송완료')}
                                >
                                  배송완료
                                </button>
                                <button 
                                  className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200"
                                  onClick={() => handleStatusChange(order.id, '취소/환불')}
                                >
                                  취소/환불
                                </button>
                              </div>
                              <div className="flex space-x-2">
                                <button 
                                  className="px-3 py-1 text-xs bg-orange-100 text-orange-800 rounded hover:bg-orange-200"
                                >
                                  운송장 입력
                                </button>
                                <button 
                                  className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                                >
                                  주문서 인쇄
                                </button>
                                <button 
                                  className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                                >
                                  주문 취소
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
      
      {/* 페이지네이션 */}
      <div className="mt-6 flex justify-center">
        <nav className="flex space-x-1">
          <button className="px-3 py-1 border rounded hover:bg-orange-50">이전</button>
          <button className="px-3 py-1 border rounded bg-orange-500 text-white">1</button>
          <button className="px-3 py-1 border rounded hover:bg-orange-50">2</button>
          <button className="px-3 py-1 border rounded hover:bg-orange-50">다음</button>
        </nav>
      </div>
    </div>
  );
} 