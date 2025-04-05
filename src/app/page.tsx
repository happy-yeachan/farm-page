import Image from "next/image";
import Link from "next/link";

// 가상의 추천 상품 데이터
const featuredProducts = [
  {
    id: 1,
    name: "프리미엄 한라봉",
    price: 25000,
    description: "제주 햇살 가득 머금은 달콤한 한라봉",
    image: "/hanlabong.jpg"
  },
  {
    id: 2,
    name: "유기농 노지 감귤",
    price: 15000,
    description: "제주 흙에서 자란 달콤한 노지 감귤",
    image: "/mandarin.jpg"
  },
  {
    id: 3,
    name: "제주 천혜향",
    price: 22000,
    description: "향이 진하고 당도 높은 제주 천혜향",
    image: "/chunhyehyang.jpg"
  }
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* 히어로 섹션 */}
      <section className="relative h-96 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-600 flex items-center justify-center">
          <div className="text-center text-white p-8 z-10">
            <h1 className="text-4xl font-bold mb-4">제주 행복한 감귤농장에 오신 것을 환영합니다</h1>
            <p className="text-xl mb-6">제주도에서 직접 재배한 신선한 감귤을 집에서 만나보세요</p>
            <Link 
              href="/products"
              className="bg-white text-orange-500 px-6 py-3 rounded-full font-medium hover:bg-orange-50 transition"
            >
              감귤 구경하기
            </Link>
          </div>
        </div>
      </section>

      {/* 추천 상품 섹션 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">이번 시즌 추천 상품</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="block">
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
                <div className="h-48 bg-orange-100 relative">
                  {/* 실제 이미지가 있을 경우에만 Image 컴포넌트 사용 */}
                  <div className="absolute inset-0 flex items-center justify-center text-orange-500 font-bold">
                    {product.name}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <p className="font-bold text-orange-600">{product.price.toLocaleString()}원</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 제주도 배경 섹션 */}
      <section className="bg-blue-50 p-8 rounded-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">제주의 자연에서 키운 감귤</h2>
          <p className="mb-4">
            행복한 감귤농장은 제주도 서귀포시 해안가에 위치한 친환경 감귤 농장입니다.
            깨끗한 제주 바닷바람과 풍부한 일조량을 받으며 자란 감귤은 당도가 높고 새콤달콤한 맛이 일품입니다.
          </p>
          <p className="mb-6">
            30년 이상의 감귤 재배 노하우로 최고의 맛과 품질을 자랑하며, 수확한 감귤은 당일 선별 포장하여 가장 신선한 상태로 고객님께 전해드립니다.
          </p>
          
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
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">농장 견학 안내</h2>
          <p className="mb-4">행복한 감귤농장에서는 감귤 수확 체험과 농장 견학을 연중 운영하고 있습니다.</p>
          <ul className="list-disc pl-5 mb-6 space-y-2">
            <li>감귤 따기 체험 (11월~1월)</li>
            <li>감귤 농장 투어 프로그램</li>
            <li>제주 특산품 만들기 체험</li>
            <li>어린이 감귤 교실 운영</li>
          </ul>
          <p className="text-sm text-gray-600 mb-4">※ 체험은 사전 예약제로 운영됩니다.</p>
          <Link 
            href="#"
            className="inline-block bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
          >
            체험 예약하기
          </Link>
        </div>
        <div className="bg-blue-100 h-64 rounded-lg flex items-center justify-center text-blue-500 font-bold">
          농장 전경 이미지
        </div>
      </section>
    </div>
  );
}
