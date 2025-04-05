import Link from "next/link";

// 가상의 상품 데이터 (실제로는 API에서 데이터를 가져올 것입니다)
const products = [
  {
    id: 1,
    name: "유기농 딸기",
    price: 15000,
    description: "제철 맛있는 유기농 딸기",
    category: "과일",
    image: "/strawberry.jpg",
    stock: 50,
    origin: "강원도 홍천",
    details: [
      "유기농 인증을 받은 친환경 재배 딸기입니다.",
      "농약과 화학비료를 사용하지 않고 재배했습니다.",
      "신선도 유지를 위해 주문 후 수확하여 배송합니다.",
      "철저한 품질 관리로 최상의 맛을 보장합니다."
    ]
  },
  {
    id: 2,
    name: "친환경 양상추",
    price: 3000,
    description: "무농약으로 재배한 아삭한 양상추",
    category: "채소",
    image: "/lettuce.jpg",
    stock: 100,
    origin: "전라남도 해남",
    details: [
      "무농약 인증을 받은 친환경 양상추입니다.",
      "화학비료 없이 유기농 퇴비로만 재배했습니다.",
      "아삭한 식감과 신선함이 특징입니다.",
      "샐러드, 쌈 등 다양한 요리에 활용 가능합니다."
    ]
  },
  {
    id: 3,
    name: "GAP 인증 사과",
    price: 12000,
    description: "당도 높은 제철 사과",
    category: "과일",
    image: "/apple.jpg",
    stock: 75,
    origin: "경상북도 의성",
    details: [
      "GAP(우수농산물) 인증을 받은 안전한 사과입니다.",
      "최적의 시기에 수확하여 당도가 높습니다.",
      "과육이 단단하고 과즙이 풍부합니다.",
      "저온 저장고에서 보관하여 신선도를 유지합니다."
    ]
  },
  {
    id: 4,
    name: "유기농 당근",
    price: 4500,
    description: "영양 가득한 유기농 당근",
    category: "채소",
    image: "/carrot.jpg",
    stock: 120,
    origin: "제주도",
    details: [
      "유기농 인증을 받은 건강한 당근입니다.",
      "화학비료와 농약을 사용하지 않고 재배했습니다.",
      "단단하고 아삭한 식감이 일품입니다.",
      "생으로 드셔도 안전하고 맛있습니다."
    ]
  }
];

type Props = {
  params: {
    id: string;
  };
};

export default function ProductDetail({ params }: Props) {
  const productId = parseInt(params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h1>
        <p className="mb-6">요청하신 상품이 존재하지 않거나 삭제되었습니다.</p>
        <Link 
          href="/products" 
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          상품 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/products" className="text-green-600 hover:underline">
          ← 상품 목록으로 돌아가기
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 상품 이미지 */}
        <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
          상품 이미지
        </div>

        {/* 상품 정보 */}
        <div>
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-green-700 mb-4">{product.price.toLocaleString()}원</p>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-sm text-gray-600">원산지: {product.origin}</p>
            <p className="text-sm text-gray-600">재고: {product.stock}개</p>
          </div>

          {/* 수량 선택 및 장바구니 */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="mr-4">수량</span>
              <div className="flex border rounded-md">
                <button className="px-3 py-1 border-r">-</button>
                <span className="px-4 py-1">1</span>
                <button className="px-3 py-1 border-l">+</button>
              </div>
            </div>
            
            <button className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 mb-2">
              장바구니에 담기
            </button>
            
            <button className="w-full border border-green-600 text-green-600 py-3 rounded-md font-medium hover:bg-green-50">
              바로 구매하기
            </button>
          </div>

          {/* 상품 상세 정보 */}
          <div>
            <h2 className="text-xl font-semibold mb-3">상품 상세 정보</h2>
            <ul className="list-disc pl-5 space-y-2">
              {product.details.map((detail, index) => (
                <li key={index} className="text-gray-700">{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 