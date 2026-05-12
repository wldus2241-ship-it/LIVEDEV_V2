# 🎮 LIFEDEV — Terminal HUD

> **일상을 RPG처럼 관리하는 개발자용 웹앱!**  
> 할 일 + 생활비 + 가계부를 터미널 스타일로 깔끔하게 ✨

---

## 📱 뭘 할 수 있어?

### 1️⃣ **QUEST — 할 일 관리**
- ✅ 할 일 추가하고 완료하면 **XP 획득**할 수 있어!
- 🎯 우선순위 4단계 (낮음 +10 / 보통 +20 / 높음 +40 / 최상 +80)
- 📂 카테고리 7개 (업무/학습/생활/건강/재정/개인/기타)
- ⚠️ 할 일 10개 넘으면 "계획 중독"이라고 경고해줘!

### 2️⃣ **ROUTINE — 생활비 관리**
- 💰 넷플릭스, 구독료, 월세 같은 고정 지출 등록할 수 있어
- 📅 D-Day 표시로 납부일 놓치지 않아!
- ✅ 체크하면 자동으로 가계부에도 추가돼 (편함!)
- 🔄 매월 20일마다 자동 리셋
- 📈 이번 달 얼마나 했는지 퍼센트로 보여줘

### 3️⃣ **BUDGET — 가계부**
- 💵 수입/지출 토글 버튼으로 쉽게 기록할 수 있어
- 🔄 매달 자동으로 이월해줘
- 📊 이번 달 요약 (이월금/수입/지출/남은 돈)
- 🎭 잔액 보고 캐릭터 표정 바뀜 (😎→😐→😅→😰)
- 🔖 ROUTINE에서 자동 추가된 건 "AUTO" 배지 붙음

### 4️⃣ **STATS — 통계**
- 📈 총 XP, 레벨, 완료 개수 다 볼 수 있어
- 📊 카테고리별 막대 그래프
- 🗑️ 리셋 버튼 (조심!)

---

## 🎯 레벨 시스템

**Lv.1 → Lv.25까지 성장할 수 있어!**

| 레벨 | 이름 | 필요 XP |
|------|------|---------|
| Lv.1 | Hello World | 0 |
| Lv.5 | Function Creator | 700 |
| Lv.10 | Git Committer | 3,200 |
| Lv.15 | Code Reviewer | 9,200 |
| Lv.20 | System Architect | 22,000 |
| Lv.25 | Legendary Coder | 52,000 |

> 💡 **팁**: 우선순위 "최상"(+80 XP) 퀘스트를 완료하면 빨리 레벨업할 수 있어!

---

## 💡 핵심 기능

### ⚡ ROUTINE-BUDGET 자동 연동
```
넷플릭스 체크 ✅
→ 자동으로 BUDGET에 "17,000원 (고정지출)" 추가
→ AUTO 배지 표시
```
일일이 가계부에 또 쓸 필요 없어!

### 📅 전월 이월
```
1월 말 잔액: ₩500,000
→ 2월 1일 자동 이월
→ 2월 시작 잔액: ₩500,000
```
매달 수동으로 옮길 필요 없음!

### 🎨 터미널 스타일
- 개발자 친화적인 코딩 테마
- **#5596ec** 블루 포인트
- 모바일/데스크톱 둘 다 쌉가능

### 📱 PWA 지원
- 홈 화면에 추가해서 앱처럼 쓸 수 있어!
- 오프라인에서도 작동해
- 빠른 로딩 (캐싱 기능)

---

## 🚀 어떻게 쓰면 돼?

### 설치하기

**방법 1: 그냥 파일 열기**
```
index.html 더블클릭 → 끝!
```

**방법 2: 모바일에 설치**
```
1. 브라우저에서 열기
2. 공유 버튼 → "홈 화면에 추가"
3. 앱처럼 쓸 수 있음! 📱
```

**방법 3: GitHub Pages로 올리기**
```bash
1. GitHub 저장소 만들기
2. 파일들 업로드
3. Settings → Pages → Branch: main → Save
4. https://username.github.io/repo-name 접속하면 돼
```

---

### 사용법

#### ① QUEST 탭
```
1. 할 일 입력
2. 카테고리 선택 (업무/학습/생활 등)
3. 우선순위 선택 (낮음/보통/높음/최상)
4. "DEPLOY" 클릭
5. 완료하면 체크 → XP 땡겨! 🎉
```

#### ② ROUTINE 탭
```
1. "넷플릭스" 같은 고정 지출 추가
   - 금액: 17000 (쉼표 없이 입력)
   - 납부일: 15
   - XP: 15
2. 매월 15일에 체크 → 자동으로 BUDGET에 추가됨
3. D-Day 보고 깜빡하지 않을 수 있어!
```

#### ③ BUDGET 탭
```
1. 수입/지출 토글 선택
2. 금액 입력
3. 카테고리 선택
4. 메모 입력 (안 써도 됨)
5. "추가" 클릭
6. 바로 반영돼!
```

---

## 🎨 커스터마이징

### 동기부여 문구 바꾸기
`script.js` 파일 열어서 `MOTIVATION_QUOTES` 수정하면 돼
```javascript
const MOTIVATION_QUOTES = [
  "나만의 문구 넣기",
  "Build successful",
  "Commit pushed",
];
```

### 레벨 이름 바꾸기
```javascript
const LEVELS = [
  { name: "커스텀 레벨명", xp: 0 },
  { name: "내가 만든 레벨", xp: 100 },
];
```

### XP 보상 조정
```javascript
const XP_TABLE = {
  low:    15,  // 낮음 (원래: 10)
  normal: 30,  // 보통 (원래: 20)
  high:   60,  // 높음 (원래: 40)
  epic:   120, // 최상 (원래: 80)
};
```
더 많이 주고 싶으면 숫자 키우면 돼!

---

## 📊 데이터 관리

### 어디에 저장돼?
**브라우저 localStorage**에 저장돼 (F12 → Application → Local Storage)

- `liferpg_tasks` - 할 일 목록
- `liferpg_bills` - 생활비 항목
- `liferpg_stats` - XP, 레벨 같은 통계
- `liferpg_budget` - 가계부 데이터

### 백업하기
```javascript
// F12 → Console에서 실행
JSON.stringify(localStorage)
// → 나온 거 복사해서 텍스트 파일로 저장
```

### 복원하기
```javascript
// 백업한 데이터 붙여넣고 실행
const backup = { /* 백업 데이터 */ };
Object.keys(backup).forEach(key => {
  localStorage.setItem(key, backup[key]);
});
location.reload(); // 새로고침
```

---

## 🐛 자주 묻는 질문

### Q: 모바일이랑 데스크톱 데이터가 달라요
**A:** localStorage는 기기마다 따로 저장돼! 각각 관리해야 해.

### Q: PWA 설치했는데 업데이트가 안 돼요
**A:** 서비스워커 캐시 문제야.
```
앱 삭제 → 다시 설치하면 해결돼!
```

### Q: 데이터가 사라졌어요!
**A:** 브라우저 캐시 지우면 localStorage도 날아가. 백업 습관 들이자!

### Q: 생활비 항목이 자동으로 생겨요
**A:** `script.js`의 `DEFAULT_BILLS`를 비워줘.
```javascript
const DEFAULT_BILLS = []; // 비우면 안 생김
```

---

## 🔧 기술 스택

- 순수 JavaScript (프레임워크 안 씀)
- HTML5 + CSS3
- PWA (Progressive Web App)
- localStorage (데이터 저장)

**가볍고 빠름! ⚡**

---

## 📱 어떤 브라우저에서 돼?

- ✅ Chrome / Edge (추천!)
- ✅ Safari (iOS/macOS)
- ✅ Firefox
- ✅ Samsung Internet

---

## 📄 라이선스

MIT License - 마음대로 수정하고 배포해도 돼!

---

## 🎯 앞으로 추가하고 싶은 기능

- [ ] 클라우드 동기화 (기기 간 데이터 공유)
- [ ] 테마 변경 (다크/라이트 모드)
- [ ] 그래프 더 추가
- [ ] 리마인더 알림
- [ ] 주간/월간 리포트

---

## 👨‍💻 만든 사람

**LIFEDEV Terminal** — 일상을 코드처럼 관리하자! 🚀

Made with ❤️ by Developers

---

## 📞 피드백

버그 발견하거나 기능 제안 있으면 GitHub Issues에 올려줘!

**Happy Coding! 💻✨**
