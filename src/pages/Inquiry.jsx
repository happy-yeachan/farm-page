import React from 'react';

function Inquiry() {
  const faqs = [
    {
      id: 1,
      question: '배송은 얼마나 걸리나요?',
      answer: '주문 완료 후 1-2일 내에 출고되며, 출고 후 1-2일 내에 수령하실 수 있습니다. 제주도에서 출고되는 상품 특성상 도서산간 지역은 1-2일 추가될 수 있습니다.'
    },
    {
      id: 2,
      question: '신선도는 어떻게 보장되나요?',
      answer: '전용 보냉박스와 아이스팩을 사용하여 배송되며, 산지 직송으로 최대한 신선한 상태로 배송해 드립니다. 배송 중 온도 모니터링을 통해 품질을 관리하고 있습니다.'
    },
    {
      id: 3,
      question: '교환/반품이 가능한가요?',
      answer: '신선식품 특성상 단순 변심에 의한 교환/반품은 어려우나, 상품에 문제가 있는 경우 100% 교환/환불해 드립니다. 상품 수령 즉시 확인하시고 문제가 있는 경우 고객센터로 연락 주시기 바랍니다.'
    }
  ];

  return (
    <div className="container inquiry-page">
      <h1>고객센터</h1>

      {/* FAQ 섹션 */}
      <section className="faq-section">
        <h2>자주 묻는 질문</h2>
        <div className="faq-list">
          {faqs.map(faq => (
            <details key={faq.id} className="faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 문의하기 폼 */}
      <section className="inquiry-form-section">
        <h2>문의하기</h2>
        <form className="inquiry-form">
          <div className="form-group">
            <label htmlFor="category">문의 유형</label>
            <select id="category" required>
              <option value="">선택해주세요</option>
              <option value="delivery">배송 문의</option>
              <option value="product">상품 문의</option>
              <option value="return">교환/반품 문의</option>
              <option value="other">기타 문의</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input type="text" id="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">연락처</label>
            <input type="tel" id="phone" required />
          </div>

          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input type="text" id="title" required />
          </div>

          <div className="form-group">
            <label htmlFor="content">문의 내용</label>
            <textarea id="content" rows="5" required></textarea>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" required />
              <span>개인정보 수집 및 이용에 동의합니다.</span>
            </label>
          </div>

          <button type="submit" className="submit-button">
            문의하기
          </button>
        </form>
      </section>

      {/* 연락처 정보 */}
      <section className="contact-info">
        <h2>고객센터 연락처</h2>
        <div className="contact-grid">
          <div className="contact-item">
            <h3>전화 문의</h3>
            <p className="phone">064-123-4567</p>
            <p className="time">평일 09:00 - 18:00</p>
            <p className="time">점심시간 12:00 - 13:00</p>
          </div>
          <div className="contact-item">
            <h3>카카오톡 문의</h3>
            <p>@제주감귤마켓</p>
            <p className="time">평일 09:00 - 18:00</p>
          </div>
          <div className="contact-item">
            <h3>이메일 문의</h3>
            <p>help@jejumandarin.com</p>
            <p className="time">24시간 접수 가능</p>
            <p className="time">순차적으로 답변드립니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Inquiry; 