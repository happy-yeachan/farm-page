import Link from "next/link";

// 가상의 상품 데이터
const products = [
  {
    id: 1,
    name: "유기농 딸기",
    price: 15000,
    description: "제철 맛있는 유기농 딸기",
    category: "과일",
    image: "/strawberry.jpg"
  },
  {
    id: 2,
    name: "친환경 양상추",
    price: 3000,
    description: "무농약으로 재배한 아삭한 양상추",
    category: "채소",
    image: "/lettuce.jpg"
  },
  {
    id: 3,
    name: "GAP 인증 사과",
    price: 12000,
    description: "당도 높은 제철 사과",
    category: "과일",
    image: "/apple.jpg"
  },
  {
    id: 4,
    name: "유기농 당근",
    price: 4500,
    description: "영양 가득한 유기농 당근",
    category: "채소",
    image: "/carrot.jpg"
  },
  {
    id: 5,
    name: "무농약 감자",
    price: 8000,
    description: "믿을 수 있는 국내산 감자",
    category: "채소",
    image: "/potato.jpg"
  },
  {
    id: 6,
    name: "제철 귤",
    price: 20000,
    description: "달콤한 제철 귤",
    category: "과일",
    image: "/tangerine.jpg"
  }
];

// 카테고리 목록
const categories = ["전체", "과일", "채소"];

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">상품 목록</h1>
      
      {/* 카테고리 필터 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">카테고리</h2>
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 border rounded-full hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* 상품 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id} className="block">
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
              <div className="h-48 bg-gray-200 relative">
                {/* 실제 이미지가 있을 경우에만 Image 컴포넌트 사용 */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  상품 이미지
                </div>
              </div>
              <div className="p-4">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2">
                  {product.category}
                </span>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="font-bold text-green-700">{product.price.toLocaleString()}원</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 