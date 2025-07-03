import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Layout({ children }) {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <nav className="nav">
            <div className="nav-left">
              <Link to="/" className="logo">행복한 감귤농장</Link>
              <div className="nav-links">
                <Link to="/products">상품</Link>
                <Link to="/notice">공지사항</Link>
                <Link to="/inquiry">문의하기</Link>
              </div>
            </div>
            <div className="nav-right">
              <Link to="/cart" className="cart-link">장바구니</Link>
              {isLoggedIn ? (
                <>
                  <span className="user-name">{user.name}님</span>
                  <button onClick={handleLogout} className="logout-button">로그아웃</button>
                </>
              ) : (
                <Link to="/login" className="login-link">로그인</Link>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="main">
        {children}
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h3>행복한 감귤농장</h3>
              <p>주소: 제주특별자치도 서귀포시 감귤로 123</p>
              <p>전화: 064-123-4567</p>
              <p>이메일: contact@happytangerine.com</p>
            </div>
            <div className="footer-links">
              <Link to="/notice">공지사항</Link>
              <Link to="/inquiry">문의하기</Link>
              <Link to="/products">쇼핑하기</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 행복한 감귤농장. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout; 