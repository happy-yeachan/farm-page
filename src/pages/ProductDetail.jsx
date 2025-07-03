import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 실제로는 API에서 데이터를 가져와야 합니다
  const product = {
    id: 1,
    name: '프리미엄 한라봉',
    description: '제주 햇살을 가득 담은 달콤한 한라봉',
    longDescription: `
      제주도의 따뜻한 햇살과 깨끗한 공기, 비옥한 화산토양에서 자란 프리미엄 한라봉입니다.
      
      - 당도: 13브릭스 이상
      - 크기: 중과 ~ 대과
      - 보관방법: 냉장보관 (0~5도)
      - 배송방법: 신선배송
      
      * 산지 직송으로 더욱 신선한 상품을 만나보세요.
      * 제주도 현지 계약농가에서 직접 수확한 상품입니다.
    `,
    price: 25000,
    weight: '3kg',
    origin: '제주도',
    emoji: '🍊',
    category: '한라봉',
    images: ['🍊', '📦', '🌳'], // 실제로는 이미지 URL이 들어가야 합니다
    shippingInfo: {
      method: '신선배송',
      fee: '3,000원',
      freeOver: '50,000원'
    }
  };

  useEffect(() => {
    // 동적으로 메타 태그 업데이트
    document.title = `${product.name} | 행복한감귤농장`;
    
    // description 메타 태그 업데이트
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        `${product.name} - ${product.description} | 행복한감귤농장의 프리미엄 제주 감귤 직거래 쇼핑몰`
      );
    }

    // og:title 메타 태그 업데이트
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', `${product.name} | 행복한감귤농장`);
    }

    // og:description 메타 태그 업데이트
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 
        `${product.name} - ${product.description} | 행복한감귤농장의 프리미엄 제주 감귤 직거래 쇼핑몰`
      );
    }
  }, [product]);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(99, value));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    // TODO: 장바구니 추가 로직
    alert(`장바구니에 ${product.name} ${quantity}개가 추가되었습니다.`);
  };

  const handleBuyNow = () => {
    // TODO: 즉시 구매 로직
    alert('구매 페이지로 이동합니다.');
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  };

  return (
    <div className="container product-detail">
      <div className="product-detail-grid">
        {/* 상품 이미지 섹션 */}
        <div className="product-images">
          <div className="main-image">
            <span>{product.images[selectedImage]}</span>
          </div>
          <div className="image-thumbnails">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                {image}
              </button>
            ))}
          </div>
        </div>

        {/* 상품 정보 섹션 */}
        <div className="product-info-detail">
          <h1>{product.name}</h1>
          <p className="description">{product.description}</p>
          <div className="price-section">
            <span className="price">{formatPrice(product.price)}</span>
          </div>

          <div className="product-meta-detail">
            <div className="meta-item">
              <span className="meta-label">중량</span>
              <span>{product.weight}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">원산지</span>
              <span>{product.origin}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">카테고리</span>
              <span>{product.category}</span>
            </div>
          </div>

          <div className="purchase-section">
            <div className="quantity-selector">
              <button 
                className="quantity-button"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                min="1"
                max="99"
                className="quantity-input"
              />
              <button 
                className="quantity-button"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
            <div className="total-price">
              <span className="label">총 상품금액</span>
              <span className="price">{formatPrice(product.price * quantity)}</span>
            </div>
            <div className="action-buttons">
              <button className="cart-button" onClick={handleAddToCart}>
                장바구니 담기
              </button>
              <button className="buy-button" onClick={handleBuyNow}>
                바로 구매하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 상품 상세 정보 */}
      <div className="product-details">
        <div className="section">
          <h2>상품 상세 정보</h2>
          <pre className="description">{product.longDescription}</pre>
        </div>

        {/* 배송 정보 */}
        <div className="section">
          <h2>배송 정보</h2>
          <div className="shipping-info">
            <div className="meta-item">
              <span className="label">배송방법</span>
              <span className="value">{product.shippingInfo.method}</span>
            </div>
            <div className="meta-item">
              <span className="label">배송비</span>
              <span className="value">{product.shippingInfo.fee}</span>
            </div>
            <div className="meta-item">
              <span className="label">무료배송</span>
              <span className="value">{product.shippingInfo.freeOver} 이상 구매시</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 