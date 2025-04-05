import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '관리자 페이지 | 행복한 감귤농장',
  description: '행복한 감귤농장 관리자 페이지입니다.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-orange-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold">행복한 감귤농장 관리자</h1>
          <div className="flex gap-2">
            <a href="/" className="text-sm bg-orange-700 px-3 py-1.5 rounded hover:bg-orange-800">
              <span className="hidden sm:inline">사이트</span> 홈으로
            </a>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6">{children}</main>
    </div>
  );
} 