import Link from "next/link";

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
          className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
        >
          상품 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/products" className="text-orange-500 hover:underline flex items-center">
          <span className="mr-1">←</span> 상품 목록으로 돌아가기
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 상품 이미지 */}
        <div className="aspect-square bg-orange-50 rounded-lg flex items-center justify-center text-orange-500 font-bold text-xl">
          {product.name}
        </div>

        {/* 상품 정보 */}
        <div>
          <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-orange-600 mb-4">{product.price.toLocaleString()}원</p>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 bg-orange-50 p-4 rounded-lg">
              <p>원산지: {product.origin}</p>
              <p>수확 시기: {product.harvestDate}</p>
              <p>재고: {product.stock}개</p>
              <p>배송: 제주 직송</p>
            </div>
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
            
            <button className="w-full bg-orange-500 text-white py-3 rounded-md font-medium hover:bg-orange-600 mb-2">
              장바구니에 담기
            </button>
            
            <button className="w-full border border-orange-500 text-orange-500 py-3 rounded-md font-medium hover:bg-orange-50">
              바로 구매하기
            </button>
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
    </div>
  );
} 