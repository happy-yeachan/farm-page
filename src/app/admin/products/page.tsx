'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 가상의 상품 데이터
const products = [
  {
    id: 1,
    name: '프리미엄 한라봉 선물세트',
    category: '한라봉',
    price: 58000,
    stock: 120,
    sales: 85,
    isOnSale: true,
    discount: 10,
    thumbnailUrl: '/images/products/hallabong-gift.jpg',
    createdAt: '2024-02-15',
  },
  {
    id: 2,
    name: '천혜향 3kg 가정용',
    category: '천혜향',
    price: 42000,
    stock: 85,
    sales: 64,
    isOnSale: false,
    discount: 0,
    thumbnailUrl: '/images/products/cheonhyehyang-3kg.jpg',
    createdAt: '2024-02-16',
  },
  {
    id: 3,
    name: '제주 감귤 5kg 선물용',
    category: '감귤',
    price: 25000,
    stock: 250,
    sales: 180,
    isOnSale: true,
    discount: 15,
    thumbnailUrl: '/images/products/tangerine-5kg.jpg',
    createdAt: '2024-01-10',
  },
  {
    id: 4,
    name: '황금향 혼합 세트',
    category: '황금향',
    price: 36000,
    stock: 0,
    sales: 95,
    isOnSale: false,
    discount: 0,
    thumbnailUrl: '/images/products/goldcitrus-mix.jpg',
    createdAt: '2024-02-20',
  },
  {
    id: 5,
    name: '레드향 2kg 선물세트',
    category: '레드향',
    price: 34000,
    stock: 65,
    sales: 42,
    isOnSale: true,
    discount: 5,
    thumbnailUrl: '/images/products/redhyang-2kg.jpg',
    createdAt: '2024-03-01',
  },
  {
    id: 6,
    name: '한라봉 5kg 가정용',
    category: '한라봉',
    price: 45000,
    stock: 110,
    sales: 67,
    isOnSale: false,
    discount: 0,
    thumbnailUrl: '/images/products/hallabong-5kg.jpg',
    createdAt: '2024-02-25',
  },
  {
    id: 7,
    name: '천혜향 2kg 선물세트',
    category: '천혜향',
    price: 32000,
    stock: 95,
    sales: 73,
    isOnSale: true,
    discount: 8,
    thumbnailUrl: '/images/products/cheonhyehyang-2kg.jpg',
    createdAt: '2024-03-05',
  },
  {
    id: 8,
    name: '감귤 10kg 가정용',
    category: '감귤',
    price: 38000,
    stock: 0,
    sales: 120,
    isOnSale: false,
    discount: 0,
    thumbnailUrl: '/images/products/tangerine-10kg.jpg',
    createdAt: '2024-01-20',
  }
];

// 카테고리 목록
const categories = ['전체', '한라봉', '천혜향', '감귤', '황금향', '레드향'];

export default function AdminProductsPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<{isAdmin: boolean} | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  
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
  
  // 상품 필터링
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">상품 관리</h1>
          <p className="text-gray-600">
            제주 특산품 상품을 관리하세요
          </p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          + 새 상품 등록
        </Link>
      </div>
      
      {/* 검색 및 필터 */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              상품명 검색
            </label>
            <input
              type="text"
              id="search"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="상품명 입력..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              카테고리 필터
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 상품 목록 테이블 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">상품 정보</th>
                <th className="px-4 py-3 text-center">카테고리</th>
                <th className="px-4 py-3 text-right">가격</th>
                <th className="px-4 py-3 text-center">재고</th>
                <th className="px-4 py-3 text-center">판매량</th>
                <th className="px-4 py-3 text-center">등록일</th>
                <th className="px-4 py-3 text-center">상태</th>
                <th className="px-4 py-3 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md mr-3"></div>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {product.isOnSale ? (
                      <div>
                        <span className="line-through text-gray-500">{product.price.toLocaleString()}원</span>
                        <span className="ml-1 text-red-600 font-medium">
                          {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()}원
                        </span>
                        <span className="ml-1 text-xs text-red-500">{product.discount}%↓</span>
                      </div>
                    ) : (
                      <span>{product.price.toLocaleString()}원</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {product.stock > 0 ? (
                      <span>{product.stock}개</span>
                    ) : (
                      <span className="text-red-500 font-medium">품절</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">{product.sales}개</td>
                  <td className="px-4 py-3 text-center">{product.createdAt}</td>
                  <td className="px-4 py-3 text-center">
                    {product.isOnSale ? (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        할인중
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        판매중
                      </span>
                    ) : (
                      <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        품절
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center space-x-2">
                      <Link 
                        href={`/admin/products/edit/${product.id}`}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                        title="수정"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </Link>
                      <button 
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                        title="삭제"
                        onClick={() => {
                          if (window.confirm(`'${product.name}' 상품을 정말 삭제하시겠습니까?`)) {
                            // 여기에 삭제 로직 구현 (실제로는 API 호출)
                            alert('삭제되었습니다.');
                          }
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredProducts.length === 0 && (
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