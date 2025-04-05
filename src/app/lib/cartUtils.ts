'use client';

import Cookies from 'js-cookie';

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// 쿠키 이름 설정
const CART_COOKIE_NAME = 'farm_cart';
const CART_EXPIRY_DAYS = 7;

// 쿠키에서 장바구니 아이템 가져오기
export const getCartFromCookie = (): CartItem[] => {
  try {
    const cartData = Cookies.get(CART_COOKIE_NAME);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('장바구니 데이터 로드 실패:', error);
    return [];
  }
};

// 쿠키에 장바구니 아이템 저장
export const saveCartToCookie = (items: CartItem[]): void => {
  try {
    Cookies.set(CART_COOKIE_NAME, JSON.stringify(items), { expires: CART_EXPIRY_DAYS });
  } catch (error) {
    console.error('장바구니 데이터 저장 실패:', error);
  }
};

// 세션 스토리지에서 장바구니 아이템 가져오기 (로그인 사용자용)
export const getCartFromSession = (): CartItem[] => {
  try {
    if (typeof window !== 'undefined') {
      const cartData = sessionStorage.getItem(CART_COOKIE_NAME);
      return cartData ? JSON.parse(cartData) : [];
    }
    return [];
  } catch (error) {
    console.error('세션 장바구니 데이터 로드 실패:', error);
    return [];
  }
};

// 세션 스토리지에 장바구니 아이템 저장 (로그인 사용자용)
export const saveCartToSession = (items: CartItem[]): void => {
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(CART_COOKIE_NAME, JSON.stringify(items));
    }
  } catch (error) {
    console.error('세션 장바구니 데이터 저장 실패:', error);
  }
};

// 장바구니에 상품 추가
export const addToCart = (product: { id: number; name: string; price: number; image: string }, quantity: number, isLoggedIn: boolean): void => {
  // 장바구니 데이터 가져오기
  const cartItems = isLoggedIn ? getCartFromSession() : getCartFromCookie();
  
  // 이미 같은 상품이 있는지 확인
  const existingItemIndex = cartItems.findIndex(item => item.productId === product.id);
  
  if (existingItemIndex !== -1) {
    // 같은 상품이 있으면 수량만 증가
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    // 새로운 상품이면 추가
    cartItems.push({
      id: Date.now(),  // 임시 고유 ID 생성
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image
    });
  }
  
  // 장바구니 저장
  if (isLoggedIn) {
    saveCartToSession(cartItems);
    
    // 로그인한 경우 API 호출해서 서버에도 장바구니 정보 저장 (실제 구현 시)
    // saveCartToServer(cartItems);
  } else {
    saveCartToCookie(cartItems);
  }
};

// 장바구니에서 상품 제거
export const removeFromCart = (productId: number, isLoggedIn: boolean): void => {
  // 장바구니 데이터 가져오기
  const cartItems = isLoggedIn ? getCartFromSession() : getCartFromCookie();
  
  // 해당 상품을 제외한 새 배열 생성
  const updatedItems = cartItems.filter(item => item.productId !== productId);
  
  // 장바구니 저장
  if (isLoggedIn) {
    saveCartToSession(updatedItems);
    // 로그인한 경우 API 호출해서 서버에도 장바구니 정보 저장 (실제 구현 시)
    // saveCartToServer(updatedItems);
  } else {
    saveCartToCookie(updatedItems);
  }
};

// 장바구니 상품 수량 변경
export const updateCartItemQuantity = (productId: number, quantity: number, isLoggedIn: boolean): void => {
  if (quantity < 1) return; // 최소 수량은 1
  
  // 장바구니 데이터 가져오기
  const cartItems = isLoggedIn ? getCartFromSession() : getCartFromCookie();
  
  // 상품 찾기
  const itemIndex = cartItems.findIndex(item => item.productId === productId);
  
  if (itemIndex !== -1) {
    // 수량 업데이트
    cartItems[itemIndex].quantity = quantity;
    
    // 장바구니 저장
    if (isLoggedIn) {
      saveCartToSession(cartItems);
      // 로그인한 경우 API 호출해서 서버에도 장바구니 정보 저장 (실제 구현 시)
      // saveCartToServer(cartItems);
    } else {
      saveCartToCookie(cartItems);
    }
  }
};

// 전체 장바구니 비우기
export const clearCart = (isLoggedIn: boolean): void => {
  if (isLoggedIn) {
    saveCartToSession([]);
    // 로그인한 경우 API 호출해서 서버에도 장바구니 정보 삭제 (실제 구현 시)
    // clearCartOnServer();
  } else {
    saveCartToCookie([]);
  }
};

// 로그인 시 쿠키 장바구니 데이터와 서버 장바구니 데이터 병합
export const mergeCartOnLogin = (serverCartItems: CartItem[] = []): CartItem[] => {
  try {
    // 쿠키에서 장바구니 데이터 가져오기
    const cookieCartItems = getCartFromCookie();
    
    // 서버 장바구니와 쿠키 장바구니 병합
    const mergedItems: CartItem[] = [...serverCartItems];
    
    // 쿠키 장바구니의 각 아이템을 병합
    cookieCartItems.forEach(cookieItem => {
      const existingItemIndex = mergedItems.findIndex(item => item.productId === cookieItem.productId);
      
      if (existingItemIndex !== -1) {
        // 이미 서버 장바구니에 있는 상품이면 수량 합산
        mergedItems[existingItemIndex].quantity += cookieItem.quantity;
      } else {
        // 서버 장바구니에 없는 상품이면 추가
        mergedItems.push(cookieItem);
      }
    });
    
    // 병합된 장바구니를 세션에 저장
    saveCartToSession(mergedItems);
    
    // 쿠키에서 장바구니 데이터 제거
    Cookies.remove(CART_COOKIE_NAME);
    
    // 병합된 장바구니 반환
    return mergedItems;
  } catch (error) {
    console.error('장바구니 병합 실패:', error);
    return serverCartItems;
  }
};

// 장바구니 상품 총 개수 계산
export const getCartItemsCount = (isLoggedIn: boolean): number => {
  const cartItems = isLoggedIn ? getCartFromSession() : getCartFromCookie();
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

// 장바구니 합계 계산
export const getCartTotal = (isLoggedIn: boolean): number => {
  const cartItems = isLoggedIn ? getCartFromSession() : getCartFromCookie();
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}; 