import { Metadata } from "next";
import { products } from "@/app/data/products";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const productId = parseInt(params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return {
      title: "상품을 찾을 수 없습니다 | 행복한 감귤농장",
      description: "요청하신 상품 정보를 찾을 수 없습니다."
    };
  }
  
  // 이미지 경로 처리
  const imageUrl = product.image.startsWith('http') 
    ? product.image 
    : `https://jejumandarin.com${product.image}`;
  
  return {
    title: `${product.name} | 행복한 감귤농장 제주 감귤 직거래`,
    description: `${product.description}. 제주 서귀포시 직영 감귤농장에서 당일 수확한 ${product.name}을 산지 직송으로 신선하게 만나보세요.`,
    keywords: `${product.name}, ${product.category}, 제주 감귤, 제주 특산품, 감귤 직거래, 제주 ${product.category}`,
    openGraph: {
      title: `${product.name} | 행복한 감귤농장`,
      description: product.description,
      type: 'website',
      images: [{
        url: imageUrl,
        width: 800,
        height: 600,
        alt: product.name
      }]
    }
  };
} 