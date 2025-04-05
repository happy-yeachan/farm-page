'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "로그인 | 행복한 감귤농장",
  description: "행복한 감귤농장 로그인 페이지입니다. 회원 로그인을 통해 주문 내역 확인 및 다양한 혜택을 누려보세요.",
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 실제로는 API 호출이 필요하지만, 여기서는 간단한 예시로만 구현
      // Admin 계정 확인 (예: admin@example.com / admin123)
      if (email === 'admin@example.com' && password === 'admin123') {
        // 로컬 스토리지에 관리자 상태 저장
        localStorage.setItem('user', JSON.stringify({ 
          email, 
          isAdmin: true, 
          name: '관리자' 
        }));
        
        // 관리자 페이지로 이동
        router.push('/admin/dashboard');
        return;
      } 
      
      // 일반 사용자 계정 (예: user@example.com / user123)
      else if (email === 'user@example.com' && password === 'user123') {
        // 로컬 스토리지에 사용자 상태 저장
        localStorage.setItem('user', JSON.stringify({ 
          email, 
          isAdmin: false, 
          name: '홍길동' 
        }));
        
        // 홈 페이지로 이동
        router.push('/');
        return;
      }
      
      // 로그인 실패
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    
    // 소셜 로그인 처리 (실제로는 각 서비스의 OAuth 인증 과정이 필요)
    setTimeout(() => {
      console.log(`${provider} 로그인 시도`);
      
      // 테스트를 위해 소셜 로그인 성공으로 가정하고 일반 사용자로 로그인
      localStorage.setItem('user', JSON.stringify({ 
        email: `user@${provider.toLowerCase()}.com`, 
        isAdmin: false, 
        name: '소셜 사용자',
        provider: provider
      }));
      
      router.push('/');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-2">로그인</h1>
      <p className="text-gray-600 mb-8">행복한 감귤농장 회원 로그인</p>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="이메일을 입력하세요"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          
          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </div>
          
          <div className="flex justify-between text-sm">
            <Link href="/signup" className="text-orange-600 hover:underline">
              회원가입
            </Link>
            <Link href="/forgot-password" className="text-orange-600 hover:underline">
              비밀번호 찾기
            </Link>
          </div>
        </form>
        
        {/* 소셜 로그인 섹션 */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">간편 로그인</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            {/* 카카오 로그인 */}
            <button
              type="button"
              onClick={() => handleSocialLogin('Kakao')}
              className="w-full flex items-center justify-center gap-3 bg-[#FEE500] text-[#191919] py-2 px-4 rounded-md hover:bg-[#F4DC00] focus:outline-none focus:ring-2 focus:ring-[#FEE500] focus:ring-opacity-50"
              disabled={loading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3C7.03125 3 3 6.03513 3 9.76562C3 12.1722 4.50625 14.2869 6.825 15.4888L5.95312 18.7619C5.93125 18.8372 5.97188 18.915 6.04688 18.9591C6.09375 18.9872 6.15 19.0013 6.20625 19.0013C6.24688 19.0013 6.2875 18.9941 6.32812 18.9788L9.9625 16.9003C10.6219 17.0194 11.3016 17.0809 12 17.0809C16.9688 17.0809 21 14.0458 21 10.3153C21 6.58483 16.9688 3 12 3Z" fill="#191919" />
              </svg>
              카카오 로그인
            </button>
            
            {/* 네이버 로그인 */}
            <button
              type="button"
              onClick={() => handleSocialLogin('Naver')}
              className="w-full flex items-center justify-center gap-3 bg-[#03C75A] text-white py-2 px-4 rounded-md hover:bg-[#02B350] focus:outline-none focus:ring-2 focus:ring-[#03C75A] focus:ring-opacity-50"
              disabled={loading}
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5215 10.6423L6.0225 0H0V20H6.4775V9.3577L13.9775 20H20V0H13.5215V10.6423Z" fill="white" />
              </svg>
              네이버 로그인
            </button>
            
            {/* 구글 로그인 */}
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
              disabled={loading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.7663 12.2764C23.7663 11.4607 23.7001 10.6406 23.559 9.83807H12.2402V14.4591H18.722C18.453 15.9494 17.5888 17.2678 16.3233 18.1056V21.1039H20.1903C22.4611 19.0139 23.7663 15.9274 23.7663 12.2764Z" fill="#4285F4" />
                <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853" />
                <path d="M5.50253 14.3003C5.00966 12.8099 5.00966 11.1961 5.50253 9.70575V6.61481H1.51649C-0.15583 10.0056 -0.15583 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC04" />
                <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335" />
              </svg>
              구글 로그인
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-orange-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">테스트 계정 안내</h2>
        <p className="text-sm text-gray-700 mb-2">테스트를 위한 계정 정보입니다:</p>
        <div className="space-y-2 text-sm">
          <div className="flex flex-col">
            <span className="font-semibold">일반 회원</span>
            <span>- 이메일: user@example.com</span>
            <span>- 비밀번호: user123</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">관리자</span>
            <span>- 이메일: admin@example.com</span>
            <span>- 비밀번호: admin123</span>
          </div>
        </div>
      </div>
    </div>
  );
} 