import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Notice() {
  const [activeFilter, setActiveFilter] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const notices = [
    {
      id: 1,
      title: '추석 연휴 배송 안내',
      date: '2024-03-15',
      category: '배송안내',
      preview: '추석 연휴 기간 동안의 배송 일정을 안내드립니다. 연휴 기간에는 배송이 지연될 수 있으니 참고 부탁드립니다.'
    },
    {
      id: 2,
      title: '3월 감귤 수확 현황',
      date: '2024-03-10',
      category: '상품소식',
      preview: '이번 달 감귤 작황 상태와 수확 일정을 알려드립니다. 올해는 작년보다 당도가 더 높게 측정되었습니다.'
    },
    {
      id: 3,
      title: '신규 회원 특별 할인 이벤트',
      date: '2024-03-05',
      category: '이벤트',
      preview: '새로 가입하신 회원님들을 위한 특별 할인 이벤트를 진행합니다. 최대 30% 할인 혜택을 놓치지 마세요!'
    },
    {
      id: 4,
      title: '사이트 이용약관 개정 안내',
      date: '2024-03-01',
      category: '공지',
      preview: '이용약관 개정 내용을 안내드립니다. 개인정보 처리방침이 일부 수정되었으니 확인 부탁드립니다.'
    },
    {
      id: 5,
      title: '설날 연휴 고객센터 운영 안내',
      date: '2024-02-25',
      category: '공지',
      preview: '설날 연휴 기간 동안의 고객센터 운영 시간을 안내드립니다.'
    },
    {
      id: 6,
      title: '2월 감귤 특가 이벤트',
      date: '2024-02-20',
      category: '이벤트',
      preview: '2월을 맞아 감귤 특가 이벤트를 진행합니다. 한정 수량으로 진행되니 서둘러 주세요!'
    }
  ];

  const filters = ['전체', '배송안내', '상품소식', '이벤트', '공지'];

  // 필터링된 공지사항 목록
  const filteredNotices = notices.filter(notice => 
    activeFilter === '전체' ? true : notice.category === activeFilter
  );

  // 페이지네이션
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNotices = filteredNotices.slice(startIndex, startIndex + itemsPerPage);

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // 페이지 상단으로 스크롤
  };

  return (
    <div className="container notice-page">
      <div className="notice-header">
        <h1>공지사항</h1>
        <div className="notice-filters">
          {filters.map(filter => (
            <button
              key={filter}
              className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="notice-list">
        {paginatedNotices.map(notice => (
          <Link to={`/notice/${notice.id}`} key={notice.id} className="notice-item">
            <div className="notice-category">{notice.category}</div>
            <div className="notice-content">
              <h3>{notice.title}</h3>
              <p>{notice.preview}</p>
            </div>
            <div className="notice-date">{notice.date}</div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-button"
            onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {pageNumbers.map(number => (
            <button
              key={number}
              className={`page-button ${currentPage === number ? 'active' : ''}`}
              onClick={() => handlePageClick(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="page-button"
            onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default Notice; 