import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "행복한 감귤농장 - 제주도 감귤 한라봉 천혜향 직거래 | 제주 과일 농장 체험",
  description: "제주도 서귀포시 감귤 직거래 쇼핑몰. 감귤, 한라봉, 천혜향, 황금향 등 제주 특산품을 당일 수확, 산지 직송으로 신선하게 만나보세요. 감귤 농장 체험도 운영합니다.",
  keywords: "제주 감귤, 한라봉, 천혜향, 황금향, 밀감, 노지감귤, 하우스감귤, 제주 과일, 제주 농장 체험, 제주 특산품",
};

// 가상의 추천 상품 데이터
const featuredProducts = [
  {
    id: 1,
    name: "프리미엄 한라봉",
    price: 25000,
    description: "제주 햇살 가득 머금은 달콤한 한라봉",
    details: "당도 14Brix 이상 보장, 제주 서귀포시 감귤농장 직영",
    image: "/hanlabong.jpg"
  },
  {
    id: 2,
    name: "유기농 노지 감귤",
    price: 15000,
    description: "제주 흙에서 자란 달콤한 노지 감귤",
    details: "무농약 친환경 재배, 비타민C 풍부한 제철 감귤",
    image: "/mandarin.jpg"
  },
  {
    id: 3,
    name: "제주 천혜향",
    price: 22000,
    description: "향이 진하고 당도 높은 제주 천혜향",
    details: "과즙이 풍부하고 새콤달콤한 맛이 특징인 만감류",
    image: "/chunhyehyang.jpg"
  }
];

export default function Home() {
  return (
    <div className="space-y-12" itemScope itemType="https://schema.org/Organization">
      <meta itemProp="name" content="행복한 감귤농장" />
      <meta itemProp="description" content="제주도 서귀포시에 위치한 친환경 감귤 농장입니다. 감귤, 한라봉, 천혜향 등 다양한 감귤류를 재배하며 직거래 판매와 농장 체험을 운영합니다." />
      <meta itemProp="url" content="https://jejumandarin.com" />
      <meta itemProp="telephone" content="064-123-4567" />
      <meta itemProp="email" content="hello@jejumandarin.com" />
      
      {/* 히어로 섹션 */}
      <section className="relative h-96 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-300">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8 z-10">
            <h1 className="text-4xl font-bold mb-4">제주 행복한 감귤농장의 신선한 감귤 직거래</h1>
            <p className="text-xl mb-6">감귤, 한라봉, 천혜향 등 제주도에서 직접 재배한 신선한 감귤류를 산지 직송으로 만나보세요</p>
            <Link 
              href="/products"
              className="bg-white text-orange-500 px-6 py-3 rounded-full font-medium hover:bg-orange-50 transition"
            >
              제주 감귤 구경하기
            </Link>
          </div>
        </div>
      </section>

      {/* 추천 상품 섹션 */}
      <section itemScope itemType="https://schema.org/ItemList">
        <h2 className="text-2xl font-bold mb-6" itemProp="name">이번 시즌 추천 제주 감귤 상품</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <div key={product.id} itemScope itemType="https://schema.org/Product" itemProp="itemListElement" itemID={`#product-${product.id}`}>
              <meta itemProp="position" content={`${index + 1}`} />
              <Link href={`/products/${product.id}`} className="block">
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
                  <div className="h-48 bg-orange-100 relative" itemProp="image">
                    {/* 실제 이미지가 있을 경우에만 Image 컴포넌트 사용 */}
                    <div className="absolute inset-0 flex items-center justify-center text-orange-500 font-bold">
                      {product.name}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold" itemProp="name">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2" itemProp="description">{product.description}</p>
                    <p className="text-xs text-gray-500 mb-2">{product.details}</p>
                    <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                      <meta itemProp="priceCurrency" content="KRW" />
                      <meta itemProp="availability" content="https://schema.org/InStock" />
                      <p className="font-bold text-orange-600" itemProp="price" content={product.price.toString()}>{product.price.toLocaleString()}원</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 제주도 배경 섹션 */}
      <section className="bg-blue-50 p-8 rounded-xl relative overflow-hidden" itemScope itemType="https://schema.org/Article">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4" itemProp="headline">제주의 자연에서 키운 고품질 감귤</h2>
          <div itemProp="articleBody">
            <p className="mb-4">
              행복한 감귤농장은 제주도 서귀포시 해안가에 위치한 친환경 감귤 농장입니다.
              깨끗한 제주 바닷바람과 풍부한 일조량을 받으며 자란 감귤, 한라봉, 천혜향은 당도가 높고 새콤달콤한 맛이 일품입니다.
            </p>
            <p className="mb-6">
              30년 이상의 감귤 재배 노하우로 최고의 맛과 품질을 자랑하며, 수확한 감귤은 당일 선별 포장하여 가장 신선한 상태로 고객님께 전해드립니다.
              특히 제주도의 특별한 화산토양에서 자란 감귤류는 영양소가 풍부하고 맛이 뛰어납니다.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <div className="flex items-center">
              <span className="text-orange-500 text-3xl mr-2">🌊</span>
              <div>
                <h3 className="font-bold">청정 제주 해안가</h3>
                <p className="text-sm text-gray-600">깨끗한 공기와 물</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-orange-500 text-3xl mr-2">☀️</span>
              <div>
                <h3 className="font-bold">풍부한 일조량</h3>
                <p className="text-sm text-gray-600">달콤함의 비결</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-orange-500 text-3xl mr-2">🚚</span>
              <div>
                <h3 className="font-bold">당일 수확 배송</h3>
                <p className="text-sm text-gray-600">최상의 신선도</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 행복한 감귤농장 견학 안내 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" itemScope itemType="https://schema.org/Event">
        <div>
          <h2 className="text-2xl font-bold mb-4" itemProp="name">제주 감귤 농장 체험 프로그램</h2>
          <p className="mb-4" itemProp="description">행복한 감귤농장에서는 감귤 수확 체험과 농장 견학을 연중 운영하고 있습니다. 제주 여행시 가족, 연인과 함께 특별한 추억을 만들어보세요.</p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <span itemProp="name">감귤 따기 체험</span> (11월~1월)
              <meta itemProp="availability" content="https://schema.org/InStock" />
              <meta itemProp="price" content="15000" />
              <meta itemProp="priceCurrency" content="KRW" />
            </li>
            <li>감귤 농장 투어 프로그램</li>
            <li>제주 특산품 만들기 체험</li>
            <li>어린이 감귤 교실 운영</li>
          </ul>
          <p className="text-sm text-gray-600 mb-4">※ 체험은 사전 예약제로 운영됩니다.</p>
          <Link 
            href="#"
            className="inline-block bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
            itemProp="url"
          >
            체험 예약하기
          </Link>
          <meta itemProp="location" content="제주특별자치도 서귀포시 감귤로 123" />
          <meta itemProp="startDate" content="2024-03-01" />
        </div>
        <div className="bg-blue-100 h-64 rounded-lg flex items-center justify-center text-blue-500 font-bold">
          농장 전경 이미지
        </div>
      </section>
      
      {/* FAQ 섹션 (SEO 강화) */}
      <section className="bg-orange-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">자주 묻는 질문</h2>
        
        <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
          <div itemScope itemType="https://schema.org/Question" className="border-b border-orange-100 pb-4">
            <h3 className="font-bold text-lg mb-2" itemProp="name">제주 감귤은 언제가 제철인가요?</h3>
            <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
              <p className="text-gray-700" itemProp="text">제주 노지 감귤의 제철은 10월부터 이듬해 1월까지입니다. 한라봉은 12월부터 3월, 천혜향은 1월부터 3월이 제철입니다. 하우스 재배 감귤은 4월부터 9월까지 맛볼 수 있습니다.</p>
            </div>
          </div>
          
          <div itemScope itemType="https://schema.org/Question" className="border-b border-orange-100 pb-4">
            <h3 className="font-bold text-lg mb-2" itemProp="name">감귤과 한라봉, 천혜향의 차이점은 무엇인가요?</h3>
            <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
              <p className="text-gray-700" itemProp="text">감귤은 작고 둥근 모양으로 새콤달콤한 맛이 특징입니다. 한라봉은 크기가 크고 꼭지 부분이 튀어나와 있으며 당도가 높고 과즙이 풍부합니다. 천혜향은 한라봉보다 작지만 향이 진하고 과육이 부드러운 것이 특징입니다.</p>
            </div>
          </div>
          
          <div itemScope itemType="https://schema.org/Question">
            <h3 className="font-bold text-lg mb-2" itemProp="name">감귤은 어떻게 보관하는 것이 좋나요?</h3>
            <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
              <p className="text-gray-700" itemProp="text">감귤류는 서늘하고 통풍이 잘 되는 곳에 보관하는 것이 좋습니다. 상온에서는 1-2주, 냉장 보관 시 2-3주 정도 신선도를 유지할 수 있습니다. 습기에 약하므로 물기를 제거하고 보관하는 것이 좋습니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
