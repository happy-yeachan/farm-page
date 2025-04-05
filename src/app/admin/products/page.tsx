'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 상품 타입 정의
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales?: number;
  isOnSale: boolean;
  discount: number;
  createdAt: string;
}

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

// 상품 행 컴포넌트
const ProductRow = ({ product, onEdit, onDelete }: { 
  product: Product; 
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) => (
  <tr>
    <td className="px-4 py-3 text-center">{product.id}</td>
    <td className="px-4 py-3">
      <Link href={`/products/${product.id}`} className="text-blue-600 hover:underline">
        {product.name}
      </Link>
    </td>
    <td className="px-4 py-3">{product.category}</td>
    <td className="px-4 py-3 text-right">{product.price.toLocaleString()}원</td>
    <td className="px-4 py-3 text-center">{product.stock}</td>
    <td className="px-4 py-3 text-center">{product.sales || 0}</td>
    <td className="px-4 py-3 text-center">
      {product.isOnSale && product.discount > 0 ? (
        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">{product.discount}%</span>
      ) : (
        <span className="text-gray-400">-</span>
      )}
    </td>
    <td className="px-4 py-3 text-right">
      <div className="flex justify-end space-x-2">
        <button 
          onClick={() => onEdit(product.id)}
          className="text-blue-600 hover:text-blue-800"
        >
          수정
        </button>
        <button 
          onClick={() => onDelete(product.id)}
          className="text-red-600 hover:text-red-800"
        >
          삭제
        </button>
      </div>
    </td>
  </tr>
);

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
        <div className="flex gap-3">
          <Link 
            href="/admin/dashboard" 
            className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg hover:bg-orange-200"
          >
            대시보드로 돌아가기
          </Link>
          <Link 
            href="/admin/products/new" 
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            + 새 상품 등록
          </Link>
        </div>
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
                <ProductRow 
                  key={product.id}
                  product={product}
                  onEdit={(id) => {
                    router.push(`/admin/products/edit/${id}`);
                  }}
                  onDelete={(id) => {
                    if (window.confirm(`'${product.name}' 상품을 정말 삭제하시겠습니까?`)) {
                      // 실제로는 API 호출로 구현
                      alert('상품이 삭제되었습니다.');
                      // 삭제 후 목록 갱신 로직 추가
                    }
                  }}
                />
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