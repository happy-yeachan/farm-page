import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Products() {
  useEffect(() => {
    document.title = "제주 감귤 상품 목록 | 행복한감귤농장";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        "제주 행복한감귤농장의 프리미엄 감귤, 한라봉, 천혜향, 레드향 상품 목록입니다. 신선한 제주 감귤을 직거래로 만나보세요."
      );
    }
  }, []);

  const products = [
    {
      id: 1,
      name: '프리미엄 한라봉',
      description: '제주 햇살을 가득 담은 달콤한 한라봉',
      price: '25,000원',
      weight: '3kg',
      origin: '제주도',
      emoji: '🍊',
      category: '한라봉'
    },
    {
      id: 2,
      name: '유기농 노지 감귤',
      description: '친환경 인증받은 제주 노지 감귤',
      price: '15,000원',
      weight: '5kg',
      origin: '제주도',
      emoji: '🍊',
      category: '감귤'
    },
    {
      id: 3,
      name: '고당도 천혜향',
      description: '당도 13브릭스 이상 보장',
      price: '35,000원',
      weight: '3kg',
      origin: '제주도',
      emoji: '🍊',
      category: '천혜향'
    },
    {
      id: 4,
      name: '제주 레드향',
      description: '달콤한 향이 가득한 레드향',
      price: '30,000원',
      weight: '3kg',
      origin: '제주도',
      emoji: '🍊',
      category: '레드향'
    },
    {
      id: 5,
      name: '어린이용 작은 감귤',
      description: '아이들이 먹기 좋은 크기의 감귤',
      price: '12,000원',
      weight: '2kg',
      origin: '제주도',
      emoji: '🍊',
      category: '감귤'
    },
    {
      id: 6,
      name: '선물용 프리미엄 세트',
      description: '한라봉, 천혜향, 레드향 혼합 세트',
      price: '45,000원',
      weight: '5kg',
      origin: '제주도',
      emoji: '🎁',
      category: '선물세트'
    }
  ];

  const categories = ['전체', '한라봉', '감귤', '천혜향', '레드향', '선물세트'];

  return (
    <div className="container products-page">
      <div className="products-header">
        <h1>상품 목록</h1>
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              className="category-button"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <Link to={`/products/${product.id}`} key={product.id} className="product-card">
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
                <button className="add-to-cart" onClick={(e) => {
                  e.preventDefault();
                  // 장바구니 추가 로직
                }}>
                  장바구니 담기
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products; 