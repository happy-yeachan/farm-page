// 공통으로 사용할 상품 데이터 
export const products = [
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
  },
  {
    id: 5,
    name: "레드향",
    price: 26000,
    description: "제주에서 재배한 레드향",
    category: "만감류",
    image: "/redhyang.jpg",
    stock: 60,
    origin: "제주특별자치도 서귀포시",
    harvestDate: "2024년 1월",
    details: [
      "레드향은 감귤과 오렌지의 교배종으로 달콤한 맛이 특징입니다.",
      "과육이 단단하고 즙이 많아 식감이 좋습니다.",
      "비타민C가 풍부하여 건강에 좋습니다.",
      "제주 특유의 화산토양에서 자라 영양소가 풍부합니다."
    ]
  },
  {
    id: 6,
    name: "황금향",
    price: 28000,
    description: "황금빛 과육의 달콤한 황금향",
    category: "만감류",
    image: "/hwanggeumhyang.jpg",
    stock: 45,
    origin: "제주특별자치도 서귀포시",
    harvestDate: "2024년 2월",
    details: [
      "황금향은 황금색 과육이 특징인 고급 감귤류입니다.",
      "당도가 높고 부드러운 식감으로 인기가 높습니다.",
      "껍질이 얇아 손쉽게 벗겨먹을 수 있습니다.",
      "제주도에서만 생산되는 희소가치 높은 품종입니다."
    ]
  },
  {
    id: 7,
    name: "제주 흑돼지 소시지",
    price: 18000,
    description: "제주 흑돼지로 만든 프리미엄 소시지",
    category: "기타 제품",
    image: "/sausage.jpg",
    stock: 80,
    origin: "제주특별자치도 제주시",
    harvestDate: "2024년 3월",
    details: [
      "제주도 청정 환경에서 자란 흑돼지로 만든 소시지입니다.",
      "첨가물을 최소화하고 천연 재료만 사용했습니다.",
      "풍부한 육즙과 담백한 맛이 특징입니다.",
      "진공 포장되어 신선도를 유지합니다."
    ]
  },
  {
    id: 8,
    name: "감귤 쿠키",
    price: 12000,
    description: "감귤 과즙으로 만든 수제 쿠키",
    category: "기타 제품",
    image: "/cookies.jpg",
    stock: 150,
    origin: "제주특별자치도 서귀포시",
    harvestDate: "2024년 2월",
    details: [
      "제주 감귤 과즙을 넣어 만든 수제 쿠키입니다.",
      "인공 첨가물 없이 천연 재료만 사용했습니다.",
      "바삭한 식감과 은은한 감귤향이 특징입니다.",
      "선물용으로도 인기가 많은 제품입니다."
    ]
  }
]; 