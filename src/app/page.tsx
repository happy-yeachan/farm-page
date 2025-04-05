import Image from "next/image";
import Link from "next/link";

// 가상의 추천 상품 데이터
const featuredProducts = [
  {
    id: 1,
    name: "유기농 딸기",
    price: 15000,
    description: "제철 맛있는 유기농 딸기",
    image: "/strawberry.jpg"
  },
  {
    id: 2,
    name: "친환경 양상추",
    price: 3000,
    description: "무농약으로 재배한 아삭한 양상추",
    image: "/lettuce.jpg"
  },
  {
    id: 3,
    name: "GAP 인증 사과",
    price: 12000,
    description: "당도 높은 제철 사과",
    image: "/apple.jpg"
  }
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* 히어로 섹션 */}
      <section className="relative h-80 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-green-800 flex items-center justify-center">
          <div className="text-center text-white p-8 z-10">
            <h1 className="text-4xl font-bold mb-4">신선한 농장에 오신 것을 환영합니다</h1>
            <p className="text-xl mb-6">농부에게 직접 구매하는 신선한 농산물</p>
            <Link 
              href="/products"
              className="bg-white text-green-800 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition"
            >
              상품 보러가기
            </Link>
          </div>
        </div>
      </section>

      {/* 추천 상품 섹션 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">이번 주 추천 상품</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="block">
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
                <div className="h-48 bg-gray-200 relative">
                  {/* 실제 이미지가 있을 경우에만 Image 컴포넌트 사용 */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    상품 이미지
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <p className="font-bold text-green-700">{product.price.toLocaleString()}원</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 농장 소개 섹션 */}
      <section className="bg-gray-50 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">우리 농장을 소개합니다</h2>
        <p className="mb-4">
          신선한 농장은 20년 이상의 친환경 농사 경험을 바탕으로 최고 품질의 농산물만을 제공합니다.
          무농약, 유기농 재배 방식으로 건강한 먹거리를 책임지고 있습니다.
        </p>
        <p>
          직거래를 통해 중간 유통 과정 없이 농장에서 바로 여러분의 식탁까지 신선한 농산물을 전해드립니다.
        </p>
      </section>
    </div>
  );
}
