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

// 이벤트 설정 (여기만 바꾸면 전체에 반영) · 2026-11-01 최신화
export const EVENT = {
  name: "카페인24 크리스마스 럭키룰렛",
  start: "2026-12-18",          // 이벤트 시작일
  end: "2026-12-27",            // 종료일 (이 날까지 참여 가능)
  testUntil: "2026-12-07",      // 이 날까지는 테스트로 QR 사용 가능. 스티커는 12/8 발송 → 12/8~17은 잠김
  creditDate: "12월 28일(월)부터", // 포인트 적립 안내 문구 (매장에서 적립)
  adminDomain: "cafein24.co.kr", // 이 도메인 메일만 관리자
  bonusCap: 240,                // 만족도 조사 → 응모권 룰렛 1,000P 당첨 한도 (선착순)
  bonusRate: 0.3,               // 응모권 룰렛 당첨 확률
  perStore: 200,                // 매장당 스티커
  // 당첨 보드 목표 수량 (운영 매장 199 + 예비 10 = 210곳 기준. 굿즈는 seed.html에서 정한 수)
  prizeCounts: { 1:10, 2:210, 3:630, 4:5040, 6:0, 7:0 },
  instagram: "https://www.instagram.com/cafein24.official",
  // 등수: 1~4 포인트 · 5 꽝 · 6 다라미 텀블러 · 7 다라미 양산
  prizes: { 1:[50000,"1등"], 2:[10000,"2등"], 3:[5000,"3등"], 4:[1000,"4등"], 5:[0,"꽝"], 6:[0,"다라미 텀블러"], 7:[0,"다라미 양산"] }
};
