import Link from "next/link";

export default function InquiryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">문의하기</h1>
      <p className="text-gray-600 mb-8">행복한 감귤농장에 궁금한 점이 있으시면 문의해주세요</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* 고객센터 정보 */}
        <div className="md:col-span-1">
          <div className="bg-orange-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-orange-500 mr-2">📞</span> 고객센터
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-orange-600">064-123-4567</p>
                <p className="text-sm text-gray-600">평일 09:00 - 18:00</p>
                <p className="text-sm text-gray-600">점심시간 12:00 - 13:00</p>
                <p className="text-sm text-gray-600">주말/공휴일 휴무</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">이메일 문의</h3>
                <p className="text-gray-800">hello@jejumandarin.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">카카오톡 문의</h3>
                <p className="text-gray-800">@행복한감귤농장</p>
              </div>
            </div>
          </div>
          
          {/* 자주 묻는 질문 */}
          <div className="mt-6 bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-orange-500 mr-2">❓</span> 자주 묻는 질문
            </h2>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-800 hover:text-orange-600 flex items-start">
                  <span className="text-orange-500 mr-2">Q.</span>
                  <span>배송은 얼마나 걸리나요?</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-800 hover:text-orange-600 flex items-start">
                  <span className="text-orange-500 mr-2">Q.</span>
                  <span>제주도 현지 방문은 어떻게 하나요?</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-800 hover:text-orange-600 flex items-start">
                  <span className="text-orange-500 mr-2">Q.</span>
                  <span>교환/환불 정책은 어떻게 되나요?</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-800 hover:text-orange-600 flex items-start">
                  <span className="text-orange-500 mr-2">Q.</span>
                  <span>감귤 보관 방법은 어떻게 되나요?</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-800 hover:text-orange-600 flex items-start">
                  <span className="text-orange-500 mr-2">Q.</span>
                  <span>회원가입은 어떻게 하나요?</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* 문의 작성 폼 */}
        <div className="md:col-span-2">
          <div className="border border-orange-100 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">문의 작성</h2>
            
            <form className="space-y-6">
              {/* 문의 유형 */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">문의 유형</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">선택해주세요</option>
                  <option value="product">상품 문의</option>
                  <option value="shipping">배송 문의</option>
                  <option value="return">교환/환불 문의</option>
                  <option value="visit">농장 방문 문의</option>
                  <option value="etc">기타 문의</option>
                </select>
              </div>
              
              {/* 이름 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">이름</label>
                  <input 
                    type="text" 
                    placeholder="이름을 입력해주세요"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                
                {/* 연락처 */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">연락처</label>
                  <input 
                    type="tel" 
                    placeholder="연락처를 입력해주세요"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* 이메일 */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">이메일</label>
                <input 
                  type="email" 
                  placeholder="이메일을 입력해주세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              {/* 제목 */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">제목</label>
                <input 
                  type="text" 
                  placeholder="제목을 입력해주세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              {/* 내용 */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">내용</label>
                <textarea 
                  rows={6}
                  placeholder="문의 내용을 자세히 입력해주세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                ></textarea>
              </div>
              
              {/* 파일 첨부 */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">파일 첨부</label>
                <div className="border border-dashed border-gray-300 rounded-md p-4">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-sm text-gray-500 mb-2">이미지 파일을 드래그하거나 클릭하여 업로드하세요</p>
                    <button 
                      type="button"
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                      파일 선택
                    </button>
                    <p className="text-xs text-gray-500 mt-2">최대 3개, 파일당 5MB 이하</p>
                  </div>
                </div>
              </div>
              
              {/* 개인정보 동의 */}
              <div className="flex items-start">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  className="mt-1 mr-2"
                />
                <label htmlFor="privacy" className="text-sm text-gray-700">
                  개인정보 수집 및 이용에 동의합니다. 수집된 개인정보(이름, 연락처, 이메일)는 문의 답변을 위해서만 사용되며, 문의 처리 완료 후 3개월간 보관됩니다.
                </label>
              </div>
              
              {/* 제출 버튼 */}
              <div className="flex justify-center">
                <button 
                  type="submit"
                  className="px-8 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 font-medium"
                >
                  문의하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* 찾아오시는 길 */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <span className="text-orange-500 mr-2">🚗</span> 찾아오시는 길
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
              지도 이미지
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-4">행복한 감귤농장</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 font-bold">주소:</span>
                <span>제주특별자치도 서귀포시 감귤로 123</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 font-bold">전화:</span>
                <span>064-123-4567</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 font-bold">이메일:</span>
                <span>hello@jejumandarin.com</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 font-bold">농장 운영시간:</span>
                <span>09:00 - 17:00 (월-토), 일요일 휴무</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 font-bold">체험 프로그램:</span>
                <span>매주 토요일 10:00, 14:00 (사전 예약 필수)</span>
              </li>
            </ul>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-bold mb-2">교통 안내</h4>
              <p className="text-sm text-gray-700 mb-2">
                제주국제공항에서 약 50분 소요 (자가용 기준)
              </p>
              <p className="text-sm text-gray-700">
                주차 공간이 마련되어 있으니 편하게 방문해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 