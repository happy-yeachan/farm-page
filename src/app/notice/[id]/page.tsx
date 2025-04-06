import Link from "next/link";
import React from "react";
import { Metadata } from "next";

// 가상의 공지사항 데이터
const notices = [
  {
    id: 1,
    title: "2024년 한라봉 수확 시작 및 출하 안내",
    date: "2024-01-15",
    category: "출하안내",
    views: 1245,
    content: `안녕하세요, 행복한 감귤농장입니다.

2024년 한라봉 수확이 시작되어 1월 20일부터 순차적으로 출하될 예정입니다. 

올해는 작년보다 일조량이 풍부하고 강수량이 적절해 당도가 매우 높은 한라봉이 생산되었습니다. 특히 서귀포 지역에서 재배된 한라봉은 평균 당도 14Brix 이상으로 매우 달콤한 맛을 자랑합니다.

< 출하 일정 안내 >
- 프리미엄 한라봉 세트: 1월 20일부터
- 가정용 한라봉: 1월 25일부터
- 선물용 한라봉 세트: 1월 30일부터

수확 후 최상의 상태로 배송해 드리기 위해 당일 수확, 당일 발송을 원칙으로 합니다. 택배 물량이 많은 시기이므로 배송이 1-2일 지연될 수 있는 점 양해 부탁드립니다.

감사합니다.
행복한 감귤농장 드림`
  },
  {
    id: 2,
    title: "설 명절 배송 안내",
    date: "2024-01-30",
    category: "배송안내",
    views: 958,
    content: `안녕하세요, 행복한 감귤농장입니다.

다가오는 설 연휴 기간 택배사 휴무로 인한 배송 일정을 안내해 드립니다.

< 설 연휴 배송 안내 >
- 정상 배송 마감일: 2월 7일(수) 오전 11시 주문까지
- 배송 불가 기간: 2월 8일(목) ~ 2월 12일(월)
- 배송 재개일: 2월 13일(화)부터 정상 배송

설 명절 선물세트를 주문하시는 경우, 원하시는 날짜에 받아보실 수 있도록 2월 7일 이전에 미리 주문해주시기 바랍니다.

연휴 기간 중에도 온라인 주문은 평소와 동일하게 24시간 가능합니다. 다만, 고객센터는 2월 9일부터 2월 11일까지 휴무이니 참고 부탁드립니다.

감사합니다.
행복한 감귤농장 드림`
  },
  {
    id: 3,
    title: "제주 감귤 농장 체험 프로그램 오픈",
    date: "2024-02-15",
    category: "이벤트",
    views: 782,
    content: `안녕하세요, 행복한 감귤농장입니다.

3월부터 제주 감귤 농장 체험 프로그램이 오픈됩니다. 가족, 연인, 친구와 함께 제주 감귤 농장을 방문하여 직접 감귤을 따고 다양한 체험 활동을 즐겨보세요.

< 체험 프로그램 안내 >
1. 감귤 따기 체험
   - 하우스 감귤 직접 수확 체험
   - 수확한 감귤 500g 증정

2. 감귤 가공품 만들기
   - 감귤 쿠키 만들기
   - 감귤 쨈 만들기
   - 감귤 비누 만들기

3. 감귤 농장 투어
   - 전문 가이드와 함께하는 친환경 농장 투어
   - 감귤 재배 과정 설명 및 견학

< 운영 일정 >
- 3월부터 매주 토요일, 일요일 (오전 10시 / 오후 2시)
- 소요시간: 약 2시간

< 예약 방법 >
- 홈페이지 내 체험 예약 페이지에서 예약 가능
- 최소 3일 전까지 예약 필요
- 최대 인원: 회차당 15명 (선착순 마감)

< 할인 혜택 >
- 가족 4인 이상 10% 할인
- 온라인 스토어 회원 5% 추가 할인

많은 관심과 참여 부탁드립니다.

감사합니다.
행복한 감귤농장 드림`
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

type Props = {
  params: {
    id: string;
  };
};

// 동적 메타데이터 생성 (서버 컴포넌트에서는 async/await 사용)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const noticeId = parseInt(id);
  const notice = notices.find(n => n.id === noticeId);
  
  if (!notice) {
    return {
      title: "공지사항을 찾을 수 없습니다 | 행복한 감귤농장",
      description: "요청하신 공지사항 정보를 찾을 수 없습니다."
    };
  }
  
  return {
    title: `${notice.title} | 행복한 감귤농장 공지사항`,
    description: notice.content.substring(0, 150) + "...",
    keywords: `${notice.category}, 감귤 농장 공지사항, 제주 감귤 소식, 감귤 농장 이벤트`,
  };
}

export default function NoticeDetailPage({ params }: Props) {
  // React.use를 사용하여 params를 처리하고 타입 단언을 통해 타입스크립트 오류 해결
  const resolvedParams = React.use(params as any) as { id: string };
  const noticeId = parseInt(resolvedParams.id);
  const notice = notices.find(n => n.id === noticeId);

  if (!notice) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">공지사항을 찾을 수 없습니다</h1>
        <p className="mb-6">요청하신 공지사항이 존재하지 않거나 삭제되었습니다.</p>
        <Link 
          href="/notice" 
          className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  // 공지사항 이전, 다음 글 찾기
  const prevNotice = notices.find(n => n.id === noticeId - 1);
  const nextNotice = notices.find(n => n.id === noticeId + 1);

  return (
    <div>
      <div className="mb-6">
        <Link href="/notice" className="text-orange-500 hover:underline flex items-center">
          <span className="mr-1">←</span> 공지사항 목록으로 돌아가기
        </Link>
      </div>

      <div className="border border-orange-100 rounded-lg overflow-hidden">
        {/* 공지사항 헤더 */}
        <div className="bg-orange-50 p-4 sm:p-6">
          <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded whitespace-nowrap mb-2">
            {notice.category}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mb-4">{notice.title}</h1>
          <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 space-y-1 sm:space-y-0">
            <div>작성일: {notice.date}</div>
            <div>조회수: {notice.views.toLocaleString()}</div>
          </div>
        </div>
        
        {/* 공지사항 내용 */}
        <div className="p-4 sm:p-6">
          <div className="min-h-[200px] sm:min-h-[300px] whitespace-pre-line text-sm sm:text-base">
            {notice.content}
          </div>
        </div>
      </div>
      
      {/* 이전글, 다음글 네비게이션 */}
      <div className="mt-8 border-t border-orange-100 pt-6">
        <div className="flex flex-col space-y-4">
          {nextNotice && (
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 border-b border-gray-100 pb-3">
              <span className="text-gray-500 text-sm font-medium">다음글</span>
              <Link href={`/notice/${nextNotice.id}`} className="text-gray-900 hover:text-orange-600 flex-1 sm:ml-4 order-first sm:order-none">
                {nextNotice.title}
              </Link>
              <span className="text-gray-500 text-xs">{nextNotice.date}</span>
            </div>
          )}
          
          {prevNotice && (
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
              <span className="text-gray-500 text-sm font-medium">이전글</span>
              <Link href={`/notice/${prevNotice.id}`} className="text-gray-900 hover:text-orange-600 flex-1 sm:ml-4 order-first sm:order-none">
                {prevNotice.title}
              </Link>
              <span className="text-gray-500 text-xs">{prevNotice.date}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* 버튼 영역 */}
      <div className="flex justify-center mt-8">
        <Link 
          href="/notice" 
          className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          목록으로
        </Link>
      </div>
    </div>
  );
} 