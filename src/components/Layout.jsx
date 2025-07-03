import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Layout({ children }) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">행복한감귤농장</Link>
          <button 
            className={`menu-button ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={isMenuOpen ? 'open' : ''}>
            <Link to="/products" onClick={closeMenu}>상품</Link>
            <Link to="/notice" onClick={closeMenu}>공지사항</Link>
            <Link to="/inquiry" onClick={closeMenu}>문의</Link>
            <Link to="/cart" onClick={closeMenu}>장바구니</Link>
            {isLoggedIn ? (
              <button onClick={handleLogout}>로그아웃</button>
            ) : (
              <Link to="/login" onClick={closeMenu}>로그인</Link>
            )}
          </nav>
        </div>
      </header>
      <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section company">
            <h3>행복한감귤농장</h3>
            <p>제주특별자치도 서귀포시 감귤로 123</p>
            <p>사업자등록번호: 123-45-67890</p>
          </div>
          <div className="footer-section contact">
            <p className="phone">고객센터 064-123-4567</p>
            <p>평일 09:00 - 18:00 (점심시간 12:00 - 13:00)</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 행복한감귤농장. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout; 