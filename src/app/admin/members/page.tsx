'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 회원 타입 정의
interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  level: '일반' | '우수' | 'VIP' | '블랙리스트';
  status: '활성' | '휴면' | '탈퇴';
  lastLoginDate: string;
  totalOrders: number;
  totalAmount: number;
}

// 가상의 회원 데이터
const members: Member[] = [
  {
    id: 1,
    name: '김제주',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    joinDate: '2023-12-10',
    level: '우수',
    status: '활성',
    lastLoginDate: '2024-04-02',
    totalOrders: 5,
    totalAmount: 156000
  },
  {
    id: 2,
    name: '이한라',
    email: 'lee@example.com',
    phone: '010-2345-6789',
    joinDate: '2024-01-15',
    level: '일반',
    status: '활성',
    lastLoginDate: '2024-03-28',
    totalOrders: 2,
    totalAmount: 47000
  },
  {
    id: 3,
    name: '박감귤',
    email: 'park@example.com',
    phone: '010-3456-7890',
    joinDate: '2023-08-20',
    level: 'VIP',
    status: '활성',
    lastLoginDate: '2024-04-01',
    totalOrders: 12,
    totalAmount: 450000
  },
  {
    id: 4,
    name: '최천혜',
    email: 'choi@example.com',
    phone: '010-4567-8901',
    joinDate: '2023-10-05',
    level: '일반',
    status: '휴면',
    lastLoginDate: '2023-12-10',
    totalOrders: 1,
    totalAmount: 25000
  },
  {
    id: 5,
    name: '정성산',
    email: 'jung@example.com',
    phone: '010-5678-9012',
    joinDate: '2023-11-22',
    level: '우수',
    status: '활성',
    lastLoginDate: '2024-04-03',
    totalOrders: 8,
    totalAmount: 210000
  },
  {
    id: 6,
    name: '강서귀',
    email: 'kang@example.com',
    phone: '010-6789-0123',
    joinDate: '2024-02-28',
    level: '일반',
    status: '활성',
    lastLoginDate: '2024-03-15',
    totalOrders: 1,
    totalAmount: 18000
  },
  {
    id: 7,
    name: '조우도',
    email: 'jo@example.com',
    phone: '010-7890-1234',
    joinDate: '2023-09-11',
    level: '블랙리스트',
    status: '활성',
    lastLoginDate: '2024-03-30',
    totalOrders: 4,
    totalAmount: 112000
  },
  {
    id: 8,
    name: '윤표선',
    email: 'yoon@example.com',
    phone: '010-8901-2345',
    joinDate: '2023-07-07',
    level: '우수',
    status: '탈퇴',
    lastLoginDate: '2023-11-15',
    totalOrders: 6,
    totalAmount: 185000
  }
];

// 회원 등급별 배지 컴포넌트
const LevelBadge = ({ level }: { level: Member['level'] }) => {
  let bgColor = '';
  let textColor = '';
  
  switch (level) {
    case 'VIP':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    case '우수':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case '일반':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case '블랙리스트':
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }
  
  return (
    <span className={`inline-block ${bgColor} ${textColor} text-xs px-2 py-1 rounded-full`}>
      {level}
    </span>
  );
};

// 회원 상태 배지 컴포넌트
const StatusBadge = ({ status }: { status: Member['status'] }) => {
  let bgColor = '';
  let textColor = '';
  
  switch (status) {
    case '활성':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case '휴면':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case '탈퇴':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
  }
  
  return (
    <span className={`inline-block ${bgColor} ${textColor} text-xs px-2 py-1 rounded-full`}>
      {status}
    </span>
  );
};

export default function AdminMembersPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<{isAdmin: boolean} | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [expandedMemberId, setExpandedMemberId] = useState<number | null>(null);
  
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
  
  // 회원 필터링
  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);
    const matchesLevel = selectedLevel === '전체' || member.level === selectedLevel;
    const matchesStatus = selectedStatus === '전체' || member.status === selectedStatus;
    return matchesSearch && matchesLevel && matchesStatus;
  });

  // 회원 등급 변경 함수
  const changeLevel = (memberId: number, newLevel: Member['level']) => {
    // 실제로는 API 호출하여 등급 변경
    alert(`회원 ID ${memberId}의 등급을 ${newLevel}로 변경합니다.`);
  };

  // 회원 상태 변경 함수
  const changeStatus = (memberId: number, newStatus: Member['status']) => {
    // 실제로는 API 호출하여 상태 변경
    alert(`회원 ID ${memberId}의 상태를 ${newStatus}로 변경합니다.`);
  };

  // 회원 상세 정보 토글 함수
  const toggleMemberDetails = (memberId: number) => {
    if (expandedMemberId === memberId) {
      setExpandedMemberId(null);
    } else {
      setExpandedMemberId(memberId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">회원 관리</h1>
          <p className="text-gray-600">
            행복한 감귤농장 회원 정보를 관리하세요
          </p>
        </div>
        <Link 
          href="/admin/dashboard" 
          className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg hover:bg-orange-200"
        >
          대시보드로 돌아가기
        </Link>
      </div>
      
      {/* 검색 및 필터 */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              회원 검색
            </label>
            <input
              type="text"
              id="search"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="이름, 이메일, 전화번호 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              회원 등급
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="전체">전체 등급</option>
              <option value="일반">일반</option>
              <option value="우수">우수</option>
              <option value="VIP">VIP</option>
              <option value="블랙리스트">블랙리스트</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              회원 상태
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="전체">전체 상태</option>
              <option value="활성">활성</option>
              <option value="휴면">휴면</option>
              <option value="탈퇴">탈퇴</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* 회원 통계 */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">총 회원 수</h3>
          <p className="text-3xl font-bold text-orange-600">{members.length.toLocaleString()}명</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">활성 회원</h3>
          <p className="text-3xl font-bold text-green-600">
            {members.filter(m => m.status === '활성').length.toLocaleString()}명
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">휴면 회원</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {members.filter(m => m.status === '휴면').length.toLocaleString()}명
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">VIP 회원</h3>
          <p className="text-3xl font-bold text-blue-600">
            {members.filter(m => m.level === 'VIP').length.toLocaleString()}명
          </p>
        </div>
      </div>
      
      {/* 회원 목록 테이블 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-center">회원 ID</th>
                <th className="px-4 py-3 text-left">이름</th>
                <th className="px-4 py-3 text-left">이메일</th>
                <th className="px-4 py-3 text-center">등급</th>
                <th className="px-4 py-3 text-center">상태</th>
                <th className="px-4 py-3 text-center">가입일</th>
                <th className="px-4 py-3 text-center">마지막 로그인</th>
                <th className="px-4 py-3 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMembers.map(member => (
                <React.Fragment key={member.id}>
                  <tr className={`hover:bg-gray-50 ${expandedMemberId === member.id ? 'bg-orange-50' : ''}`}>
                    <td className="px-4 py-3 text-center">{member.id}</td>
                    <td className="px-4 py-3">{member.name}</td>
                    <td className="px-4 py-3">{member.email}</td>
                    <td className="px-4 py-3 text-center">
                      <LevelBadge level={member.level} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={member.status} />
                    </td>
                    <td className="px-4 py-3 text-center">{member.joinDate}</td>
                    <td className="px-4 py-3 text-center">{member.lastLoginDate}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => toggleMemberDetails(member.id)}
                          aria-label={`${expandedMemberId === member.id ? '회원 상세 정보 닫기' : '회원 상세 정보 보기'}`}
                        >
                          {expandedMemberId === member.id ? '접기' : '상세'}
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {expandedMemberId === member.id && (
                    <tr>
                      <td colSpan={8} className="bg-orange-50 px-4 py-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">회원 상세 정보</h4>
                            <div className="space-y-1 text-sm">
                              <p><span className="font-medium">연락처:</span> {member.phone}</p>
                              <p><span className="font-medium">총 주문 횟수:</span> {member.totalOrders}회</p>
                              <p><span className="font-medium">총 구매 금액:</span> {member.totalAmount.toLocaleString()}원</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">회원 관리</h4>
                            <div className="flex flex-col space-y-2">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">등급 변경</label>
                                <div className="flex gap-1">
                                  <select
                                    className="text-sm p-1 border border-gray-300 rounded"
                                    defaultValue={member.level}
                                  >
                                    <option value="일반">일반</option>
                                    <option value="우수">우수</option>
                                    <option value="VIP">VIP</option>
                                    <option value="블랙리스트">블랙리스트</option>
                                  </select>
                                  <button
                                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded hover:bg-blue-200"
                                    onClick={(e) => {
                                      const select = e.currentTarget.previousElementSibling as HTMLSelectElement;
                                      changeLevel(member.id, select.value as Member['level']);
                                    }}
                                  >
                                    적용
                                  </button>
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">상태 변경</label>
                                <div className="flex gap-1">
                                  <select
                                    className="text-sm p-1 border border-gray-300 rounded"
                                    defaultValue={member.status}
                                  >
                                    <option value="활성">활성</option>
                                    <option value="휴면">휴면</option>
                                    <option value="탈퇴">탈퇴</option>
                                  </select>
                                  <button
                                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded hover:bg-blue-200"
                                    onClick={(e) => {
                                      const select = e.currentTarget.previousElementSibling as HTMLSelectElement;
                                      changeStatus(member.id, select.value as Member['status']);
                                    }}
                                  >
                                    적용
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredMembers.length === 0 && (
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
          <button className="px-3 py-1 border rounded hover:bg-orange-50">2</button>
          <button className="px-3 py-1 border rounded hover:bg-orange-50">다음</button>
        </nav>
      </div>
    </div>
  );
} 