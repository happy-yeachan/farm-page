import React from 'react';

function Cart() {
  // 실제로는 상태 관리 라이브러리나 Context를 사용해야 합니다
  const cartItems = [
    {
      id: 1,
      name: '프리미엄 한라봉',
      price: '25,000원',
      quantity: 2,
      emoji: '🍊',
      weight: '3kg'
    },
    {
      id: 2,
      name: '유기농 노지 감귤',
      price: '15,000원',
      quantity: 1,
      emoji: '🍊',
      weight: '5kg'
    }
  ];

  return (
    <div className="container cart-page">
      <h1>장바구니</h1>

      {cartItems.length > 0 ? (
        <div className="cart-grid">
          <div className="cart-items">
            {/* 장바구니 아이템 목록 */}
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <span>{item.emoji}</span>
                </div>
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-weight">{item.weight}</p>
                </div>
                <div className="item-quantity">
                  <button className="quantity-button">-</button>
                  <span>{item.quantity}</span>
                  <button className="quantity-button">+</button>
                </div>
                <div className="item-price">
                  <span>{item.price}</span>
                </div>
                <button className="remove-button">삭제</button>
              </div>
            ))}
          </div>

          {/* 주문 요약 */}
          <div className="order-summary">
            <h2>주문 요약</h2>
            <div className="summary-item">
              <span>상품금액</span>
              <span>65,000원</span>
            </div>
            <div className="summary-item">
              <span>배송비</span>
              <span>3,000원</span>
            </div>
            <div className="summary-total">
              <span>총 주문금액</span>
              <span>68,000원</span>
            </div>
            <button className="checkout-button">
              주문하기
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <span className="empty-cart-emoji">🛒</span>
          <p>장바구니가 비어있습니다</p>
          <button className="continue-shopping">쇼핑 계속하기</button>
        </div>
      )}
    </div>
  );
}

export default Cart; 