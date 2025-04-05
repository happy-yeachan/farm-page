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
      <div className="py-4 px-6 bg-orange-600 text-white mb-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl font-bold">행복한 감귤농장 관리자</h1>
        </div>
      </div>
      <main className="max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
} 