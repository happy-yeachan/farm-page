import Link from "next/link";
import { Metadata } from "next";
import { products } from "@/app/data/products";

// SEO를 위한 메타데이터 설정
export const metadata: Metadata = {
  title: "제주 감귤, 한라봉, 천혜향 | 행복한 감귤농장 상품 목록",
  description: "행복한 감귤농장의 감귤, 한라봉, 천혜향 등 제주 특산품을 만나보세요. 제주도에서 직접 재배하여 당일 수확, 신선하게 배송해 드립니다.",
  keywords: "제주 감귤, 한라봉, 천혜향, 황금향, 레드향, 제주 과일, 감귤 직거래, 제주 특산품, 온라인 쇼핑몰",
};

// 카테고리 목록
const categories = ["전체", "감귤", "만감류", "기타 제품"];

export default function ProductsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">제주 감귤 상품 목록</h1>
        <p className="text-gray-600">행복한 감귤농장의 엄선된 제품들을 만나보세요</p>
      </div>
      
      {/* 카테고리 필터 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">카테고리</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 border border-orange-200 rounded-full hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* 상품 목록 */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        itemScope 
        itemType="https://schema.org/ItemList"
      >
        <meta itemProp="name" content="제주 감귤농장 상품 목록" />
        <meta itemProp="itemListOrder" content="Unordered" />
        <meta itemProp="numberOfItems" content={products.length.toString()} />
        
        {products.map((product, index) => (
          <div 
            key={product.id} 
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            <meta itemProp="position" content={(index + 1).toString()} />
            <Link href={`/products/${product.id}`} className="block">
              <div 
                className="border border-orange-100 rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer"
                itemProp="item" 
                itemScope 
                itemType="https://schema.org/Product"
              >
                <meta itemProp="url" content={`https://jejumandarin.com/products/${product.id}`} />
                <div className="h-48 bg-orange-50 relative" itemProp="image" content={product.image}>
                  {/* 실제 이미지가 있을 경우에만 Image 컴포넌트 사용 */}
                  <div className="absolute inset-0 flex items-center justify-center text-orange-500 font-bold">
                    {product.name}
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mb-2">
                    {product.category}
                  </span>
                  <meta itemProp="category" content={product.category} />
                  <h3 className="font-bold text-lg" itemProp="name">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2" itemProp="description">{product.description}</p>
                  <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <meta itemProp="availability" content="https://schema.org/InStock" />
                    <meta itemProp="priceCurrency" content="KRW" />
                    <p className="font-bold text-orange-600" itemProp="price" content={product.price.toString()}>
                      {product.price.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {/* 제품 카테고리 설명 (SEO 강화) */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">감귤류 소개</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold">감귤</h4>
              <p className="text-gray-700 text-sm">
                제주도의 대표 과일인 감귤은 비타민C가 풍부하고 새콤달콤한 맛이 특징입니다. 
                겨울철 제철 과일로 노지감귤과 하우스감귤로 나뉘며, 당도와 산미의 균형이 좋습니다.
              </p>
            </div>
            <div>
              <h4 className="font-bold">한라봉</h4>
              <p className="text-gray-700 text-sm">
                한라봉은 꼭지 부분이 튀어나온 모양이 특징이며, 과즙이 풍부하고 당도가 높아 인기있는 만감류입니다. 
                껍질이 두꺼워 운송 중 손상이 적고, 신선한 상태로 배송됩니다.
              </p>
            </div>
            <div>
              <h4 className="font-bold">천혜향</h4>
              <p className="text-gray-700 text-sm">
                천혜향은 이름처럼 향이 천상의 향기라는 뜻으로, 진한 향과 과즙이 특징입니다. 
                한라봉보다 작지만 당도가 더 높은 경우가 많으며, 부드러운 식감이 매력적인 과일입니다.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">감귤 고르는 법</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-bold">색상</span>: 선명한 주황빛 감귤이 당도가 높습니다.
            </li>
            <li>
              <span className="font-bold">무게</span>: 크기 대비 무게가 묵직한 것이 과즙이 풍부합니다.
            </li>
            <li>
              <span className="font-bold">껍질</span>: 매끄럽고 윤기가 있는 감귤이 좋습니다.
            </li>
            <li>
              <span className="font-bold">제철</span>: 노지감귤은 11월~1월, 한라봉은 12월~3월, 천혜향은 1월~3월이 제철입니다.
            </li>
            <li>
              <span className="font-bold">보관법</span>: 서늘하고 통풍이 잘 되는 곳에 보관하며, 물기에 닿지 않도록 합니다.
            </li>
          </ul>
        </div>
      </div>
      
      {/* 배송 안내 */}
      <div className="mt-16 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">배송 안내</h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="text-orange-500 mr-2">🚚</span>
            <span>3만원 이상 구매 시 무료배송</span>
          </li>
          <li className="flex items-center">
            <span className="text-orange-500 mr-2">📦</span>
            <span>제주도에서 전국으로 신선하게 배송</span>
          </li>
          <li className="flex items-center">
            <span className="text-orange-500 mr-2">🍊</span>
            <span>수확 후 당일 발송으로 최상의 신선도 유지</span>
          </li>
        </ul>
      </div>
    </div>
  );
} 