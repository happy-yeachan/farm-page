import Link from "next/link";

// 가상의 상품 데이터
const products = [
  {
    id: 1,
    name: "프리미엄 한라봉",
    price: 25000,
    description: "제주 햇살 가득 머금은 달콤한 한라봉",
    category: "만감류",
    image: "/hanlabong.jpg"
  },
  {
    id: 2,
    name: "유기농 노지 감귤",
    price: 15000,
    description: "제주 흙에서 자란 달콤한 노지 감귤",
    category: "감귤",
    image: "/mandarin.jpg"
  },
  {
    id: 3,
    name: "제주 천혜향",
    price: 22000,
    description: "향이 진하고 당도 높은 제주 천혜향",
    category: "만감류",
    image: "/chunhyehyang.jpg"
  },
  {
    id: 4,
    name: "하우스 감귤",
    price: 19000,
    description: "하우스에서 정성껏 재배한 감귤",
    category: "감귤",
    image: "/house-mandarin.jpg"
  },
  {
    id: 5,
    name: "레드향",
    price: 26000,
    description: "제주에서 재배한 레드향",
    category: "만감류",
    image: "/redhyang.jpg"
  },
  {
    id: 6,
    name: "황금향",
    price: 28000,
    description: "황금빛 과육의 달콤한 황금향",
    category: "만감류",
    image: "/hwanggeumhyang.jpg"
  },
  {
    id: 7,
    name: "제주 흑돼지 소시지",
    price: 18000,
    description: "제주 흑돼지로 만든 프리미엄 소시지",
    category: "기타 제품",
    image: "/sausage.jpg"
  },
  {
    id: 8,
    name: "감귤 쿠키",
    price: 12000,
    description: "감귤 과즙으로 만든 수제 쿠키",
    category: "기타 제품",
    image: "/cookies.jpg"
  }
];

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id} className="block">
            <div className="border border-orange-100 rounded-lg overflow-hidden hover:shadow-md transition">
              <div className="h-48 bg-orange-50 relative">
                {/* 실제 이미지가 있을 경우에만 Image 컴포넌트 사용 */}
                <div className="absolute inset-0 flex items-center justify-center text-orange-500 font-bold">
                  {product.name}
                </div>
              </div>
              <div className="p-4">
                <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mb-2">
                  {product.category}
                </span>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="font-bold text-orange-600">{product.price.toLocaleString()}원</p>
              </div>
            </div>
          </Link>
        ))}
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