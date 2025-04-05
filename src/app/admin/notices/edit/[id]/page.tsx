'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 공지사항 모의 데이터
const notices = [
  {
    id: 1,
    title: "2024년 한라봉 수확 시작 및 출하 안내",
    date: "2024-01-15",
    category: "출하안내",
    views: 1245,
    content: "안녕하세요, 행복한 감귤농장입니다. 2024년 한라봉 수확이 시작되어 1월 20일부터 순차적으로 출하될 예정입니다."
  },
  {
    id: 2,
    title: "설 명절 배송 안내",
    date: "2024-01-30",
    category: "배송안내",
    views: 958,
    content: "설 연휴 기간 택배사 휴무로 인해 2월 8일부터 2월 12일까지 배송이 불가능합니다."
  },
  {
    id: 3,
    title: "제주 감귤 농장 체험 프로그램 오픈",
    date: "2024-02-15",
    category: "이벤트",
    views: 782,
    content: "3월부터 제주 감귤 농장 체험 프로그램이 오픈됩니다. 가족 단위로 참여하시면 할인 혜택이 있습니다."
  },
  {
    id: 4,
    title: "홈페이지 리뉴얼 오픈 및 회원 혜택 안내",
    date: "2024-03-05",
    category: "안내",
    views: 651,
    content: "행복한 감귤농장 홈페이지가 새롭게 리뉴얼 오픈했습니다. 리뉴얼을 기념하여 다양한 회원 혜택을 준비했습니다."
  },
  {
    id: 5,
    title: "3월 감귤 할인 이벤트 안내",
    date: "2024-03-10",
    category: "이벤트",
    views: 423,
    content: "봄맞이 감귤 할인 이벤트를 진행합니다. 3월 한 달간 모든 감귤 상품 10% 할인됩니다."
  },
  {
    id: 6,
    title: "신규 상품 '제주 황금향' 출시 안내",
    date: "2024-03-20",
    category: "상품안내",
    views: 312,
    content: "새로운 상품 '제주 황금향'이 출시되었습니다. 달콤한 맛과 풍부한 과즙이 특징입니다."
  }
];

// 카테고리 목록
const categories = ['출하안내', '배송안내', '이벤트', '안내', '상품안내'];

export default function AdminEditNoticePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [userData, setUserData] = useState<{isAdmin: boolean} | null>(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<(typeof notices)[0] | null>(null);
  
  // 폼 필드
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('안내');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 공지사항 ID 가져오기
  const noticeId = parseInt(params.id);
  
  useEffect(() => {
    // 관리자 인증 확인
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user.isAdmin) {
            setUserData(user);
            
            // 공지사항 데이터 가져오기
            const foundNotice = notices.find(notice => notice.id === noticeId);
            if (foundNotice) {
              setNotice(foundNotice);
              setTitle(foundNotice.title);
              setCategory(foundNotice.category);
              setContent(foundNotice.content);
            } else {
              alert('공지사항을 찾을 수 없습니다.');
              router.push('/admin/notices');
            }
            
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
  }, [router, noticeId]);

  // 공지사항 수정
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
      alert('공지사항이 수정되었습니다.');
      router.push('/admin/notices');
    }, 1000);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">데이터 로딩 중...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">공지사항 수정</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            게시된 공지사항의 내용을 수정합니다
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link 
            href="/admin/notices" 
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 text-center w-full sm:w-auto"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
      
      {/* 공지사항 수정 폼 */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
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
          
          <div>
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
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              내용
            </label>
            <textarea
              id="content"
              rows={10}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="공지사항 내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <p className="mt-1 text-xs text-gray-500">
              문단 구분은 Enter 키를 두 번 눌러 빈 줄을 추가하세요
            </p>
          </div>
          
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
            <Link
              href="/admin/notices"
              className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 text-center"
            >
              취소
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-70 text-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? '수정 중...' : '수정하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 