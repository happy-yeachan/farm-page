'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 가상의 상품 데이터 (실제로는 API를 통해 받아올 데이터)
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
    images: ['/images/products/hallabong-gift.jpg', '/images/products/hallabong-gift-2.jpg'],
    description: '제주 최고급 한라봉으로 구성된, 선물용으로 최적화된, 고급스러운 선물 세트입니다. 향과 당도가 뛰어난 프리미엄 한라봉만 엄선하여 제공합니다.',
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
    images: ['/images/products/cheonhyehyang-3kg.jpg'],
    description: '제주 감귤의 달콤함과 오렌지의 향긋함이 조화롭게 어우러진 천혜향입니다. 일반 가정에서 즐기기 좋은 3kg 구성입니다.',
    createdAt: '2024-02-16',
  }
];

// 카테고리 목록
const categories = ['한라봉', '천혜향', '감귤', '황금향', '레드향'];

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const productId = parseInt(params.id);
  
  const [userData, setUserData] = useState<{isAdmin: boolean} | null>(null);
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  // 상품 정보 상태
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [isOnSale, setIsOnSale] = useState(false);
  const [discount, setDiscount] = useState('0');
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviewUrls, setNewImagePreviewUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
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

  useEffect(() => {
    // 상품 정보 로드
    if (!loading) {
      // 실제로는 API 호출로 상품 정보를 가져옴
      // 여기서는 가상 데이터로 처리
      const product = products.find(p => p.id === productId);
      
      if (product) {
        setName(product.name);
        setCategory(product.category);
        setPrice(product.price.toString());
        setStock(product.stock.toString());
        setDescription(product.description);
        setIsOnSale(product.isOnSale);
        setDiscount(product.discount.toString());
        setExistingImages(product.images);
        setProductLoading(false);
      } else {
        setNotFound(true);
        setProductLoading(false);
      }
    }
  }, [loading, productId]);

  if (loading || productLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }
  
  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">상품을 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-6">요청하신 상품 정보를 찾을 수 없습니다.</p>
          <Link 
            href="/admin/products" 
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            상품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }
  
  // 새 이미지 파일 처리 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // 미리보기 URL 생성
      const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
      
      setNewImages(prev => [...prev, ...filesArray]);
      setNewImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };
  
  // 기존 이미지 제거
  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };
  
  // 새 이미지 미리보기 제거
  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    
    // 미리보기 URL 객체 해제 및 상태 업데이트
    URL.revokeObjectURL(newImagePreviewUrls[index]);
    setNewImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };
  
  // 입력값 유효성 검사
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = '상품명을 입력해주세요';
    if (!price.trim()) newErrors.price = '가격을 입력해주세요';
    else if (isNaN(Number(price)) || Number(price) <= 0) newErrors.price = '유효한 가격을 입력해주세요';
    
    if (!stock.trim()) newErrors.stock = '재고를 입력해주세요';
    else if (isNaN(Number(stock)) || Number(stock) < 0) newErrors.stock = '유효한 재고 수량을 입력해주세요';
    
    if (isOnSale) {
      if (!discount.trim()) newErrors.discount = '할인율을 입력해주세요';
      else if (isNaN(Number(discount)) || Number(discount) <= 0 || Number(discount) >= 100) {
        newErrors.discount = '유효한 할인율(1-99%)을 입력해주세요';
      }
    }
    
    if (!description.trim()) newErrors.description = '상품 설명을 입력해주세요';
    if (existingImages.length === 0 && newImages.length === 0) {
      newErrors.images = '최소 1개 이상의 상품 이미지가 필요합니다';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 상품 수정 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // 실제 구현에서는 API 호출로 데이터 전송
      console.log({
        id: productId,
        name,
        category,
        price: Number(price),
        stock: Number(stock),
        description,
        isOnSale,
        discount: isOnSale ? Number(discount) : 0,
        existingImages,
        newImages
      });
      
      alert('상품이 수정되었습니다.');
      router.push('/admin/products');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/products" 
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold">상품 수정</h1>
        </div>
        <p className="text-gray-600 mt-2">
          ID: {productId} - 상품 정보를 수정하세요
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 왼쪽 컬럼 - 기본 정보 */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  상품명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="상품명을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  카테고리 <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    가격 (원) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className={`w-full p-2 border rounded-md ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="가격"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    재고 수량 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className={`w-full p-2 border rounded-md ${errors.stock ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="재고 수량"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                  {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="isOnSale"
                    className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                    checked={isOnSale}
                    onChange={(e) => setIsOnSale(e.target.checked)}
                  />
                  <label htmlFor="isOnSale" className="ml-2 block text-sm font-medium text-gray-700">
                    할인 적용
                  </label>
                </div>
                
                {isOnSale && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      할인율 (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      className={`w-full p-2 border rounded-md ${errors.discount ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="할인율"
                      min="1"
                      max="99"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                    {errors.discount && <p className="mt-1 text-sm text-red-500">{errors.discount}</p>}
                    
                    {price && !isNaN(Number(price)) && Number(price) > 0 && discount && !isNaN(Number(discount)) && (
                      <div className="mt-2 text-sm">
                        <span className="text-gray-500 line-through">{Number(price).toLocaleString()}원</span>
                        <span className="ml-2 text-red-600 font-medium">
                          {Math.round(Number(price) * (1 - Number(discount) / 100)).toLocaleString()}원
                        </span>
                        <span className="ml-1 text-xs text-red-500">{discount}%↓</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* 오른쪽 컬럼 - 상품 이미지 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상품 이미지 <span className="text-red-500">*</span>
              </label>
              
              {/* 기존 이미지 */}
              {existingImages.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">기존 이미지</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {existingImages.map((url, index) => (
                      <div key={`existing-${index}`} className="relative group">
                        <img 
                          src={url} 
                          alt={`Product ${index}`} 
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeExistingImage(index)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 새 이미지 추가 */}
              <div 
                className={`border-2 border-dashed rounded-lg p-4 ${
                  errors.images ? 'border-red-500' : 'border-gray-300'
                } hover:bg-gray-50 transition-colors`}
              >
                <div className="text-center py-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-12 w-12 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    새 이미지를 추가하세요
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF (최대 5MB)
                  </p>
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    className="hidden"
                    multiple
                    onChange={handleImageChange}
                  />
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none"
                    onClick={() => document.getElementById('images')?.click()}
                  >
                    이미지 선택
                  </button>
                </div>
                
                {errors.images && <p className="mt-1 text-sm text-center text-red-500">{errors.images}</p>}
                
                {newImagePreviewUrls.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mt-4 mb-2">새로 추가된 이미지</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {newImagePreviewUrls.map((url, index) => (
                        <div key={`new-${index}`} className="relative group">
                          <img 
                            src={url} 
                            alt={`New preview ${index}`} 
                            className="h-24 w-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeNewImage(index)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* 상품 설명 */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              상품 설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="상품에 대한 상세한 설명을 입력하세요"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>
          
          {/* 버튼 그룹 */}
          <div className="mt-8 flex justify-end space-x-3">
            <Link 
              href="/admin/products"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              취소
            </Link>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none"
            >
              변경사항 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 