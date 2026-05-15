/* ════════════════════════════════════════════════════
   LIFE RPG — script.js
   인생 RPG 관리 시스템 메인 로직
   
   ★ 초보자 커스터마이징 포인트 ★
   아래 섹션들을 수정해서 앱을 개인화하세요:
   1. MOTIVATION_QUOTES  — 랜덤 동기부여 문구
   2. LEVELS             — 레벨 이름과 XP 기준
   3. XP_TABLE           — 우선순위별 XP 보상
   4. CATEGORIES         — 카테고리 목록
   5. DEFAULT_BILLS      — 기본 생활비 항목
════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────────
   1. 동기부여 문구 (★ 자유롭게 수정 가능)
   배열에 문자열을 추가/삭제하세요
──────────────────────────────────────────────────── */
const MOTIVATION_QUOTES = [
  // 코딩 성취 계열
  "Build successful",
  "Commit pushed",
  "+15 XP 획득",
  "레벨업에 가까워졌습니다.",
  "Task completed",
  "생산성 스탯 상승",
  "디버깅 능력 증가",
  "Compilation succeeded",
  "테스트 케이스 통과",
  "코드 리뷰 승인됨",
  // 개발자 현실 계열
  "그래도 아무것도 안 한 건 아닙니다.",
  "Syntax error 0개",
  "놀랍게도 해냈습니다.",
  "Production deployment success",
  "버그 없이 실행됨",
  // 프로젝트/생활 계열
  "Deadline 전선 방어 성공",
  "이번 스프린트도 버텨내는 중",
  "Stack overflow 대응 성공",
  "Merge conflict 해결",
  "CI/CD 파이프라인 정상 작동",
  "월간 개발 루틴 진행 중",
  "개발자, 살아남다.",
  // 추가 기본 문구
  "Git push 성공",
  "오늘의 당신은 강하다",
  "작은 커밋이 쌓인다",
  "포기하지 않은 것 자체가 승리",
];

/* ────────────────────────────────────────────────────
   2. 레벨 시스템 (★ XP 수치 수정 가능)
   index = 레벨 번호, 값 = 해당 레벨 달성에 필요한 누적 XP
──────────────────────────────────────────────────── */
const LEVELS = [
  // 카피바라 레벨업 시스템 🦫
  { name: "[ 아무 생각 없는 카피바라 ]",        xp: 0 },        // Lv.1
  { name: "[ 졸린 카피바라 ]",                  xp: 100 },      // Lv.2
  { name: "[ 느긋한 카피바라 ]",                xp: 250 },      // Lv.3
  { name: "[ 그냥 그런 카피바라 ]",             xp: 450 },      // Lv.4
  { name: "[ 심심한 카피바라 ]",                xp: 700 },      // Lv.5
  { name: "[ 피곤한 카피바라 ]",                xp: 1000 },     // Lv.6
  { name: "[ 배부른 카피바라 ]",                xp: 1400 },     // Lv.7
  { name: "[ 신난 카피바라 ]",                  xp: 1900 },     // Lv.8
  { name: "[ 혼밥 중인 카피바라 ]",             xp: 2500 },     // Lv.9
  { name: "[ 일찍 일어난 카피바라 ]",           xp: 3200 },     // Lv.10
  { name: "[ 방 청소한 카피바라 ]",             xp: 4000 },     // Lv.11
  { name: "[ 온천 들어간 카피바라 ]",           xp: 5000 },     // Lv.12
  { name: "[ 치킨 기다리는 카피바라 ]",         xp: 6200 },     // Lv.13
  { name: "[ 택배 기다리는 카피바라 ]",         xp: 7600 },     // Lv.14
  { name: "[ 그냥 있는 카피바라 ]",             xp: 9200 },     // Lv.15
  { name: "[ 칭찬받은 카피바라 ]",              xp: 11000 },    // Lv.16
  { name: "[ 설레는 카피바라 ]",                xp: 13000 },    // Lv.17
  { name: "[ 신난 카피바라 ]",                  xp: 15500 },    // Lv.18
  { name: "[ 용돈 받은 카피바라 ]",             xp: 18500 },    // Lv.19
  { name: "[ 행복한 카피바라 ]",                xp: 22000 },    // Lv.20
  { name: "[ 뿌듯한 카피바라 ]",                xp: 26000 },    // Lv.21
  { name: "[ 비 맞은 카피바라 ]",               xp: 31000 },    // Lv.22
  { name: "[ 외로운 카피바라 ]",                xp: 37000 },    // Lv.23
  { name: "[ 새벽 감성인 카피바라 ]",           xp: 44000 },    // Lv.24
  { name: "[ 약속 취소된 카피바라 ]",           xp: 52000 },    // Lv.25
  { name: "[ 부끄러운 카피바라 ]",              xp: 61000 },    // Lv.26
  { name: "[ 긴장한 카피바라 ]",                xp: 71000 },    // Lv.27
  { name: "[ 지각한 카피바라 ]",                xp: 82000 },    // Lv.28
  { name: "[ 다이어트 중인 카피바라 ]",         xp: 94000 },    // Lv.29
  { name: "[ 유튜브 보다 밤샌 카피바라 ]",      xp: 107000 },   // Lv.30
  { name: "[ 벼락치기 중인 카피바라 ]",         xp: 121000 },   // Lv.31
  { name: "[ 시험 망친 카피바라 ]",             xp: 136000 },   // Lv.32
  { name: "[ 당황한 카피바라 ]",                xp: 152000 },   // Lv.33
  { name: "[ 오해받은 카피바라 ]",              xp: 169000 },   // Lv.34
  { name: "[ 억울한 카피바라 ]",                xp: 187000 },   // Lv.35
  { name: "[ 황당한 카피바라 ]",                xp: 206000 },   // Lv.36
  { name: "[ 의심스러운 카피바라 ]",            xp: 226000 },   // Lv.37
  { name: "[ 출근하기 싫은 카피바라 ]",         xp: 247000 },   // Lv.38
  { name: "[ 월요일인 카피바라 ]",              xp: 269000 },   // Lv.39
  { name: "[ 단톡방 나간 카피바라 ]",           xp: 292000 },   // Lv.40
  { name: "[ 슬픈 카피바라 ]",                  xp: 316000 },   // Lv.41
  { name: "[ 실연당한 카피바라 ]",              xp: 341000 },   // Lv.42
  { name: "[ 무서운 카피바라 ]",                xp: 367000 },   // Lv.43
  { name: "[ 화난 카피바라 ]",                  xp: 394000 },   // Lv.44
  { name: "[ 카페인 과다복용한 카피바라 ]",     xp: 422000 },   // Lv.45
  { name: "[ 로또 당첨된 카피바라 ]",           xp: 451000 },   // Lv.46
  { name: "[ 철학적인 카피바라 ]",              xp: 481000 },   // Lv.47
  { name: "[ 인생 달관한 카피바라 ]",           xp: 512000 },   // Lv.48
  { name: "[ 존재 자체로 충분한 카피바라 ]",    xp: 544000 },   // Lv.49
  { name: "[ 오늘도 수고한 카피바라 ]",         xp: 577000 },   // Lv.50
];

/* 티어 시스템 제거됨 (터미널 버전) */

/* ────────────────────────────────────────────────────
   3. 우선순위별 XP 보상 (★ 수정 가능)
──────────────────────────────────────────────────── */
const XP_TABLE = {
  low:    10,  // 낮음
  normal: 20,  // 보통
  high:   40,  // 높음
  epic:   80,  // 최상
};

/* ────────────────────────────────────────────────────
   4. 카테고리 목록 (★ 수정 가능)
──────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: "WORK",     label: "업무",   color: "#4a9eff" },
  { id: "STUDY",    label: "학습",   color: "#a78bfa" },
  { id: "LIFE",     label: "생활",   color: "#00e6b4" },
  { id: "HEALTH",   label: "건강",   color: "#34d399" },
  { id: "FINANCE",  label: "재정",   color: "#ffb347" },
  { id: "PERSONAL", label: "개인",   color: "#f472b6" },
  { id: "OTHER",    label: "기타",   color: "#8a9ab0" },
];

/* ────────────────────────────────────────────────────
   5. 기본 생활비 항목 (★ 자유롭게 수정)
   앱을 처음 실행할 때 자동으로 생성됩니다.

   필드 설명:
   - title  : 항목 이름
   - amount : 금액 문자열 (표시용, 없으면 생략)
   - day    : 매월 납부일 (1~31). null이면 날짜 미지정
   - xp     : 완료 시 획득 XP

   예시:
   { title: "넷플릭스", amount: "17,000", day: 15, xp: 15 },
──────────────────────────────────────────────────── */
const DEFAULT_BILLS = [
  // 비어있음 - 사용자가 직접 추가하세요
];

/* ────────────────────────────────────────────────────
   6. 앱 설정 상수
──────────────────────────────────────────────────── */
const CONFIG = {
  OVERLOAD_THRESHOLD: 10,    // 이 개수 초과 시 경고 표시
  MOTIVATION_INTERVAL: 8000, // 문구 교체 주기 (ms)
};

/* ════════════════════════════════════════════════════
   localStorage 키 정의
   브라우저 개발자도구 > Application > Local Storage에서
   직접 데이터를 확인/수정할 수 있습니다
════════════════════════════════════════════════════ */
const LS = {
  TASKS:     'liferpg_tasks',     // TODO 목록
  BILLS:     'liferpg_bills',     // 생활비 항목
  STATS:     'liferpg_stats',     // 누적 통계
  LAST_DATE: 'liferpg_lastdate',  // 마지막 접속일 (streak 계산)
  BILL_MONTH:'liferpg_billmonth', // 생활비 체크 리셋 기준 월
  BUDGET:    'liferpg_budget',    // 가계부 데이터
  HISTORY:   'liferpg_history',   // 월별 히스토리
};

/* ════════════════════════════════════════════════════
   앱 상태 (메모리 내 상태)
════════════════════════════════════════════════════ */
let state = {
  tasks: [],     // { id, title, desc, category, priority, xp, done, doneAt, createdAt }
  bills: [],     // { id, title, xp, done }
  stats: {
    totalXP: 0,
    todayXP: 0,
    totalDone: 0,
    streak: 0,
    lastDoneDate: null,
    lastLoginDate: null, // 마지막 로그인 날짜 (일일 XP 체크용)
    categoryDone: {}, // { WORK: 3, STUDY: 1, ... }
  },
  budget: {
    balance: 0,          // 현재 잔액 (HP)
    maxBalance: 1000000, // 최대 잔액 (월급 기준)
    log: [],             // { id, type: 'income'|'expense'|'saving', amount, category, desc, date, isCardSpending }
    payday: 20,          // 월급일
    monthlyIncome: 0,    // 월 수입
    carryOver: 0,        // 전월 이월금
    totalSavings: 0,     // 총 저축 금액 (세이프박스)
    cardSpending: 0,     // 카드 실적 합계
  },
  monthlyHistory: [],    // { year, month, data, memo }
};

/* ════════════════════════════════════════════════════
   데이터 로드 / 저장
════════════════════════════════════════════════════ */

/**
 * localStorage에서 데이터를 불러옵니다
 */
function loadData() {
  const tasks = JSON.parse(localStorage.getItem(LS.TASKS) || '[]');
  const bills = JSON.parse(localStorage.getItem(LS.BILLS) || 'null');
  const stats = JSON.parse(localStorage.getItem(LS.STATS) || 'null');
  const budget = JSON.parse(localStorage.getItem(LS.BUDGET) || 'null');
  const history = JSON.parse(localStorage.getItem(LS.HISTORY) || '[]');

  state.tasks = tasks;
  state.monthlyHistory = history;

  // 생활비: 처음 실행이면 기본값 사용
  if (!bills) {
    state.bills = DEFAULT_BILLS.map((b, i) => ({
      id: 'bill_' + Date.now() + '_' + i,
      title: b.title,
      amount: b.amount || null,  // 금액 문자열 (표시용)
      day: b.day || null,        // 매월 납부일
      xp: b.xp,
      done: false,
    }));
  } else {
    state.bills = bills;
  }

  // 통계: 처음이면 기본값
  if (!stats) {
    state.stats = {
      totalXP: 0, todayXP: 0, totalDone: 0, streak: 0,
      lastDoneDate: null, categoryDone: {},
    };
  } else {
    state.stats = stats;
  }

  // 가계부: 처음이면 기본값
  if (!budget) {
    state.budget = {
      balance: 0,
      maxBalance: 1000000,
      log: [],
      payday: 20,
      monthlyIncome: 0,
      carryOver: 0,
      totalSavings: 0,
      cardSpending: 0,
    };
  } else {
    state.budget = budget;
    // 기존 데이터에 필드가 없으면 추가
    if (state.budget.carryOver === undefined) state.budget.carryOver = 0;
    if (state.budget.totalSavings === undefined) state.budget.totalSavings = 0;
    if (state.budget.cardSpending === undefined) state.budget.cardSpending = 0;
  }

  // 오늘 XP 초기화 (날짜가 바뀌면 리셋)
  checkDailyReset();

  // 일일 로그인 체크 및 보상 (다음 레벨 요구 XP의 10%)
  checkDailyLogin();

  // 생활비 월간 리셋 확인
  checkMonthlyBillReset();

  // 가계부 월간 리셋 확인
  checkMonthlyBudgetReset();
}

/**
 * 현재 state를 localStorage에 저장합니다
 */
function saveData() {
  localStorage.setItem(LS.TASKS, JSON.stringify(state.tasks));
  localStorage.setItem(LS.BILLS, JSON.stringify(state.bills));
  localStorage.setItem(LS.STATS, JSON.stringify(state.stats));
  localStorage.setItem(LS.BUDGET, JSON.stringify(state.budget));
  localStorage.setItem(LS.HISTORY, JSON.stringify(state.monthlyHistory));
}

/**
 * 날짜가 바뀌었으면 오늘 XP를 초기화합니다 (streak 기능 제거됨)
 */
function checkDailyReset() {
  const today = getTodayStr();
  const lastDate = localStorage.getItem(LS.LAST_DATE);

  if (lastDate !== today) {
    // streak 기능 제거됨 (터미널 버전)
    // if (lastDate) {
    //   const yesterday = getYesterdayStr();
    //   if (lastDate !== yesterday) {
    //     state.stats.streak = 0;
    //   }
    // }
    state.stats.todayXP = 0;
    localStorage.setItem(LS.LAST_DATE, today);
  }
}

/**
 * 매월 20일이 되면 생활비 체크를 초기화합니다
 */
function checkMonthlyBillReset() {
  const now = new Date();

  const currentYearMonth = `${now.getFullYear()}-${now.getMonth()}`;
  const currentDay = now.getDate();

  const savedKey = localStorage.getItem(LS.BILL_MONTH);

  // 아직 이번 달 초기화를 안 했고,
  // 오늘이 20일 이상이면 초기화
  if (savedKey !== currentYearMonth && currentDay >= 20) {

    state.bills.forEach(b => b.done = false);

    localStorage.setItem(LS.BILL_MONTH, currentYearMonth);

    console.log("생활비 Task 초기화 완료 (매월 20일)");
  }
}

/**
 * 일일 로그인 체크: 새로운 날이면 다음 레벨까지 필요한 XP의 10% 지급
 */
function checkDailyLogin() {
  const today = getTodayStr();
  const lastLogin = state.stats.lastLoginDate;

  if (lastLogin !== today) {
    // 다음 레벨까지 필요한 XP의 10% 계산
    const levelInfo = getLevelInfo(state.stats.totalXP);
    const dailyXP = Math.floor(levelInfo.xpNeeded * 0.1);

    // XP 지급
    const xpBefore = state.stats.totalXP;
    state.stats.totalXP += dailyXP;
    state.stats.todayXP += dailyXP;

    // 마지막 로그인 날짜 업데이트
    state.stats.lastLoginDate = today;
    saveData();

    // 플로팅 XP 표시 및 레벨업 체크
    showXPFloat(dailyXP);
    checkLevelUp(xpBefore, state.stats.totalXP);

    console.log(`일일 로그인 보상: +${dailyXP} XP (다음 레벨 요구 XP의 10%)`);
  }
}

/* ════════════════════════════════════════════════════
   날짜 유틸리티
════════════════════════════════════════════════════ */
function getTodayStr() {
  return new Date().toISOString().slice(0, 10); // "2025-01-15"
}

function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function getCurrentMonthStr() {
  return new Date().toISOString().slice(0, 7); // "2025-01"
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')} ${['일','월','화','수','목','금','토'][d.getDay()]}`;
}

/* ════════════════════════════════════════════════════
   레벨 계산
════════════════════════════════════════════════════ */

/**
 * 누적 XP로 현재 레벨 번호를 반환합니다 (1부터 시작)
 */
/**
 * 무한 레벨 시스템: 현재 XP로 레벨 계산
 * LEVELS 배열 이후에도 계속 레벨업 가능
 */
function calcLevel(totalXP) {
  let level = 1;

  // 정의된 레벨 범위 내
  for (let i = 1; i < LEVELS.length; i++) {
    if (totalXP >= LEVELS[i].xp) level = i + 1;
    else break;
  }

  // 정의된 레벨을 넘어선 경우 동적 계산
  if (level >= LEVELS.length) {
    const lastLevelXP = LEVELS[LEVELS.length - 1].xp;
    const baseIncrement = 5000; // 레벨당 XP 증가량
    const excessXP = totalXP - lastLevelXP;
    const additionalLevels = Math.floor(excessXP / baseIncrement);
    level = LEVELS.length + additionalLevels;
  }

  return level;
}

/**
 * 현재 레벨 정보를 반환합니다 (무한 레벨 지원)
 */
function getLevelInfo(totalXP) {
  const level = calcLevel(totalXP);
  let title, currentLevelXP, nextLevelXP;

  if (level <= LEVELS.length) {
    // 정의된 레벨 범위 내
    const idx = level - 1;
    title = LEVELS[idx].name;
    currentLevelXP = LEVELS[idx].xp;
    nextLevelXP = LEVELS[idx + 1] ? LEVELS[idx + 1].xp : LEVELS[idx].xp + 5000;
  } else {
    // 무한 레벨 (동적 생성)
    title = `[ Master Lv.${level - LEVELS.length} ]`;
    const lastLevelXP = LEVELS[LEVELS.length - 1].xp;
    const levelsAbove = level - LEVELS.length;
    const baseIncrement = 5000;
    currentLevelXP = lastLevelXP + (levelsAbove * baseIncrement);
    nextLevelXP = currentLevelXP + baseIncrement;
  }

  const xpInLevel = totalXP - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;
  const progress = (xpInLevel / xpNeeded) * 100;

  return {
    level,
    title,
    xpInLevel,
    xpNeeded,
    nextLevelXP,
    progress: Math.min(100, progress),
    isMax: false, // 무한 레벨이므로 항상 false
  };
}

/* ════════════════════════════════════════════════════
   ID 생성
════════════════════════════════════════════════════ */
function genId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

/* ════════════════════════════════════════════════════
   UI 렌더링
════════════════════════════════════════════════════ */

/**
 * 상단 HUD 업데이트
 */
function renderHUD() {
  const info = getLevelInfo(state.stats.totalXP);

  document.getElementById('hud-level').textContent = info.level;
  document.getElementById('hud-level-title').textContent = info.title;
  document.getElementById('hud-xp').textContent = info.isMax ? state.stats.totalXP : info.xpInLevel;
  document.getElementById('hud-xp-next').textContent = info.isMax ? 'MAX' : info.xpNeeded;
  document.getElementById('xp-bar-fill').style.width = info.progress + '%';

  // 티어 시스템 제거됨 (터미널 버전)

  document.getElementById('stat-today-xp').textContent = state.stats.todayXP;
  document.getElementById('stat-done').textContent = state.stats.totalDone;

  // 날짜 표시
  document.getElementById('hud-date').textContent = formatDate(new Date().toISOString());
}

/**
 * TODO 목록 렌더링
 */
function renderTasks() {
  const activeTasks = state.tasks.filter(t => !t.done);
  const doneTasks   = state.tasks.filter(t =>  t.done);

  // 경고 배너 (TODO 과다)
  const warning = document.getElementById('overload-warning');
  if (activeTasks.length > CONFIG.OVERLOAD_THRESHOLD) {
    warning.classList.remove('hidden');
  } else {
    warning.classList.add('hidden');
  }

  document.getElementById('active-count').textContent = activeTasks.length;
  document.getElementById('done-count').textContent   = doneTasks.length;

  renderTaskList('task-list', activeTasks, false);
  renderTaskList('done-list', doneTasks, true);
}

/**
 * 태스크 목록 DOM 생성 헬퍼
 */
function renderTaskList(containerId, tasks, isDoneSection) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  if (tasks.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">${isDoneSection ? '✔' : '◎'}</div>
        ${isDoneSection ? '완료된 Task 없음' : '등록된 Task 없음'}
      </div>`;
    return;
  }

  tasks.forEach(task => {
    const cat = CATEGORIES.find(c => c.id === task.category) || CATEGORIES[CATEGORIES.length - 1];
    const div = document.createElement('div');
    div.className = 'task-item' + (task.done ? ' done' : '');
    div.dataset.priority = task.priority;

    div.innerHTML = `
      <button class="task-check" data-id="${task.id}" title="${task.done ? '완료 취소' : '완료'}">
        ${task.done ? '✔' : ''}
      </button>
      <div class="task-body">
        <div class="task-title-text">${escapeHtml(task.title)}</div>
        <div class="task-meta">
          <span class="task-meta-tag" style="color:${cat.color};border-color:${cat.color}22">${cat.label}</span>
          ${task.desc ? `<span class="task-meta-tag">${escapeHtml(task.desc)}</span>` : ''}
          <span class="task-xp">+${task.xp} XP</span>
        </div>
      </div>
      <div class="task-actions">
        ${!task.done ? `<button class="task-action-btn edit" data-edit="${task.id}" title="수정">✎</button>` : ''}
        <button class="task-action-btn del" data-del="${task.id}" title="삭제">×</button>
      </div>`;

    container.appendChild(div);
  });
}

/**
 * 생활비 목록 렌더링
 * - 납부일(day) 기준 오름차순 정렬
 * - D-day 배지 표시
 * - 금액 표시
 */
function renderBills() {
  const container = document.getElementById('bill-list');
  container.innerHTML = '';

  if (state.bills.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🏠</div>항목 없음</div>`;
  } else {
    // 납부일 기준 정렬 (day 없는 항목은 맨 뒤)
    const today = new Date().getDate(); // 오늘 날짜 (일)
    const sorted = [...state.bills].sort((a, b) => {
      if (a.day == null && b.day == null) return 0;
      if (a.day == null) return 1;
      if (b.day == null) return -1;
      // 이미 지난 날짜는 다음 달로 간주해 뒤로 보냄
      const aDue = a.day >= today ? a.day : a.day + 31;
      const bDue = b.day >= today ? b.day : b.day + 31;
      return aDue - bDue;
    });

    sorted.forEach(bill => {
      const div = document.createElement('div');
      div.className = 'bill-item' + (bill.done ? ' done' : '');

      // 금액 표시
      const amountHtml = bill.amount
        ? `<span class="bill-amount">₩${bill.amount}</span>`
        : '';

      // 납부일 표시
      const dayHtml = bill.day != null
        ? `<span class="bill-day-tag">${bill.day}일</span>`
        : '';

      div.innerHTML = `
        <button class="bill-check" data-bill-id="${bill.id}" title="${bill.done ? '체크 해제' : '완료 체크'}">
          ${bill.done ? '✔' : ''}
        </button>
        <div class="bill-body">
          <div class="bill-name-row">
            <span class="bill-name">${escapeHtml(bill.title)}</span>
          </div>
          <div class="bill-meta-row">
            ${dayHtml}
            ${amountHtml}
          </div>
        </div>
        <div class="task-actions">
          <button class="task-action-btn edit" data-bill-edit="${bill.id}" title="수정">✎</button>
          <button class="task-action-btn del" data-bill-del="${bill.id}" title="삭제">×</button>
        </div>`;
      container.appendChild(div);
    });
  }

  // 생활 안정도 계산 및 표시
  renderStabilityBar();
}

/**
 * 고정비 카운터 업데이트 (구 생활 안정도 게이지)
 */
function renderStabilityBar() {
  const total = state.bills.length;
  const done  = state.bills.filter(b => b.done).length;

  const doneEl = document.getElementById('bills-done-count');
  const totalEl = document.getElementById('bills-total-count');

  if (doneEl) doneEl.textContent = done;
  if (totalEl) totalEl.textContent = total;
}

/**
 * 통계 탭 렌더링
 */
function renderStats() {
  const info = getLevelInfo(state.stats.totalXP);

  document.getElementById('s-total-xp').textContent  = state.stats.totalXP;
  document.getElementById('s-level').textContent     = info.level;
  document.getElementById('s-total-done').textContent = state.stats.totalDone;
  document.getElementById('s-today-xp').textContent  = state.stats.todayXP;

  // 카테고리 차트
  renderCategoryChart();
}

/**
 * 카테고리별 완료 현황 차트
 */
function renderCategoryChart() {
  const container = document.getElementById('category-chart');
  container.innerHTML = '';

  const catData = state.stats.categoryDone || {};
  const maxCount = Math.max(1, ...Object.values(catData));
  let hasData = false;

  CATEGORIES.forEach(cat => {
    const count = catData[cat.id] || 0;
    if (count === 0) return;
    hasData = true;

    const row = document.createElement('div');
    row.className = 'chart-row';
    row.innerHTML = `
      <div class="chart-label" style="color:${cat.color}">${cat.label}</div>
      <div class="chart-track">
        <div class="chart-fill" style="width:${(count/maxCount)*100}%;background:${cat.color}"></div>
      </div>
      <div class="chart-count">${count}</div>`;
    container.appendChild(row);
  });

  if (!hasData) {
    container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📊</div>완료한 Task가 없습니다</div>`;
  }
}

/* ════════════════════════════════════════════════════
   액션 — TODO
════════════════════════════════════════════════════ */

/**
 * TODO 추가
 */
function addTask() {
  const title    = document.getElementById('task-title').value.trim();
  const desc     = document.getElementById('task-desc').value.trim();
  const category = document.getElementById('task-category').value;
  const priority = document.getElementById('task-priority').value;

  if (!title) {
    flashInput('task-title');
    return;
  }

  const xp = XP_TABLE[priority] || 20;

  const task = {
    id: genId(),
    title,
    desc,
    category,
    priority,
    xp,
    done: false,
    doneAt: null,
    createdAt: new Date().toISOString(),
  };

  state.tasks.unshift(task); // 최신이 위에 오도록
  saveData();
  renderTasks();

  // 입력 초기화
  document.getElementById('task-title').value = '';
  document.getElementById('task-desc').value  = '';
}

/**
 * TODO 완료/취소 토글
 */
function toggleTask(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;

  if (!task.done) {
    // 완료 처리
    task.done   = true;
    task.doneAt = new Date().toISOString();

    // XP 지급
    state.stats.totalXP   += task.xp;
    state.stats.todayXP   += task.xp;
    state.stats.totalDone += 1;

    // streak 기능 제거됨 (터미널 버전)
    // const today = getTodayStr();
    // if (state.stats.lastDoneDate !== today) {
    //   const yesterday = getYesterdayStr();
    //   if (state.stats.lastDoneDate === yesterday) {
    //     state.stats.streak += 1;
    //   } else if (!state.stats.lastDoneDate) {
    //     state.stats.streak = 1;
    //   } else {
    //     state.stats.streak = 1;
    //   }
    //   state.stats.lastDoneDate = today;
    // }

    // 카테고리 통계
    if (!state.stats.categoryDone) state.stats.categoryDone = {};
    state.stats.categoryDone[task.category] = (state.stats.categoryDone[task.category] || 0) + 1;

    // 애니메이션 & 효과
    showXPFloat(task.xp);
    showMotivation();
    checkLevelUp(state.stats.totalXP - task.xp, state.stats.totalXP);

  } else {
    // 완료 취소 (XP 회수)
    task.done   = false;
    task.doneAt = null;

    state.stats.totalXP   = Math.max(0, state.stats.totalXP - task.xp);
    state.stats.todayXP   = Math.max(0, state.stats.todayXP - task.xp);
    state.stats.totalDone = Math.max(0, state.stats.totalDone - 1);

    if (state.stats.categoryDone && state.stats.categoryDone[task.category]) {
      state.stats.categoryDone[task.category] = Math.max(0, state.stats.categoryDone[task.category] - 1);
    }
  }

  saveData();
  renderAll();
}

/**
 * TODO 삭제
 */
function deleteTask(taskId) {
  state.tasks = state.tasks.filter(t => t.id !== taskId);
  saveData();
  renderTasks();
  renderStats();
}

/**
 * 수정 모달 열기
 */
function openEditModal(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;

  document.getElementById('edit-task-id').value    = task.id;
  document.getElementById('edit-task-title').value  = task.title;
  document.getElementById('edit-task-desc').value   = task.desc || '';
  document.getElementById('edit-task-category').value = task.category;
  document.getElementById('edit-task-priority').value = task.priority;

  document.getElementById('edit-modal').classList.remove('hidden');
}

/**
 * 수정 저장
 */
function saveEdit() {
  const id       = document.getElementById('edit-task-id').value;
  const title    = document.getElementById('edit-task-title').value.trim();
  const desc     = document.getElementById('edit-task-desc').value.trim();
  const category = document.getElementById('edit-task-category').value;
  const priority = document.getElementById('edit-task-priority').value;

  if (!title) { flashInput('edit-task-title'); return; }

  const task = state.tasks.find(t => t.id === id);
  if (!task) return;

  // XP가 바뀌었으면 차이만큼 조정
  const newXP = XP_TABLE[priority] || 20;
  if (task.done) {
    const diff = newXP - task.xp;
    state.stats.totalXP = Math.max(0, state.stats.totalXP + diff);
    state.stats.todayXP = Math.max(0, state.stats.todayXP + diff);
  }

  task.title    = title;
  task.desc     = desc;
  task.category = category;
  task.priority = priority;
  task.xp       = newXP;

  saveData();
  renderAll();
  closeEditModal();
}

function closeEditModal() {
  document.getElementById('edit-modal').classList.add('hidden');
}

/* ════════════════════════════════════════════════════
   액션 — 생활비
════════════════════════════════════════════════════ */

/**
 * 생활비 항목 추가
 */
function addBill() {
  const title  = document.getElementById('bill-title').value.trim();
  const amount = document.getElementById('bill-amount').value.trim();
  const dayVal = parseInt(document.getElementById('bill-day').value, 10);

  if (!title) { flashInput('bill-title'); return; }

  const bill = {
    id: genId(),
    title,
    amount: amount || null,
    day: (!isNaN(dayVal) && dayVal >= 1 && dayVal <= 31) ? dayVal : null,
    xp: 0,
    done: false,
  };

  state.bills.push(bill);
  saveData();

  document.getElementById('bill-title').value  = '';
  document.getElementById('bill-amount').value = '';
  document.getElementById('bill-day').value    = '';

  renderBills();
}

/**
 * 생활비 완료 토글
 */
function toggleBill(billId) {
  const bill = state.bills.find(b => b.id === billId);
  if (!bill) return;

  if (!bill.done) {
    bill.done = true;
    state.stats.totalXP += bill.xp;
    state.stats.todayXP += bill.xp;

    // ROUTINE 고정비를 BUDGET에 자동 반영
    if (bill.amount) {
      const amountNum = parseInt(bill.amount.replace(/,/g, '')) || 0;
      if (amountNum > 0) {
        addBudgetLog('expense', amountNum, 'FIXED', bill.title, true);
      }
    }

    showXPFloat(bill.xp);
    showMotivation();
    checkLevelUp(state.stats.totalXP - bill.xp, state.stats.totalXP);
  } else {
    bill.done = false;
    state.stats.totalXP = Math.max(0, state.stats.totalXP - bill.xp);
    state.stats.todayXP = Math.max(0, state.stats.todayXP - bill.xp);

    // ROUTINE 고정비 체크 해제 시 BUDGET에서도 제거
    // (마지막 고정비 항목을 찾아서 삭제)
    if (bill.amount) {
      const amountNum = parseInt(bill.amount.replace(/,/g, '')) || 0;
      if (amountNum > 0) {
        removeBudgetLogByBill(bill.title, amountNum);
      }
    }
  }

  saveData();
  renderHUD();
  renderBills();
  renderStats();
  renderBudget(); // BUDGET 화면도 업데이트
}

/**
 * 생활비 항목 삭제
 */
function deleteBill(billId) {
  state.bills = state.bills.filter(b => b.id !== billId);
  saveData();
  renderBills();
}

/**
 * 로또 번호 생성 (8-bit 픽셀 스타일)
 */
function generateLotto() {
  const container = document.getElementById('lotto-numbers');
  container.innerHTML = '';

  const numbers = [];
  while (numbers.length < 6) {
    const num = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  numbers.sort((a, b) => a - b);

  numbers.forEach((num, index) => {
    setTimeout(() => {
      const ball = document.createElement('div');
      ball.className = 'lotto-ball-pixel';
      ball.textContent = num;

      // 번호 범위에 따라 색상 구분 (레트로 팔레트)
      let range;
      if (num <= 9) range = '1';
      else if (num <= 18) range = '2';
      else if (num <= 27) range = '3';
      else if (num <= 36) range = '4';
      else range = '5';

      ball.setAttribute('data-range', range);
      container.appendChild(ball);
    }, index * 100);
  });
}

/* ════════════════════════════════════════════════════
   시각 효과
════════════════════════════════════════════════════ */

/**
 * XP 획득 플로팅 텍스트 애니메이션
 */
function showXPFloat(xp) {
  const container = document.getElementById('xp-float-container');
  const el = document.createElement('div');
  el.className = 'xp-float';
  el.textContent = (xp >= 0 ? '+' : '') + xp + ' XP';

  // XP가 마이너스면 색상 변경
  if (xp < 0) {
    el.style.color = '#ff4655';
  }

  // 화면 중앙 상단 근처 랜덤 위치
  const x = 30 + Math.random() * 40; // 30~70% 가로
  const y = 20 + Math.random() * 20; // 20~40% 세로
  el.style.left = x + 'vw';
  el.style.top  = y + 'vh';

  container.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

/**
 * 레벨업 체크 및 오버레이 표시
 */
function checkLevelUp(xpBefore, xpAfter) {
  const levelBefore = calcLevel(xpBefore);
  const levelAfter  = calcLevel(xpAfter);

  if (levelAfter > levelBefore) {
    const info = getLevelInfo(xpAfter);

    // 티어 아이콘 표시 (이미지)
    const tierImg = info.tier.img;
    const tierName = info.tier.fullName;

    document.getElementById('levelup-title').innerHTML =
      `<img src="${tierImg}" alt="${tierName}" style="width:80px;height:80px;filter:drop-shadow(0 0 20px ${info.tier.color})"/><br>` +
      `Lv.${info.level} ${tierName}`;
    document.getElementById('levelup-subtitle').textContent = info.title;
    document.getElementById('levelup-overlay').classList.remove('hidden');

    // 3초 후 자동 닫기
    setTimeout(() => {
      document.getElementById('levelup-overlay').classList.add('hidden');
    }, 3000);
  }
}

/**
 * 동기부여 문구 갱신
 */
function showMotivation() {
  const el = document.getElementById('motivation-text');
  el.style.opacity = '0';
  setTimeout(() => {
    const idx = Math.floor(Math.random() * MOTIVATION_QUOTES.length);
    el.textContent = MOTIVATION_QUOTES[idx];
    el.style.opacity = '1';
  }, 300);
}

/**
 * 입력 필드 에러 flash 효과
 */
function flashInput(inputId) {
  const el = document.getElementById(inputId);
  el.style.borderColor = 'var(--danger)';
  el.style.boxShadow   = '0 0 0 2px var(--danger-dim)';
  el.focus();
  setTimeout(() => {
    el.style.borderColor = '';
    el.style.boxShadow   = '';
  }, 1000);
}

/* ════════════════════════════════════════════════════
   탭 전환
════════════════════════════════════════════════════ */

/**
 * 탭 전환 (data-tab 속성으로 구분)
 */
function switchTab(tabId) {
  // 모든 탭 콘텐츠 숨기기
  document.querySelectorAll('.tab-content').forEach(el => {
    el.classList.add('hidden');
    el.classList.remove('active');
  });

  // 선택한 탭 표시
  const target = document.getElementById('tab-' + tabId);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
  }

  // 탭 버튼 active 상태
  document.querySelectorAll('.tab-btn, .bottom-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // 스크롤 맨 위로
  window.scrollTo(0, 0);

  // 탭 전환 시 해당 탭 렌더링
  if (tabId === 'budget') renderBudget();
  if (tabId === 'history') renderMonthlyHistory();
}

/* ════════════════════════════════════════════════════
   전체 렌더링
════════════════════════════════════════════════════ */
function renderAll() {
  renderHUD();
  renderTasks();
  renderBills();
  renderBudget();
}

/* ════════════════════════════════════════════════════
   초기화 — 카테고리 select 옵션 채우기
════════════════════════════════════════════════════ */
function initCategorySelects() {
  const selects = ['task-category', 'edit-task-category'];
  selects.forEach(id => {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = '';
    CATEGORIES.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = cat.label;
      select.appendChild(opt);
    });
  });

  // 가계부 카테고리
  // BUDGET 카테고리는 HTML에서 직접 정의됨 (수입/지출별로 분리)
  // 더 이상 동적으로 생성하지 않음
}

/* ════════════════════════════════════════════════════
   이벤트 리스너 등록
════════════════════════════════════════════════════ */
function initEventListeners() {

  // ── 로또 번호 생성
  document.getElementById('lotto-btn').addEventListener('click', generateLotto);

  // ── 생활비 추가
  document.getElementById('add-bill-btn').addEventListener('click', addBill);
  document.getElementById('bill-title').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('bill-amount').focus();
  });
  document.getElementById('bill-amount').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('bill-day').focus();
  });
  document.getElementById('bill-day').addEventListener('keydown', e => {
    if (e.key === 'Enter') addBill();
  });

  // ── 생활비 목록 이벤트 (이벤트 위임)
  document.getElementById('bill-list').addEventListener('click', e => {
    const checkBtn = e.target.closest('[data-bill-id]');
    const editBtn  = e.target.closest('[data-bill-edit]');
    const delBtn   = e.target.closest('[data-bill-del]');
    if (checkBtn) toggleBill(checkBtn.dataset.billId);
    if (editBtn)  openBillEditModal(editBtn.dataset.billEdit);
    if (delBtn) {
      if (confirm('이 항목을 삭제할까요?')) deleteBill(delBtn.dataset.billDel);
    }
  });

  // ── 탭 버튼 (상단)
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // ── 탭 버튼 (하단 모바일)
  document.querySelectorAll('.bottom-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // ── 레벨업 오버레이 클릭 닫기
  document.getElementById('levelup-overlay').addEventListener('click', () => {
    document.getElementById('levelup-overlay').classList.add('hidden');
  });

  // ── 통계 탭 — 전체 초기화
  document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('⚠ 모든 데이터를 초기화할까요? 이 작업은 되돌릴 수 없습니다.')) {
      localStorage.clear();
      location.reload();
    }
  });

  // ── 통계 탭 — 생활비 월간 리셋
  document.getElementById('reset-bills-btn').addEventListener('click', () => {
    if (confirm('이번 달 생활비 체크를 초기화할까요?')) {
      state.bills.forEach(b => b.done = false);
      saveData();
      renderBills();
    }
  });

  // ── 가계부 (Budget) 이벤트
  let currentTransactionType = 'income'; // 기본값: 수입

  const toggleIncomeBtn = document.getElementById('toggle-income-btn');
  const toggleExpenseBtn = document.getElementById('toggle-expense-btn');
  const toggleSavingBtn = document.getElementById('toggle-saving-btn');
  const categoryIncome = document.getElementById('budget-category-income');
  const categoryExpense = document.getElementById('budget-category-expense');
  const cardCheckboxContainer = document.getElementById('card-spending-checkbox-container');
  const addTransactionBtn = document.getElementById('add-transaction-btn');

  // 수입/지출/저축 토글
  if (toggleIncomeBtn && toggleExpenseBtn && toggleSavingBtn) {
    toggleIncomeBtn.addEventListener('click', () => {
      currentTransactionType = 'income';
      toggleIncomeBtn.classList.add('active');
      toggleExpenseBtn.classList.remove('active');
      toggleSavingBtn.classList.remove('active');
      if (categoryIncome) categoryIncome.style.display = '';
      if (categoryExpense) categoryExpense.style.display = 'none';
      if (cardCheckboxContainer) cardCheckboxContainer.style.display = 'none';
    });

    toggleExpenseBtn.addEventListener('click', () => {
      currentTransactionType = 'expense';
      toggleIncomeBtn.classList.remove('active');
      toggleExpenseBtn.classList.add('active');
      toggleSavingBtn.classList.remove('active');
      if (categoryIncome) categoryIncome.style.display = 'none';
      if (categoryExpense) categoryExpense.style.display = '';
      if (cardCheckboxContainer) cardCheckboxContainer.style.display = '';
    });

    toggleSavingBtn.addEventListener('click', () => {
      currentTransactionType = 'saving';
      toggleIncomeBtn.classList.remove('active');
      toggleExpenseBtn.classList.remove('active');
      toggleSavingBtn.classList.add('active');
      if (categoryIncome) categoryIncome.style.display = 'none';
      if (categoryExpense) categoryExpense.style.display = 'none';
      if (cardCheckboxContainer) cardCheckboxContainer.style.display = 'none';
    });
  }

  // 거래 추가
  if (addTransactionBtn) {
    addTransactionBtn.addEventListener('click', () => {
      const amount = document.getElementById('budget-amount').value.trim();
      const desc = document.getElementById('budget-desc').value.trim();
      const isCardSpending = document.getElementById('card-spending-checkbox')?.checked || false;

      if (!amount || isNaN(amount) || parseInt(amount) <= 0) {
        flashInput('budget-amount');
        return;
      }

      let category = '';
      if (currentTransactionType === 'income') {
        category = categoryIncome?.value || 'SALARY';
      } else if (currentTransactionType === 'expense') {
        category = categoryExpense?.value || 'ETC';
      } else {
        category = 'SAVING';
      }

      addBudgetLog(currentTransactionType, amount, category, desc, false, isCardSpending);

      document.getElementById('budget-amount').value = '';
      document.getElementById('budget-desc').value = '';
      if (document.getElementById('card-spending-checkbox')) {
        document.getElementById('card-spending-checkbox').checked = false;
      }
    });
  }

  // ── 가계부 로그 수정/삭제
  const budgetLog = document.getElementById('budget-log');
  if (budgetLog) {
    budgetLog.addEventListener('click', e => {
      const editBtn = e.target.closest('[data-budget-edit]');
      const delBtn = e.target.closest('[data-budget-del]');

      if (editBtn) {
        openBudgetEditModal(editBtn.dataset.budgetEdit);
      }
      if (delBtn) {
        if (confirm('이 항목을 삭제할까요?')) {
          deleteBudgetEntry(delBtn.dataset.budgetDel);
        }
      }
    });
  }

  // ── 생활비 수정 모달
  const saveBillEditBtn = document.getElementById('save-bill-edit-btn');
  const cancelBillEditBtn = document.getElementById('cancel-bill-edit-btn');

  if (saveBillEditBtn) {
    saveBillEditBtn.addEventListener('click', saveBillEdit);
  }

  if (cancelBillEditBtn) {
    cancelBillEditBtn.addEventListener('click', closeBillEditModal);
  }

  const editBillModal = document.getElementById('edit-bill-modal');
  if (editBillModal) {
    editBillModal.addEventListener('click', e => {
      if (e.target === e.currentTarget) closeBillEditModal();
    });
  }

  // ── 가계부 수정 모달
  const saveBudgetEditBtn = document.getElementById('save-budget-edit-btn');
  const cancelBudgetEditBtn = document.getElementById('cancel-budget-edit-btn');

  if (saveBudgetEditBtn) {
    saveBudgetEditBtn.addEventListener('click', saveBudgetEdit);
  }

  if (cancelBudgetEditBtn) {
    cancelBudgetEditBtn.addEventListener('click', closeBudgetEditModal);
  }

  const editBudgetModal = document.getElementById('edit-budget-modal');
  if (editBudgetModal) {
    editBudgetModal.addEventListener('click', e => {
      if (e.target === e.currentTarget) closeBudgetEditModal();
    });
  }
}

/* ════════════════════════════════════════════════════
   동기부여 문구 자동 교체
════════════════════════════════════════════════════ */
function initMotivationCycle() {
  // 처음 표시
  showMotivation();
  // 주기적으로 교체
  setInterval(showMotivation, CONFIG.MOTIVATION_INTERVAL);
}

/* ════════════════════════════════════════════════════
   HTML 이스케이프 (XSS 방지)
════════════════════════════════════════════════════ */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ════════════════════════════════════════════════════
   앱 시작점
════════════════════════════════════════════════════ */
function init() {
  loadData();           // localStorage 데이터 로드
  initCategorySelects(); // 카테고리 드롭다운 채우기
  initEventListeners(); // 이벤트 연결
  initMotivationCycle(); // 동기부여 문구 주기 시작
  renderAll();          // 화면 초기 렌더링
}

// DOM 준비 완료 후 실행
document.addEventListener('DOMContentLoaded', init);

/* ════════════════════════════════════════════════════
   Service Worker 등록 (PWA)
════════════════════════════════════════════════════ */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('✅ Service Worker 등록 성공:', registration.scope);
      })
      .catch(error => {
        console.log('❌ Service Worker 등록 실패:', error);
      });
  });
}

/* ════════════════════════════════════════════════════
   가계부 (Budget) 시스템
════════════════════════════════════════════════════ */

const BUDGET_CATEGORIES = {
  income: [
    { id: 'SALARY', label: '월급' },
    { id: 'DUTCH', label: '더치' },
    { id: 'ALLOWANCE', label: '용돈' },
    { id: 'OTHER_INCOME', label: '기타' },
  ],
  expense: [
    { id: 'FOOD', label: '식비' },
    { id: 'HOBBY', label: '취미' },
    { id: 'FIXED', label: '고정' },
    { id: 'LIVING', label: '생활' },
    { id: 'OTHER_EXPENSE', label: '기타' },
  ],
};

/**
 * 매월 20일 (월급일)에 가계부 로그 아카이빙 및 리셋
 */
function checkMonthlyBudgetReset() {
  const now = new Date();
  const currentYearMonth = `${now.getFullYear()}-${now.getMonth()}`;
  const currentDay = now.getDate();

  const savedKey = localStorage.getItem('liferpg_budget_month');

  if (savedKey !== currentYearMonth && currentDay >= state.budget.payday) {
    // 월간 히스토리 아카이빙
    archiveMonthlyData();

    // 기존 아카이빙 + 전월 이월
    archiveBudgetLog();

    // 카드 실적 초기화
    resetCardSpending();

    // 월급 자동 지급 기능 제거 (사용자가 수동으로 입력)
    // 대신 전월 이월이 자동으로 적용됨

    localStorage.setItem('liferpg_budget_month', currentYearMonth);
    console.log(`✅ 가계부 월간 리셋 완료 (${state.budget.payday}일) - 전월 이월: ₩${state.budget.carryOver.toLocaleString()}`);
  }
}

/**
 * 월간 로그 아카이빙 + 전월 이월
 */
function archiveBudgetLog() {
  const now = new Date();
  const archiveKey = `liferpg_budget_archive_${now.getFullYear()}_${now.getMonth()}`;

  // 이번 달 총 수입/지출 계산
  const totalIncome = state.budget.log.filter(l => l.type === 'income').reduce((sum, l) => sum + l.amount, 0);
  const totalExpense = state.budget.log.filter(l => l.type === 'expense').reduce((sum, l) => sum + l.amount, 0);

  // 전월 이월금 포함한 실제 잔액
  const currentBalance = state.budget.carryOver + totalIncome - totalExpense;

  const archive = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    log: [...state.budget.log],
    summary: {
      totalIncome,
      totalExpense,
      carryOver: state.budget.carryOver,
      finalBalance: currentBalance,
    },
  };

  localStorage.setItem(archiveKey, JSON.stringify(archive));

  // 다음 달로 잔액 이월
  state.budget.carryOver = Math.max(0, currentBalance); // 음수면 0으로

  // 로그 초기화
  state.budget.log = [];

  saveData();

  console.log(`✅ 전월 이월: ₩${state.budget.carryOver.toLocaleString()}`);
}

/**
 * 가계부 항목 추가
 */
function addBudgetLog(type, amount, category, desc, skipXP = false, isCardSpending = false) {
  const entry = {
    id: genId(),
    type,   // 'income', 'expense', 'saving'
    amount: parseInt(amount, 10),
    category,
    desc: desc || '',
    date: new Date().toISOString(),
    isCardSpending: isCardSpending, // 카드 실적 체크
  };

  state.budget.log.unshift(entry); // 최신이 위로

  // 잔액 업데이트
  if (type === 'income') {
    state.budget.balance += entry.amount;
  } else if (type === 'expense') {
    state.budget.balance -= entry.amount;
    // 카드 실적 추적
    if (isCardSpending) {
      state.budget.cardSpending += entry.amount;
    }
  } else if (type === 'saving') {
    // 저축은 잔액에서 빼고 저축 항목에 추가
    state.budget.balance -= entry.amount;
    state.budget.totalSavings += entry.amount;
  }

  // HP 기반 XP 증감 (자동 반영 시 제외)
  if (!skipXP && type !== 'saving') {
    updateBudgetXP(type, entry.amount);
  }

  saveData();
  renderBudget();
  renderHUD();
}

/**
 * 가계부 기반 XP 증감
 */
function updateBudgetXP(type, amount) {
  if (type === 'expense') {
    // 지출 규칙
    if (amount <= 10000) {
      // 1만원 이하 소비 → +50 XP
      state.stats.totalXP += 50;
      state.stats.todayXP += 50;
      showXPFloat(50);
    } else if (amount >= 50000) {
      // 5만원 이상 과소비 → -50 XP
      state.stats.totalXP = Math.max(0, state.stats.totalXP - 50);
      state.stats.todayXP = Math.max(0, state.stats.todayXP - 50);
      showXPFloat(-50);
    }
  }

  checkLevelUp(state.stats.totalXP - 50, state.stats.totalXP);
  saveData();
}

/**
 * 가계부 렌더링
 */
function renderBudget() {
  // 이번 달 총 수입/지출 계산
  const totalIncome = state.budget.log
    .filter(e => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = state.budget.log
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

  // 전월 이월금 포함한 실제 잔액
  const currentBalance = state.budget.carryOver + totalIncome - totalExpense;

  // 지출 비율 계산 (이월금 + 수입 대비 지출)
  const totalAvailable = state.budget.carryOver + totalIncome;
  const expenseRatio = totalAvailable > 0
    ? Math.min(100, (totalExpense / totalAvailable) * 100)
    : 0;

  const hpAmountContainer = document.getElementById('budget-hp-amount');
  if (hpAmountContainer) {
    hpAmountContainer.innerHTML = `₩${currentBalance.toLocaleString()} <span style="font-size: 16px; opacity: 0.7;" id="budget-hp-pct">${expenseRatio.toFixed(0)}%</span> / ₩<span id="budget-hp-max">${totalAvailable.toLocaleString()}</span>`;
  }

  // 전월 이월 표시
  const carryOverEl = document.getElementById('budget-carryover');
  if (carryOverEl && state.budget.carryOver > 0) {
    carryOverEl.textContent = `전월 이월: +₩${state.budget.carryOver.toLocaleString()}`;
    carryOverEl.style.display = '';
  } else if (carryOverEl) {
    carryOverEl.style.display = 'none';
  }

  // 캐릭터 상태 (지출 비율 기준)
  const char = document.getElementById('budget-character');
  if (char) {
    if (expenseRatio < 50) {
      char.textContent = '😎'; // 절약 중
    } else if (expenseRatio < 80) {
      char.textContent = '😐'; // 보통
    } else {
      char.textContent = '😰'; // 과소비
    }
  }

  // 저축 및 카드실적 표시
  const savingsDisplay = document.getElementById('budget-savings-display');
  if (savingsDisplay) {
    savingsDisplay.textContent = `₩${state.budget.totalSavings.toLocaleString()}`;
  }

  const cardDisplay = document.getElementById('budget-card-display');
  if (cardDisplay) {
    cardDisplay.textContent = `₩${state.budget.cardSpending.toLocaleString()}`;
  }

  // 로그 렌더링
  renderBudgetLog();
}

/**
 * 가계부 로그 렌더링
 */
function renderBudgetLog() {
  const container = document.getElementById('budget-log');
  container.innerHTML = '';

  if (state.budget.log.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">💰</div>
        로그 없음
      </div>`;
    return;
  }

  state.budget.log.forEach(entry => {
    const div = document.createElement('div');
    div.className = `budget-log-item ${entry.type}`;

    // 카테고리 찾기 (저축은 별도 처리)
    let cat, categories;
    if (entry.type === 'saving') {
      cat = { label: '💰 저축' };
    } else {
      categories = entry.type === 'income' ? BUDGET_CATEGORIES.income : BUDGET_CATEGORIES.expense;
      cat = categories.find(c => c.id === entry.category) || categories[categories.length - 1];
    }

    const date = new Date(entry.date);
    const dateStr = `${date.getMonth()+1}/${date.getDate()} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;

    // 카드 실적 배지
    const cardBadge = entry.isCardSpending ? '<span class="card-badge">💳</span>' : '';

    div.innerHTML = `
      <div class="budget-log-date">${dateStr}</div>
      <div class="budget-log-desc">${escapeHtml(entry.desc || cat.label)} ${cardBadge}</div>
      <div class="budget-log-category">${cat.label}</div>
      <div class="budget-log-amount ${entry.type}">
        ${entry.type === 'income' ? '+' : '-'}₩${entry.amount.toLocaleString()}
      </div>
      <div class="budget-log-actions">
        <button class="budget-log-btn edit" data-budget-edit="${entry.id}" title="수정">✎</button>
        <button class="budget-log-btn del" data-budget-del="${entry.id}" title="삭제">×</button>
      </div>`;

    container.appendChild(div);
  });
}

/**
 * 가계부 항목 삭제
 */
function deleteBudgetEntry(entryId) {
  const entry = state.budget.log.find(e => e.id === entryId);
  if (!entry) return;

  // 잔액 복구
  if (entry.type === 'income') {
    state.budget.balance -= entry.amount;
  } else if (entry.type === 'expense') {
    state.budget.balance += entry.amount;
    // 카드 실적 복구
    if (entry.isCardSpending) {
      state.budget.cardSpending -= entry.amount;
    }
  } else if (entry.type === 'saving') {
    state.budget.balance += entry.amount;
    state.budget.totalSavings -= entry.amount;
  }

  state.budget.log = state.budget.log.filter(e => e.id !== entryId);
  saveData();
  renderBudget();
}

/**
 * 가계부 항목 수정 모달 열기
 */
function openBudgetEditModal(entryId) {
  const entry = state.budget.log.find(e => e.id === entryId);
  if (!entry) return;

  document.getElementById('edit-budget-id').value = entry.id;
  document.getElementById('edit-budget-amount').value = entry.amount;
  document.getElementById('edit-budget-desc').value = entry.desc || '';

  document.getElementById('edit-budget-modal').classList.remove('hidden');
}

/**
 * 가계부 항목 수정 저장
 */
function saveBudgetEdit() {
  const id = document.getElementById('edit-budget-id').value;
  const amount = parseInt(document.getElementById('edit-budget-amount').value, 10);
  const desc = document.getElementById('edit-budget-desc').value.trim();

  if (!amount || amount < 1) {
    flashInput('edit-budget-amount');
    return;
  }

  const entry = state.budget.log.find(e => e.id === id);
  if (!entry) return;

  // 잔액 조정 (기존 금액 복구 후 새 금액 적용)
  const oldAmount = entry.amount;
  const difference = amount - oldAmount;

  if (entry.type === 'income') {
    state.budget.balance += difference;
  } else if (entry.type === 'expense') {
    state.budget.balance -= difference;
    // 카드 실적 조정
    if (entry.isCardSpending) {
      state.budget.cardSpending += difference;
    }
  } else if (entry.type === 'saving') {
    state.budget.balance -= difference;
    state.budget.totalSavings += difference;
  }

  // 항목 업데이트
  entry.amount = amount;
  entry.desc = desc || null;

  saveData();
  renderBudget();
  closeBudgetEditModal();
}

/**
 * 가계부 항목 수정 모달 닫기
 */
function closeBudgetEditModal() {
  document.getElementById('edit-budget-modal').classList.add('hidden');
}

/**
 * ROUTINE bill 체크 해제 시 BUDGET에서 해당 고정비 항목 제거
 */
function removeBudgetLogByBill(billTitle, amount) {
  // 가장 최근에 추가된 동일 금액의 고정비 항목 찾기
  const index = state.budget.log.findIndex(e =>
    e.type === 'expense' &&
    e.category === 'FIXED' &&
    e.amount === amount &&
    e.desc.includes(billTitle)
  );

  if (index !== -1) {
    const entry = state.budget.log[index];
    // 잔액 복구
    state.budget.balance += entry.amount;
    // 항목 제거
    state.budget.log.splice(index, 1);
    saveData();
  }
}

/**
 * 생활비 수정 모달 열기
 */
function openBillEditModal(billId) {
  const bill = state.bills.find(b => b.id === billId);
  if (!bill) return;

  document.getElementById('edit-bill-id').value = bill.id;
  document.getElementById('edit-bill-title').value = bill.title;
  document.getElementById('edit-bill-amount').value = bill.amount || '';
  document.getElementById('edit-bill-day').value = bill.day || '';

  document.getElementById('edit-bill-modal').classList.remove('hidden');
}

/**
 * 생활비 수정 저장
 */
function saveBillEdit() {
  const id = document.getElementById('edit-bill-id').value;
  const title = document.getElementById('edit-bill-title').value.trim();
  const amount = document.getElementById('edit-bill-amount').value.trim();
  const dayVal = parseInt(document.getElementById('edit-bill-day').value, 10);

  if (!title) { flashInput('edit-bill-title'); return; }

  const bill = state.bills.find(b => b.id === id);
  if (!bill) return;

  bill.title = title;
  bill.amount = amount || null;
  bill.day = (!isNaN(dayVal) && dayVal >= 1 && dayVal <= 31) ? dayVal : null;
  bill.xp = 0;

  saveData();
  renderBills();
  closeBillEditModal();
}

function closeBillEditModal() {
  document.getElementById('edit-bill-modal').classList.add('hidden');
}

/* ════════════════════════════════════════════════════
   새로운 기능: 저축, 카드 실적, 월별 히스토리
════════════════════════════════════════════════════ */

/**
 * 저축하기 (세이프박스)
 */
function addSaving(amount, desc) {
  addBudgetLog('saving', amount, 'SAVING', desc || '저축', false, false);
}

/**
 * 월별 데이터 아카이빙
 */
function archiveMonthlyData() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-12

  // 이미 아카이빙된 월인지 확인
  const existingIndex = state.monthlyHistory.findIndex(
    h => h.year === year && h.month === month
  );

  const archiveData = {
    year,
    month,
    data: {
      balance: state.budget.balance,
      totalSavings: state.budget.totalSavings,
      cardSpending: state.budget.cardSpending,
      log: [...state.budget.log],
      stats: {
        totalXP: state.stats.totalXP,
        totalDone: state.stats.totalDone,
      },
    },
    memo: '',
    archivedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    // 기존 데이터 업데이트 (메모는 유지)
    archiveData.memo = state.monthlyHistory[existingIndex].memo;
    state.monthlyHistory[existingIndex] = archiveData;
  } else {
    // 새로 추가
    state.monthlyHistory.unshift(archiveData);
  }

  // 최대 24개월만 보관 (2년)
  if (state.monthlyHistory.length > 24) {
    state.monthlyHistory = state.monthlyHistory.slice(0, 24);
  }

  saveData();
  console.log(`월별 데이터 아카이빙 완료: ${year}년 ${month}월`);
}

/**
 * 특정 월 히스토리 조회
 */
function getMonthlyHistory(year, month) {
  return state.monthlyHistory.find(h => h.year === year && h.month === month);
}

/**
 * 월별 메모 저장
 */
function saveMonthlyMemo(year, month, memo) {
  const history = state.monthlyHistory.find(h => h.year === year && h.month === month);
  if (history) {
    history.memo = memo;
    saveData();
    renderMonthlyHistory();
  }
}

/**
 * 카드 실적 초기화 (매월 1일)
 */
function resetCardSpending() {
  state.budget.cardSpending = 0;
  saveData();
}

/**
 * 월별 히스토리 렌더링
 */
function renderMonthlyHistory() {
  const container = document.getElementById('history-list');
  if (!container) return;

  container.innerHTML = '';

  if (state.monthlyHistory.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📅</div>
        아직 히스토리가 없습니다
      </div>`;
    return;
  }

  state.monthlyHistory.forEach(h => {
    const div = document.createElement('div');
    div.className = 'history-item';

    const totalIncome = h.data.log.filter(l => l.type === 'income').reduce((sum, l) => sum + l.amount, 0);
    const totalExpense = h.data.log.filter(l => l.type === 'expense').reduce((sum, l) => sum + l.amount, 0);
    const totalSaving = h.data.log.filter(l => l.type === 'saving').reduce((sum, l) => sum + l.amount, 0);

    div.innerHTML = `
      <div class="history-header">
        <div class="history-date">${h.year}년 ${h.month}월</div>
        <div class="history-balance">잔액: ₩${h.data.balance.toLocaleString()}</div>
      </div>
      <div class="history-summary">
        <div class="history-summary-item income">수입: ₩${totalIncome.toLocaleString()}</div>
        <div class="history-summary-item expense">지출: ₩${totalExpense.toLocaleString()}</div>
        <div class="history-summary-item saving">저축: ₩${totalSaving.toLocaleString()}</div>
        <div class="history-summary-item card">카드실적: ₩${h.data.cardSpending.toLocaleString()}</div>
      </div>
      <div class="history-memo">
        <textarea 
          class="history-memo-input" 
          placeholder="이번 달 메모를 남겨보세요..."
          data-year="${h.year}" 
          data-month="${h.month}"
        >${h.memo}</textarea>
        <button class="history-memo-save vr-btn btn-secondary" data-year="${h.year}" data-month="${h.month}">
          메모 저장
        </button>
      </div>
      <button class="history-detail-btn" data-year="${h.year}" data-month="${h.month}">
        상세 내역 보기
      </button>
    `;

    container.appendChild(div);
  });

  // 메모 저장 이벤트
  container.querySelectorAll('.history-memo-save').forEach(btn => {
    btn.addEventListener('click', e => {
      const year = parseInt(e.target.dataset.year);
      const month = parseInt(e.target.dataset.month);
      const textarea = container.querySelector(`textarea[data-year="${year}"][data-month="${month}"]`);
      if (textarea) {
        saveMonthlyMemo(year, month, textarea.value);
        alert('메모가 저장되었습니다!');
      }
    });
  });

  // 상세 내역 보기 이벤트
  container.querySelectorAll('.history-detail-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const year = parseInt(e.target.dataset.year);
      const month = parseInt(e.target.dataset.month);
      showHistoryDetail(year, month);
    });
  });
}

/**
 * 히스토리 상세 보기 모달
 */
function showHistoryDetail(year, month) {
  const history = getMonthlyHistory(year, month);
  if (!history) return;

  let html = `
    <div class="modal-overlay" id="history-detail-modal">
      <div class="modal-box" style="max-width:600px;">
        <div class="modal-title">${year}년 ${month}월 상세 내역</div>
        <div class="history-detail-log" style="max-height:400px;overflow-y:auto;">
  `;

  history.data.log.forEach(entry => {
    const typeLabel = entry.type === 'income' ? '수입' : entry.type === 'saving' ? '저축' : '지출';
    const typeClass = entry.type;
    const cardBadge = entry.isCardSpending ? '<span class="card-badge">카드실적</span>' : '';
    
    html += `
      <div class="budget-log-item ${typeClass}" style="margin-bottom:8px;">
        <div class="budget-log-date">${new Date(entry.date).toLocaleDateString()}</div>
        <div class="budget-log-desc">${escapeHtml(entry.desc)} ${cardBadge}</div>
        <div class="budget-log-amount ${typeClass}">
          ${entry.type === 'income' ? '+' : '-'}₩${entry.amount.toLocaleString()}
        </div>
      </div>
    `;
  });

  html += `
        </div>
        <button class="vr-btn btn-secondary" style="margin-top:12px;width:100%;" 
          onclick="document.getElementById('history-detail-modal').remove()">닫기</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
}

