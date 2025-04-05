'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 가상의 공지사항 데이터
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
const categories = ['전체', '출하안내', '배송안내', '이벤트', '안내', '상품안내'];

export default function AdminNoticesPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<{isAdmin: boolean} | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [editNoticeId, setEditNoticeId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editContent, setEditContent] = useState('');
  
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
  
  // 공지사항 필터링
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 공지사항 편집 시작
  const startEdit = (notice: typeof notices[0]) => {
    setEditNoticeId(notice.id);
    setEditTitle(notice.title);
    setEditCategory(notice.category);
    setEditContent(notice.content);
  };

  // 공지사항 편집 취소
  const cancelEdit = () => {
    setEditNoticeId(null);
    setEditTitle('');
    setEditCategory('');
    setEditContent('');
  };

  // 공지사항 편집 저장
  const saveEdit = () => {
    // 실제로는 API 호출을 통해 저장
    alert('공지사항이 수정되었습니다.');
    setEditNoticeId(null);
  };
  
  // 공지사항 삭제
  const deleteNotice = (id: number) => {
    if (window.confirm("정말로 이 공지사항을 삭제하시겠습니까?")) {
      // 실제로는 API 호출을 통해 삭제
      alert('공지사항이 삭제되었습니다.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">공지사항 관리</h1>
          <p className="text-gray-600">
            농장 관련 소식과 정보를 관리하세요
          </p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/admin/dashboard" 
            className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg hover:bg-orange-200"
          >
            대시보드로 돌아가기
          </Link>
          <Link 
            href="/admin/notices/new" 
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >
            + 새 공지사항 작성
          </Link>
        </div>
      </div>
      
      {/* 검색 및 필터 */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              공지사항 검색
            </label>
            <input
              type="text"
              id="search"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="제목 또는 내용 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              카테고리 필터
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 공지사항 목록 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-center">번호</th>
                <th className="px-4 py-3 text-center">카테고리</th>
                <th className="px-4 py-3 text-left">제목</th>
                <th className="px-4 py-3 text-center">작성일</th>
                <th className="px-4 py-3 text-center">조회수</th>
                <th className="px-4 py-3 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredNotices.map(notice => (
                <React.Fragment key={notice.id}>
                  {editNoticeId === notice.id ? (
                    <tr className="bg-orange-50">
                      <td className="px-4 py-3 text-center">{notice.id}</td>
                      <td className="px-4 py-3 text-center">
                        <select 
                          className="p-1 border rounded text-sm w-full"
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                        >
                          {categories.filter(c => c !== '전체').map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input 
                          type="text" 
                          className="p-1 border rounded text-sm w-full"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)} 
                        />
                      </td>
                      <td className="px-4 py-3 text-center">{notice.date}</td>
                      <td className="px-4 py-3 text-center">{notice.views.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center space-x-2">
                          <button 
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                            onClick={saveEdit}
                          >
                            저장
                          </button>
                          <button 
                            className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                            onClick={cancelEdit}
                          >
                            취소
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-center">{notice.id}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {notice.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`/notice/${notice.id}`} target="_blank" className="hover:text-orange-600">
                          {notice.title}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-500">{notice.date}</td>
                      <td className="px-4 py-3 text-center text-gray-500">{notice.views.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center space-x-2">
                          <button 
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                            title="수정"
                            onClick={() => startEdit(notice)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                          </button>
                          <button 
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                            title="삭제"
                            onClick={() => deleteNotice(notice.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                  {editNoticeId === notice.id && (
                    <tr className="bg-orange-50">
                      <td colSpan={6} className="px-4 py-3">
                        <div className="mb-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            내용
                          </label>
                          <textarea
                            className="w-full p-2 border rounded-md text-sm"
                            rows={5}
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                          ></textarea>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredNotices.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
      
      {/* 페이지네이션 */}
      <div className="mt-6 flex justify-center">
        <nav className="flex space-x-1">
          <button className="px-3 py-1 border rounded hover:bg-orange-50">이전</button>
          <button className="px-3 py-1 border rounded bg-orange-500 text-white">1</button>
          <button className="px-3 py-1 border rounded hover:bg-orange-50">다음</button>
        </nav>
      </div>
    </div>
  );
} 