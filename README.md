# 카페인24 크리스마스 룰렛 (2026.12.18 ~ 12.27)

GitHub Pages(화면) + Firebase Firestore(데이터) 구성입니다.
주소: `https://latte-hub.github.io/cafein24_event/`

## 파일

| 파일 | 누가 | 하는 일 |
|---|---|---|
| `index.html` | 누구나 | 이벤트 안내 (긴 세로 한 장) |
| `play.html?c=017-K4P9XQ` | QR 찍은 손님 | 번호 입력 → 룰렛 → 결과 → SNS·설문 → 보너스 룰렛 / 재접속 시 '내 당첨 내역' |
| `store.html?s=017` | 점주님 | 우리 매장 참여·당첨 현황 (전화번호 없음, 로그인 없음) |
| `admin.html` | 본사 (@cafein24.co.kr) | 현황판 · 참여자 · 포인트 적립 목록 · 설문 · 매장별 QR · CSV |
| `seed.html` | 본사 (@cafein24.co.kr) | 매장 목록 올리기 · 스티커 번호 60,000개 생성 · 인쇄소 CSV (인쇄 전 1회) |
| `firestore.rules` | — | Firebase 콘솔에 붙여넣는 보안 규칙 |
| `js/firebase-config.js` | — | Firebase 설정 + 이벤트 기간·확률 등 설정값 |

## 올리는 순서

1. 이 폴더 안의 파일을 전부 저장소 `latte-hub/cafein24_event` 최상위에 올립니다 (Add file → Upload files → 끌어다 놓기 → Commit).
2. Settings → Pages → Source: `main` / `(root)` 확인.
3. Firebase 콘솔 → Authentication → 설정 → **승인된 도메인**에 `latte-hub.github.io` 추가 (안 하면 관리자 로그인 실패).
4. Firebase 콘솔 → Firestore → **규칙** 탭에 `firestore.rules` 내용을 통째로 붙여넣고 게시. **테스트 모드는 11/11에 만료**되니 그 전에 꼭.
5. `seed.html` → 로그인 → 매장목록 엑셀 올리기 → 매장 저장 → 번호 만들기(이어 올리기 가능) → 인쇄소용 CSV를 인쇄소에 전달.
6. 테스트: 아무 QR 주소로 끝까지 한 번, 같은 주소 재접속, 설문 두 번 시도, admin 현황 확인.
7. 테스트 기록은 12/9까지 admin → QR·인쇄 → **사용된 QR 전체 초기화**로 지웁니다 (참여 기록·전화번호·설문·집계가 함께 정리돼요).

## 데이터

- `stores/{017}` 매장명·지역·분류 (공개용 · 손님 화면에 매장명 표시)
- `storesPrivate/{017}` 점주명·연락처·담당SV (본사만)
- `codes/{017-K4P9XQ}` store, tier(1~5), used, usedAt, bundle(60장 묶음 1~5), seq — **등수는 여기에만**. QR 주소에는 없음
- `entries/{스티커번호}` 룰렛 1회 기록 (가린 번호 010-****-5678만)
- `phones/{스티커번호}` 손님 휴대폰 번호 원본 (본사만)
- `surveys/{휴대폰번호}` 설문 (번호당 1회)
- `stats/store_017` 매장별 참여·당첨 집계 (공개, 전화번호 없음)
- `stats/bonus` 설문 보너스 당첨 수 (최대 1,200)

## 지킬 것

- 전화번호·등수 포함 CSV를 이 저장소(Public)에 절대 올리지 않습니다.
- 이벤트 종료 60일 뒤 `phones`, `surveys`(휴대폰 번호)를 삭제합니다.
- 기간·확률·한도는 `js/firebase-config.js`의 `EVENT`만 바꾸면 됩니다 (`firestore.rules`의 1200도 같이).
- 테스트: `testUntil`(12/9)까지는 QR이 열려 있어요. 12/10~17은 잠기고 12/18에 다시 열려요. **12/9까지 admin → QR·인쇄 → '사용된 QR 전체 초기화'로 테스트 기록을 지우세요.**
- 날짜는 한국 시간 기준이에요.
- 본사 페이지(admin, seed, store)는 프리텐다드, 손님 페이지(index, play)는 IBM Plex Sans KR 폰트예요.
- Firebase 무료 요금제는 하루 쓰기 2만·읽기 5만 건 한도가 있어요. 스티커 번호 생성과 이벤트 기간에는 Blaze 요금제를 권장해요.
