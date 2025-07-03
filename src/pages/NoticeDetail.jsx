import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = parseInt(id);

  // 실제로는 API에서 데이터를 가져와야 합니다
  const notices = [
    {
      id: 1,
      title: '추석 연휴 배송 안내',
      date: '2024-03-15',
      category: '배송안내',
      content: `안녕하세요, 행복한 감귤농장입니다.

추석 연휴 기간 동안의 배송 일정을 안내드립니다.

[배송 중지 기간]
2024년 9월 16일(월) ~ 9월 18일(수)

[배송 재개일]
2024년 9월 19일(목)부터 정상 배송

* 연휴 기간 전 여유있게 주문해 주시기 바랍니다.
* 연휴 기간 중 주문은 정상적으로 가능하며, 배송은 연휴 이후 순차적으로 진행됩니다.
* 신선식품 특성상 연휴 직전 주문은 가급적 피해주시기 바랍니다.

감사합니다.`
    },
    {
      id: 2,
      title: '3월 감귤 수확 현황',
      date: '2024-03-10',
      category: '상품소식',
      content: `안녕하세요, 행복한 감귤농장입니다.

3월 감귤 수확 현황을 알려드립니다.

[수확 현황]
- 당도: 평균 13브릭스 (작년 대비 1.5브릭스 상승)
- 크기: 중과 ~ 대과 위주
- 수확량: 예상 대비 110%

[수확 일정]
- 한라봉: 3월 말까지
- 천혜향: 3월 중순까지
- 노지감귤: 수확 완료

* 올해는 겨울철 기온이 적절하여 당도가 매우 높습니다.
* 일조량도 충분하여 과의 색상도 매우 좋습니다.

감사합니다.`
    }
  ];

  const currentNotice = notices.find(n => n.id === numericId);
  const prevNotice = notices.find(n => n.id === numericId - 1);
  const nextNotice = notices.find(n => n.id === numericId + 1);

  useEffect(() => {
    // 존재하지 않는 공지사항인 경우 목록으로 이동
    if (!currentNotice) {
      alert('존재하지 않는 공지사항입니다.');
      navigate('/notice');
      return;
    }

    // 페이지 제목 업데이트
    document.title = `${currentNotice.title} - 행복한 감귤농장`;

    // 페이지 상단으로 스크롤
    window.scrollTo(0, 0);
  }, [currentNotice, navigate]);

  if (!currentNotice) return null;

  return (
    <div className="container notice-detail">
      <div className="notice-navigation">
        <Link to="/notice" className="back-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          목록으로
        </Link>
      </div>

      <article className="notice-content">
        <header className="notice-header">
          <div className="notice-meta">
            <span className="notice-category">{currentNotice.category}</span>
            <span className="notice-date">{currentNotice.date}</span>
          </div>
          <h1>{currentNotice.title}</h1>
        </header>

        <div className="notice-body">
          <pre>{currentNotice.content}</pre>
        </div>
      </article>

      <div className="notice-navigation">
        {prevNotice && (
          <div className="nav-item">
            <span className="nav-label">이전글</span>
            <Link to={`/notice/${prevNotice.id}`}>{prevNotice.title}</Link>
          </div>
        )}
        {nextNotice && (
          <div className="nav-item">
            <span className="nav-label">다음글</span>
            <Link to={`/notice/${nextNotice.id}`}>{nextNotice.title}</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoticeDetail; 