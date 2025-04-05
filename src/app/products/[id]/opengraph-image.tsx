import { ImageResponse } from 'next/server';
import { products } from '@/app/data/products';

// Route segment config
export const runtime = 'edge';
export const revalidate = 3600; // 1시간마다 재검증

// Image metadata
export const alt = '행복한 감귤농장 상품 이미지';
export const size = {
  width: 1200,
  height: 630,
};

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  try {
    const productId = parseInt(params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return new ImageResponse(
        (
          <div
            style={{
              background: 'linear-gradient(to bottom, #ff7e00, #ffa500)',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontFamily: 'sans-serif',
            }}
          >
            <div style={{ fontSize: 60, fontWeight: 'bold', marginBottom: 24 }}>
              행복한 감귤농장
            </div>
            <div style={{ fontSize: 36 }}>상품을 찾을 수 없습니다</div>
          </div>
        ),
        { ...size }
      );
    }
    
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(to bottom, #ff7e00, #ffa500)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '90%',
              height: '90%',
              background: 'white',
              borderRadius: 24,
              display: 'flex',
              padding: 40,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '50%',
                padding: '0 20px',
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 'bold', color: '#ff7e00', marginBottom: 12 }}>
                행복한 감귤농장
              </div>
              <div style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 24, color: '#333' }}>
                {product.name}
              </div>
              <div style={{ fontSize: 24, color: '#666', marginBottom: 16 }}>
                {product.description}
              </div>
              <div style={{ fontSize: 36, fontWeight: 'bold', color: '#ff7e00' }}>
                {product.price.toLocaleString()}원
              </div>
            </div>
            <div
              style={{
                width: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 400,
                  height: 400,
                  borderRadius: 12,
                  background: '#fff4e6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 36,
                  color: '#ff7e00',
                  fontWeight: 'bold',
                }}
              >
                {product.name}
              </div>
            </div>
          </div>
        </div>
      ),
      { ...size }
    );
  } catch (error) {
    return new ImageResponse(
      (
        <div
          style={{
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 'bold' }}>이미지 생성 오류</div>
        </div>
      ),
      { ...size }
    );
  }
} 