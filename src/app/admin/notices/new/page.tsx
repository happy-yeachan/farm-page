'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 카테고리 목록
const categories = ['출하안내', '배송안내', '이벤트', '안내', '상품안내'];

export default function AdminNewNoticePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<{isAdmin: boolean} | null>(null);
  const [loading, setLoading] = useState(true);
  
  // 폼 필드
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('안내');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // 관리자 인증 확인
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user.isAdmin) {
            setUserData(user);
            setLoading(false);
            return;
          }
        }
        // 관리자가 아니면 로그인 페이지로 이동
        router.push('/login');
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // 공지사항 등록
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    
    // 실제로는 API 호출을 통해 저장
    setTimeout(() => {
      alert('공지사항이 등록되었습니다.');
      router.push('/admin/notices');
    }, 1000);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">인증 확인 중...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">새 공지사항 작성</h1>
          <p className="text-gray-600">
            농장 관련 새로운 소식이나 정보를 등록하세요
          </p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/admin/notices" 
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
      
      {/* 공지사항 작성 폼 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              카테고리
            </label>
            <select
              id="category"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              제목
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="공지사항 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              내용
            </label>
            <textarea
              id="content"
              rows={12}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="공지사항 내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Link
              href="/admin/notices"
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
            >
              취소
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 