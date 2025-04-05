'use client';

import Link from "next/link";
import { Metadata } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addToCart } from "@/app/lib/cartUtils";

// 가상의 상품 데이터 (실제로는 API에서 데이터를 가져올 것입니다)
const products = [
  {
    id: 1,
    name: "프리미엄 한라봉",
    price: 25000,
    description: "제주 햇살 가득 머금은 달콤한 한라봉",
    category: "만감류",
    image: "/hanlabong.jpg",
    stock: 50,
    origin: "제주특별자치도 서귀포시",
    harvestDate: "2024년 1월",
    details: [
      "제주 서귀포시 해안가에서 재배한 프리미엄 한라봉입니다.",
      "풍부한 일조량과 깨끗한 제주 바닷바람을 맞고 자란 한라봉은 당도가 뛰어납니다.",
      "두꺼운 껍질 속에 풍부한 과즙과 새콤달콤한 맛이 특징입니다.",
      "비타민C가 풍부하여 면역력 향상에 도움을 줍니다."
    ]
  },
  {
    id: 2,
    name: "유기농 노지 감귤",
    price: 15000,
    description: "제주 흙에서 자란 달콤한 노지 감귤",
    category: "감귤",
    image: "/mandarin.jpg",
    stock: 100,
    origin: "제주특별자치도 서귀포시",
    harvestDate: "2023년 12월",
    details: [
      "유기농 인증을 받은 친환경 노지 감귤입니다.",
      "농약과 화학비료 없이 유기농법으로 재배했습니다.",
      "제주 화산토양에서 자라 영양소가 풍부합니다.",
      "껍질이 얇고 과즙이 많은 고품질 감귤입니다."
    ]
  },
  {
    id: 3,
    name: "제주 천혜향",
    price: 22000,
    description: "향이 진하고 당도 높은 제주 천혜향",
    category: "만감류",
    image: "/chunhyehyang.jpg",
    stock: 75,
    origin: "제주특별자치도 서귀포시",
    harvestDate: "2024년 2월",
    details: [
      "천혜향은 한라봉과 오렌지를 교배한 품종으로 향이 뛰어납니다.",
      "과즙이 풍부하고 당도가 높아 선물용으로 인기 있는 상품입니다.",
      "비타민C와 구연산이 풍부하여 피로 회복에 좋습니다.",
      "제주의 맑은 공기와 깨끗한 물로 재배했습니다."
    ]
  },
  {
    id: 4,
    name: "하우스 감귤",
    price: 19000,
    description: "하우스에서 정성껏 재배한 감귤",
    category: "감귤",
    image: "/house-mandarin.jpg",
    stock: 120,
    origin: "제주특별자치도 서귀포시",
    harvestDate: "2024년 3월",
    details: [
      "하우스에서 온도와 습도를 최적화하여 재배한 감귤입니다.",
      "제철이 아닌 시기에도 신선한 감귤을 즐길 수 있습니다.",
      "당도가 높고 산미가 적절한 균형잡힌 맛이 특징입니다.",
      "껍질이 얇고 씨가 적어 먹기 편합니다."
    ]
  }
];

type Props = {
  params: {
    id: string;
  };
};

// 동적 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productId = parseInt(params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return {
      title: "상품을 찾을 수 없습니다 | 행복한 감귤농장",
      description: "요청하신 상품 정보를 찾을 수 없습니다."
    };
  }
  
  // 이미지 경로 처리
  const imageUrl = product.image.startsWith('http') 
    ? product.image 
    : `https://jejumandarin.com${product.image}`;
  
  return {
    title: `${product.name} | 행복한 감귤농장 제주 감귤 직거래`,
    description: `${product.description}. 제주 서귀포시 직영 감귤농장에서 당일 수확한 ${product.name}을 산지 직송으로 신선하게 만나보세요.`,
    keywords: `${product.name}, ${product.category}, 제주 감귤, 제주 특산품, 감귤 직거래, 제주 ${product.category}`,
    openGraph: {
      title: `${product.name} | 행복한 감귤농장`,
      description: product.description,
      type: 'website',
      // 안전하게 images 속성 처리
      images: [{
        url: imageUrl,
        width: 800,
        height: 600,
        alt: product.name
      }]
    }
  };
}

export default function ProductDetail({ params }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showCartAlert, setShowCartAlert] = useState(false);
  
  const productId = parseInt(params.id);
  const product = products.find(p => p.id === productId);

  useEffect(() => {
    // 로그인 상태 확인
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('로그인 상태 확인 오류:', error);
    }
  }, []);

  // 수량 증가/감소 처리
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // 장바구니에 담기
  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    
    try {
      addToCart(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        },
        quantity,
        isLoggedIn
      );
      
      // 성공 알림 표시
      setShowCartAlert(true);
      setTimeout(() => setShowCartAlert(false), 3000);
    } catch (error) {
      console.error('장바구니 추가 오류:', error);
      alert('장바구니 추가 중 오류가 발생했습니다.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  // 바로 구매하기
  const handleBuyNow = () => {
    if (!product) return;
    
    try {
      // 장바구니에 상품 추가 후 장바구니 페이지로 이동
      addToCart(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        },
        quantity,
        isLoggedIn
      );
      router.push('/cart');
    } catch (error) {
      console.error('구매 중 오류:', error);
      alert('구매 처리 중 오류가 발생했습니다.');
    }
  };

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h1>
        <p className="mb-6">요청하신 상품이 존재하지 않거나 삭제되었습니다.</p>
        <Link 
          href="/products" 
          className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
        >
          상품 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div itemScope itemType="https://schema.org/Product">
      <meta itemProp="sku" content={`JEJU-${product.id}`} />
      <meta itemProp="mpn" content={`MANDARIN-${product.id}`} />
      <meta itemProp="category" content={product.category} />
      <meta itemProp="brand" content="행복한 감귤농장" />
      
      <div className="mb-6">
        <Link href="/products" className="text-orange-500 hover:underline flex items-center">
          <span className="mr-1">←</span> 상품 목록으로 돌아가기
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 상품 이미지 */}
        <div className="aspect-square bg-orange-50 rounded-lg flex items-center justify-center text-orange-500 font-bold text-xl" itemProp="image" content={product.image.startsWith('http') ? product.image : `https://jejumandarin.com${product.image}`}>
          {product.name}
        </div>

        {/* 상품 정보 */}
        <div>
          <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold mb-2" itemProp="name">{product.name}</h1>
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="KRW" />
            <meta itemProp="url" content={`https://jejumandarin.com/products/${product.id}`} />
            <meta itemProp="availability" content={product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
            <p className="text-2xl font-bold text-orange-600 mb-4" itemProp="price" content={product.price.toString()}>{product.price.toLocaleString()}원</p>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-4" itemProp="description">{product.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 bg-orange-50 p-4 rounded-lg">
              <p itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
                <meta itemProp="name" content="원산지" />
                <span itemProp="value">원산지: {product.origin}</span>
              </p>
              <p itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
                <meta itemProp="name" content="수확시기" />
                <span itemProp="value">수확 시기: {product.harvestDate}</span>
              </p>
              <p>재고: {product.stock}개</p>
              <p>배송: 제주 직송</p>
            </div>
          </div>

          {/* 수량 선택 및 장바구니 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="mr-4">수량</span>
              <div className="flex border rounded-md">
                <button 
                  className="px-3 py-1 border-r"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button 
                  className="px-3 py-1 border-l"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
              {product.stock < 10 && (
                <span className="ml-3 text-sm text-red-500">
                  재고 {product.stock}개 남음
                </span>
              )}
            </div>
            
            <button 
              className="w-full bg-orange-500 text-white py-3 rounded-md font-medium hover:bg-orange-600 mb-2 disabled:bg-gray-400"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? '담는 중...' : '장바구니에 담기'}
            </button>
            
            <button 
              className="w-full border border-orange-500 text-orange-500 py-3 rounded-md font-medium hover:bg-orange-50"
              onClick={handleBuyNow}
            >
              바로 구매하기
            </button>
            
            {/* 장바구니 추가 알림 */}
            {showCartAlert && (
              <div className="mt-3 bg-green-100 text-green-800 p-3 rounded-md text-sm flex justify-between items-center">
                <span>상품이 장바구니에 추가되었습니다.</span>
                <Link href="/cart" className="text-green-800 font-medium underline">
                  장바구니 보기
                </Link>
              </div>
            )}
          </div>

          {/* 상품 상세 정보 */}
          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <span className="text-orange-500 mr-2">🍊</span> 상품 상세 정보
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              {product.details.map((detail, index) => (
                <li key={index} className="text-gray-700">{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* 배송 안내 */}
      <div className="mt-16 p-6 bg-blue-50 rounded-lg">
        <h3 className="font-bold text-lg mb-4">배송 및 환불 안내</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold mb-2 flex items-center">
              <span className="text-orange-500 mr-2">🚚</span> 배송 안내
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li>• 주문 후 1-2일 내에 발송됩니다 (주말/공휴일 제외)</li>
              <li>• 3만원 이상 구매 시 무료배송</li>
              <li>• 신선도 유지를 위한 아이스팩 포장</li>
              <li>• 제주도에서 출발하여 배송 기간이 1일 더 소요될 수 있습니다</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 flex items-center">
              <span className="text-orange-500 mr-2">↩️</span> 교환/환불 안내
            </h4>
            <ul className="space-y-2 text-gray-700">
              <li>• 상품 수령 후 24시간 이내 문제 발견 시 교환/환불 가능</li>
              <li>• 상품 파손, 변질의 경우 사진과 함께 고객센터로 연락 주세요</li>
              <li>• 단순 변심에 의한 환불 시 왕복 배송비 고객 부담</li>
              <li>• 신선식품 특성상 단순 변심 교환/환불 시 제한될 수 있습니다</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 상품 리뷰 섹션 (SEO 향상) */}
      <section className="mt-12">
        <h3 className="text-xl font-bold mb-6">고객 리뷰</h3>
        <div className="border p-4 rounded-lg">
          <div itemProp="review" itemScope itemType="https://schema.org/Review">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400 mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>★</span>
                ))}
              </div>
              <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                <meta itemProp="ratingValue" content="5" />
                <meta itemProp="bestRating" content="5" />
              </div>
              <span className="font-medium" itemProp="author">김제주</span>
              <span className="text-gray-500 text-sm ml-2">2024.03.15</span>
              <meta itemProp="datePublished" content="2024-03-15" />
            </div>
            <h4 className="font-semibold mb-2" itemProp="name">정말 맛있는 {product.name}</h4>
            <p className="text-gray-700" itemProp="reviewBody">
              제주 여행 중 직접 방문했다가 너무 맛있어서 귀향 후에도 주문해 먹고 있어요. 
              당도가 높고 과즙이 풍부해서 가족 모두가 만족하며 먹고 있습니다. 
              포장도 꼼꼼하게 해주셔서 신선한 상태로 받았습니다. 재구매 의사 100%!
            </p>
          </div>
        </div>
      </section>
      
      {/* 연관 상품 섹션 */}
      <section className="mt-12">
        <h3 className="text-xl font-bold mb-6">함께 구매하면 좋은 상품</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.filter(p => p.id !== product.id).slice(0, 4).map(relatedProduct => (
            <Link href={`/products/${relatedProduct.id}`} key={relatedProduct.id} className="block">
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
                <div className="h-32 bg-orange-100 flex items-center justify-center text-orange-500 font-medium">
                  {relatedProduct.name}
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm">{relatedProduct.name}</h4>
                  <p className="text-orange-600 font-bold text-sm">{relatedProduct.price.toLocaleString()}원</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
} 