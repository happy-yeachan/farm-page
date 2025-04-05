import Link from "next/link";

// 가상의 장바구니 아이템 데이터
const cartItems = [
  {
    id: 1,
    productId: 1,
    name: "유기농 딸기",
    price: 15000,
    quantity: 2,
    image: "/strawberry.jpg"
  },
  {
    id: 2,
    productId: 3,
    name: "GAP 인증 사과",
    price: 12000,
    quantity: 1,
    image: "/apple.jpg"
  },
  {
    id: 3,
    productId: 4,
    name: "유기농 당근",
    price: 4500,
    quantity: 3,
    image: "/carrot.jpg"
  }
];

export default function CartPage() {
  // 장바구니 합계 계산
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = subtotal >= 50000 ? 0 : 3000; // 5만원 이상 무료 배송
  const total = subtotal + shippingFee;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">장바구니</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">장바구니가 비어있습니다</h2>
          <p className="mb-6 text-gray-600">상품을 담아주세요.</p>
          <Link 
            href="/products" 
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            쇼핑 계속하기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 장바구니 상품 목록 */}
          <div className="lg:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">상품정보</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">수량</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">금액</th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">삭제</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                            상품 이미지
                          </div>
                          <div className="ml-4">
                            <Link href={`/products/${item.productId}`} className="font-medium text-gray-900 hover:text-green-600">
                              {item.name}
                            </Link>
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
                        <button className="text-red-500 hover:text-red-700">삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 주문 요약 */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 bg-gray-50">
              <h2 className="text-lg font-semibold mb-4">주문 요약</h2>
              
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
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>총 결제금액</span>
                    <span className="text-green-700">{total.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 mb-2">
                주문하기
              </button>
              
              <Link 
                href="/products"
                className="block w-full text-center border border-gray-300 py-3 rounded-md font-medium hover:bg-gray-100 text-gray-700"
              >
                쇼핑 계속하기
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 