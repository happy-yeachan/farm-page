import Link from "next/link";

// 가상의 장바구니 아이템 데이터
const cartItems = [
  {
    id: 1,
    productId: 1,
    name: "프리미엄 한라봉",
    price: 25000,
    quantity: 2,
    image: "/hanlabong.jpg"
  },
  {
    id: 2,
    productId: 3,
    name: "제주 천혜향",
    price: 22000,
    quantity: 1,
    image: "/chunhyehyang.jpg"
  },
  {
    id: 3,
    productId: 2,
    name: "유기농 노지 감귤",
    price: 15000,
    quantity: 3,
    image: "/mandarin.jpg"
  }
];

export default function CartPage() {
  // 장바구니 합계 계산
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = subtotal >= 30000 ? 0 : 3000; // 3만원 이상 무료 배송
  const total = subtotal + shippingFee;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">장바구니</h1>
      <p className="text-gray-600 mb-8">행복한 감귤농장의 맛있는 제품을 담아보세요</p>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-orange-50 rounded-lg">
          <div className="text-6xl mb-4">🍊</div>
          <h2 className="text-xl font-semibold mb-4">장바구니가 비어있습니다</h2>
          <p className="mb-6 text-gray-600">제주 감귤 상품을 담아보세요!</p>
          <Link 
            href="/products" 
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
          >
            쇼핑 계속하기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 장바구니 상품 목록 */}
          <div className="lg:col-span-2">
            <div className="border border-orange-100 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-orange-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">상품정보</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">수량</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">금액</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">삭제</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-100">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 bg-orange-100 rounded flex items-center justify-center text-xs text-orange-500 font-medium">
                            {item.name.substring(0, 2)}
                          </div>
                          <div className="ml-4">
                            <Link href={`/products/${item.productId}`} className="font-medium text-gray-900 hover:text-orange-600">
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">제주 직송</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <div className="flex border rounded-md">
                            <button className="px-2 py-1 border-r">-</button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button className="px-2 py-1 border-l">+</button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        {(item.price * item.quantity).toLocaleString()}원
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-orange-500 hover:text-orange-700">삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* 참고 안내 */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-semibold mb-2 flex items-center">
                <span className="text-orange-500 mr-2">📢</span> 안내사항
              </h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 제주도에서 출발하는 상품으로 배송이 1-2일 더 소요될 수 있습니다.</li>
                <li>• 30,000원 이상 구매 시 배송비가 무료입니다.</li>
                <li>• 신선 상품 특성상 단순 변심에 의한 교환/환불이 제한될 수 있습니다.</li>
              </ul>
            </div>
          </div>

          {/* 주문 요약 */}
          <div className="lg:col-span-1">
            <div className="border border-orange-100 rounded-lg p-6 bg-orange-50">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <span className="text-orange-500 mr-2">🛒</span> 주문 요약
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">상품 금액</span>
                  <span className="font-medium">{subtotal.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">배송비</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? "무료" : `${shippingFee.toLocaleString()}원`}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <div className="text-xs text-orange-600">
                    * {(30000 - subtotal).toLocaleString()}원 더 구매 시 무료배송
                  </div>
                )}
                <div className="border-t border-orange-200 pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>총 결제금액</span>
                    <span className="text-orange-600">{total.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-orange-500 text-white py-3 rounded-md font-medium hover:bg-orange-600 mb-2">
                주문하기
              </button>
              
              <Link 
                href="/products"
                className="block w-full text-center border border-orange-300 py-3 rounded-md font-medium hover:bg-orange-100 text-gray-700"
              >
                쇼핑 계속하기
              </Link>
              
              {/* 포인트 적립 안내 */}
              <div className="mt-6 p-3 bg-white rounded-md text-xs text-gray-600">
                <p className="font-medium text-sm mb-2">구매혜택</p>
                <p className="mb-1">• 구매금액의 3% 포인트 적립</p>
                <p>• 제주 감귤 시즌 회원 추가 할인</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 