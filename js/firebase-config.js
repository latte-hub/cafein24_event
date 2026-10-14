// 카페인24 크리스마스 룰렛 · Firebase 설정
// 이 값은 공개용 키라 저장소에 두어도 됩니다. 접근 제한은 firestore.rules가 담당합니다.
export const firebaseConfig = {
  apiKey: "AIzaSyApKNZubqiH8Z1VM0CGaUIkfITayAZBVZg",
  authDomain: "cafein24-roulette.firebaseapp.com",
  projectId: "cafein24-roulette",
  storageBucket: "cafein24-roulette.firebasestorage.app",
  messagingSenderId: "485174360012",
  appId: "1:485174360012:web:ae8ed37834a3ae98464f69"
};

// 이벤트 설정 (여기만 바꾸면 전체에 반영)
export const EVENT = {
  name: "카페인24 크리스마스 룰렛",
  start: "2026-12-18",          // 이벤트 시작일
  end: "2026-12-27",            // 종료일 (이 날까지 참여 가능)
  testUntil: "2026-12-09",      // 이 날까지는 테스트로 QR 사용 가능 (스티커 발송 12/10 전). 12/10~17은 잠김
  creditDate: "12월 28일(월)",   // 포인트 일괄 적립 안내 문구
  adminDomain: "cafein24.co.kr", // 이 도메인 메일만 관리자
  bonusCap: 1200,               // 설문 보너스 1,000원 당첨 한도
  bonusRate: 0.3,               // 설문 보너스 당첨 확률
  loseCode: "MERRY24",           // 꽝 공통 QR 번호 → play.html?c=MERRY24
  prizeCounts: { 1:48, 2:191, 3:382, 4:3438 }, // 당첨 보드 목표 수량 (191개 매장 기준)
  instagram: "https://www.instagram.com/cafein24.official",
  prizes: { 1:[50000,"1등"], 2:[10000,"2등"], 3:[5000,"3등"], 4:[1000,"4등"], 5:[0,"꽝"] }
};
