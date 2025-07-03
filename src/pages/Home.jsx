import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const products = [
    {
      id: 1,
      name: '프리미엄 한라봉',
      description: '제주 햇살을 가득 담은 달콤한 한라봉',
      price: '25,000원',
      weight: '3kg',
      origin: '제주도',
      emoji: '🍊'
    },
    {
      id: 2,
      name: '유기농 노지 감귤',
      description: '친환경 인증받은 제주 노지 감귤',
      price: '15,000원',
      weight: '5kg',
      origin: '제주도',
      emoji: '🍊'
    },
    {
      id: 3,
      name: '고당도 천혜향',
      description: '당도 13브릭스 이상 보장',
      price: '35,000원',
      weight: '3kg',
      origin: '제주도',
      emoji: '🍊'
    }
  ];

  return (
    <>
      {/* 히어로 섹션 */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>
              행복한 감귤농장의<br />달콤함을 선물하세요
            </h1>
            <p>
              청정 제주에서 자란 프리미엄 감귤을<br />
              합리적인 가격으로 만나보세요
            </p>
            <Link to="/products" className="hero-button">
              구매하기
            </Link>
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <main className="container products">
        <h2>이번 주 인기 상품</h2>
        <div className="product-grid">
          {products.map(product => (
            <Link 
              key={product.id} 
              to={`/products/${product.id}`} 
              className="product-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="product-image">
                <span>{product.emoji}</span>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-meta">
                  <div className="meta-item">
                    <span className="meta-label">중량</span>
                    <span>{product.weight}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">원산지</span>
                    <span>{product.origin}</span>
                  </div>
                </div>
                <div className="product-footer">
                  <span className="price">{product.price}</span>
                  <button 
                    className="add-to-cart"
                    onClick={(e) => {
                      e.preventDefault();
                      // 장바구니 추가 로직
                    }}
                  >
                    장바구니 담기
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export default Home; 