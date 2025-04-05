import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지사항 | 행복한 감귤농장",
  description: "행복한 감귤농장의 공지사항과 이벤트 소식을 알려드립니다. 감귤 수확 일정, 배송 안내, 할인 이벤트 정보를 확인하세요.",
  keywords: "감귤 농장 공지사항, 제주 감귤 소식, 한라봉 수확, 천혜향 출하, 제주 과일 이벤트",
};

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

export default function NoticePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">공지사항</h1>
      <p className="text-gray-600 mb-8">행복한 감귤농장의 소식과 이벤트를 알려드립니다</p>
      
      {/* 카테고리 필터 */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 border border-orange-200 rounded-full bg-orange-500 text-white focus:outline-none">
            전체
          </button>
          <button className="px-4 py-2 border border-orange-200 rounded-full hover:bg-orange-50 focus:outline-none">
            출하안내
          </button>
          <button className="px-4 py-2 border border-orange-200 rounded-full hover:bg-orange-50 focus:outline-none">
            배송안내
          </button>
          <button className="px-4 py-2 border border-orange-200 rounded-full hover:bg-orange-50 focus:outline-none">
            이벤트
          </button>
          <button className="px-4 py-2 border border-orange-200 rounded-full hover:bg-orange-50 focus:outline-none">
            상품안내
          </button>
        </div>
      </div>
      
      {/* 공지사항 목록 - 데스크톱 뷰 */}
      <div className="hidden md:block border border-orange-100 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 w-24">번호</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 w-24">카테고리</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">제목</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 w-32">작성일</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 w-24">조회수</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orange-100">
            {notices.map((notice) => (
              <tr key={notice.id} className="hover:bg-orange-50">
                <td className="px-6 py-4 text-center text-sm text-gray-500">
                  {notice.id}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                    {notice.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link href={`/notice/${notice.id}`} className="text-gray-900 hover:text-orange-600">
                    {notice.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-500">
                  {notice.date}
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-500">
                  {notice.views.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* 공지사항 목록 - 모바일 뷰 */}
      <div className="md:hidden space-y-4">
        {notices.map((notice) => (
          <div key={notice.id} className="border border-orange-100 rounded-lg overflow-hidden hover:shadow-sm">
            <Link href={`/notice/${notice.id}`} className="block p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                  {notice.category}
                </span>
                <span className="text-xs text-gray-500">조회 {notice.views.toLocaleString()}</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{notice.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{notice.date}</span>
                <span className="text-xs text-gray-400">#{notice.id}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8">
        <nav className="flex flex-wrap items-center justify-center gap-2">
          <button className="px-3 py-1 border rounded hover:bg-orange-50">이전</button>
          <button className="px-3 py-1 border rounded bg-orange-500 text-white">1</button>
          <button className="px-3 py-1 border rounded hover:bg-orange-50">2</button>
          <button className="px-3 py-1 border rounded hover:bg-orange-50">3</button>
          <button className="px-3 py-1 border rounded hover:bg-orange-50">4</button>
          <button className="px-3 py-1 border rounded hover:bg-orange-50">5</button>
          <button className="px-3 py-1 border rounded hover:bg-orange-50">다음</button>
        </nav>
      </div>
    </div>
  );
} 