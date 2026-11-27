export type ProjectCategory = '전체' | '팀 프로젝트' | '개인 프로젝트' | '기획·UX' | '웹 개발';

export interface ProjectSlide {
  image: string;
  alt: string;
  caption: string;
}

export interface ProjectMetricComparison {
  label: string;
  before: string;
  after: string;
  delta: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  teamType: '팀 프로젝트' | '개인 프로젝트';
  categories: Exclude<ProjectCategory, '전체'>[];
  role: string;
  contribution: string;
  impactMetric: string;
  impactValue: string;
  techStack: string[];
  thumbnail: string;
  thumbnailAlt: string;
  slides: ProjectSlide[];
  metricsComparison: ProjectMetricComparison[];
  star: {
    situation: string;
    task: string;
    action: string[];
    result: string;
    troubleshooting: string;
  };
  links: {
    github?: string;
    live?: string;
    docLabel?: string;
  };
}

export type SkillCategory = '전체' | 'Frontend' | 'Tools' | 'Collaboration';

export interface SkillItem {
  id: string;
  name: string;
  category: Exclude<SkillCategory, '전체'>;
  level: '실무 활용 가능' | '프로젝트 경험' | '기초 학습';
  proficiency: number;
  projectContext: string;
  description: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  summary: string;
  details: string[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  category: string;
  title: string;
  organization: string;
  summary: string;
  outcomes: string[];
}

export interface InterviewQAItem {
  id: string;
  question: string;
  answer: string;
}

export const CANDIDATE_PROFILE = {
  name: '김서준',
  englishName: 'Seojun Kim',
  roleTitle: '웹 프론트엔드 · UX 엔지니어 (2026년 2월 졸업 예정)',
  headline: '사용자의 망설임을 줄이고, 지표로 증명하는 웹을 만듭니다.',
  introLines:
    '컴퓨터공학과 인터랙션디자인을 복수전공하며 기능 구현과 사용성 개선을 함께 고민해 왔습니다. ' +
    '추측이 아닌 로그와 사용자 테스트를 근거로 문제를 좁히고, ' +
    '접근성과 반응속도가 검증된 프론트엔드 코드로 팀의 목표 수치를 끌어올립니다.',
  email: 'seojun.kim.dev@example.com',
  github: 'https://github.com/seojunkim-dev',
  blog: 'https://velog.io/@seojunkim',
  linkedin: 'https://linkedin.com/in/seojunkim-dev',
  portraitImage: '/src/assets/images/portrait_candidate_1795763410635.jpg',
  portraitAlt: '네이비 니트와 화이트 셔츠를 착용하고 노트북 파우치를 든 지원자 김서준의 스튜디오 프로필 사진',
  resumePath: '/assets/resume.pdf',
  resumeFileName: '김서준_웹프론트엔드_이력서.pdf',
  lastUpdated: '2026.11',
};

export const HERO_KPIS = [
  {
    id: 'kpi-projects',
    target: 5,
    suffix: '건',
    label: '문제 해결 웹 프로젝트',
    context: '기획부터 배포·회고까지 완주',
  },
  {
    id: 'kpi-team',
    target: 4,
    suffix: '회',
    label: '타 직군 협업 사이클',
    context: '디자이너·백엔드와 애자일 스프린트',
  },
  {
    id: 'kpi-metric',
    target: 38,
    prefix: '+',
    suffix: '%',
    label: '태스크 완료율 개선',
    context: '검색·필터 UX 개편 전후 UT 비교',
  },
];

export const CORE_STRENGTHS = [
  {
    index: '01',
    title: '가설 기반의 UI 문제 정의',
    description:
      '화면 디자인을 바꾸기 전, 사용자가 어느 단계에서 망설이고 이탈하는지 인터뷰와 퍼널 지표로 먼저 원인을 분리합니다.',
  },
  {
    index: '02',
    title: '접근성과 성능 기준을 지키는 구현',
    description:
      '키보드 내비게이션, 4.5:1 이상 명도 대비, 레이아웃 시프트(CLS) 제로를 체크리스트로 삼아 완성도 높은 화면을 작성합니다.',
  },
  {
    index: '03',
    title: '협업 비용을 줄이는 문서화 습관',
    description:
      'API 명세 불일치나 디자인 예외 상태를 이슈 템플릿과 스토리북 단위로 사전 공유해 개발 후반 재작업을 줄입니다.',
  },
];

export const PROBLEM_SOLVING_STEPS = [
  {
    step: '01. 문제 정의',
    title: '관찰과 가설 수립',
    detail: '설문·사용성 테스트(UT)에서 반복되는 병목 구간을 특정하고, 측정 가능한 개선 목표를 문장으로 고정합니다.',
  },
  {
    step: '02. 실행 및 검증',
    title: '최소 단위 프로토타입 구현',
    detail: '핵심 인터랙션을 반응형 UI로 빠르게 구현한 뒤, 동일 조건의 사용자 재테스트로 실제 행동 변화를 검증합니다.',
  },
  {
    step: '03. 회고 및 수치화',
    title: '성과 기록과 코드 정제',
    detail: '태스크 소요 시간·이탈률 변화를 기록으로 남기고, 트러블슈팅 과정을 블로그와 README에 자산화합니다.',
  },
];

export const ABOUT_TIMELINE: TimelineItem[] = [
  {
    id: 'tl-univ',
    period: '2020.03 – 2026.02 (예정)',
    title: '한양대학교 컴퓨터소프트웨어학부 / 인터랙션디자인 연계전공',
    organization: '학점 4.12 / 4.5 (전공 4.24)',
    summary: '자료구조·운영체제 등 CS 기초 위에 인간-컴퓨터 상호작용(HCI)과 UI 설계 원칙을 결합해 학습했습니다.',
    details: [
      '웹애플리케이션개발, 인간-컴퓨터상호작용(HCI), 데이터베이스시스템 수강 및 우수 프로젝트 선정',
      '교내 SW 중심대학 산학연계 캡스톤 디자인 장려상 수상 (2025.11)',
    ],
  },
  {
    id: 'tl-club',
    period: '2024.03 – 2025.08',
    title: '교내 IT 서비스 연합 동아리 프론트엔드 파트장',
    organization: 'Prography / 교내 웹 개발 학회',
    summary: '기획자·디자이너·백엔드 개발자와 함께 6주 단위 서비스 런칭 프로젝트를 3회 리딩했습니다.',
    details: [
      '신입 기수 대상 TypeScript·React 상태 관리 세미나 4회 진행 및 코드 리뷰 가이드 수립',
      '공통 모달·토스트·폼 검증 유틸리티를 템플릿화하여 팀 초기 세팅 시간 40% 단축',
    ],
  },
  {
    id: 'tl-intern',
    period: '2025.07 – 2025.08',
    title: '에듀테크 스타트업 프론트엔드 인턴 (하계 현장실습)',
    organization: '(주)러닝브릿지 제품개발팀',
    summary: '학습 대시보드 모바일 반응형 개편과 접근성 개선 태스크를 담당해 실무 배포 사이클을 경험했습니다.',
    details: [
      '모바일 뷰포트(375px)에서 깨지던 학습 진도 표를 반응형 카드 뷰로 전환해 CS 문의를 주 12건에서 2건으로 감소',
      'GitHub PR 템플릿 및 Lighthouse CI 체크 도입으로 머지 전 접근성 회귀 오류 사전 차단',
    ],
  },
];

export const INTERVIEW_QA: InterviewQAItem[] = [
  {
    id: 'qa-conflict',
    question: '디자이너나 백엔드 개발자와 스펙 의견이 충돌할 때 어떻게 조율하나요?',
    answer:
      '선호나 직관 대신 "개발 공수 대비 사용자 이탈 감소 효과"와 "예외 케이스 재현 화면"을 기준으로 대화합니다. 실제로 CampusMate 당시 백엔드 검색 응답 지연이 예상되었을 때, 서버 쿼리 변경을 무리하게 요구하는 대신 클라이언트 150ms 디바운스와 학수번호 프리픽스 캐싱을 제안해 일정을 지키면서 체감 속도를 확보했습니다.',
  },
  {
    id: 'qa-priority',
    question: '일정이 촉박한 프로젝트에서 코드 품질과 구현 속도 중 무엇을 우선하나요?',
    answer:
      '사용자 눈에 직접 닿는 핵심 경로(폼 검증, 키보드 닫기, 에러 복구)의 안정성은 타협하지 않고, 부가적인 애니메이션이나 관리자 기능은 후순위로 분리합니다. 재사용 UI(모달·토스트)를 초기에 규격화해 두면 후반부 속도도 함께 빨라진다는 점을 여러 팀 프로젝트로 체감했습니다.',
  },
  {
    id: 'qa-goal',
    question: '신입으로 입사 후 첫 3개월 동안 팀에 어떻게 기여할 수 있나요?',
    answer:
      '기존 디자인 시스템과 코드 컨벤션을 빠르게 익힌 뒤, CS 문의나 QA에서 반복 보고되는 반응형 깨짐·폼 예외 처리·접근성 이슈를 먼저 정리하며 신뢰를 쌓겠습니다. 이후 주요 퍼널의 이벤트 로깅과 UI 개선 실험에 적극 참여해 팀 지표에 기여하고 싶습니다.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-01',
    title: 'CampusMate — 전공 서적·필기 공유 마켓플레이스',
    subtitle: '학수번호 자동완성과 필터 URL 동기화로 탐색 이탈을 줄인 교내 학습 거래 플랫폼',
    period: '2025.09 – 2025.12',
    teamType: '팀 프로젝트',
    categories: ['팀 프로젝트', '기획·UX', '웹 개발'],
    role: '프론트엔드 리드 & 검색 UX 개선',
    contribution: '기여도 45% (4인 팀: 기획 1, 디자인 1, 프론트 2)',
    impactMetric: '검색-요청 전환율 +38%',
    impactValue: '전환율 +38% · 응답 120ms',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    thumbnail: '/src/assets/images/project_campus_market_1795763411104.jpg',
    thumbnailAlt: 'CampusMate 전공 서적 및 학습 자료 공유 웹 플랫폼 메인 화면 노트북 목업',
    slides: [
      {
        image: '/src/assets/images/project_campus_market_1795763411104.jpg',
        alt: 'CampusMate 메인 마켓플레이스 및 학수번호 검색 화면',
        caption: '01. 학수번호 자동완성과 즉시 필터링이 적용된 메인 탐색 화면',
      },
      {
        image: '/src/assets/images/project_accessibility_audit_1795763412544.jpg',
        alt: 'CampusMate 디자인 토큰 및 명도 대비 검증 화면',
        caption: '02. 모바일·태블릿 대응을 위해 통일한 컴포넌트 토큰 및 대비 검증표',
      },
    ],
    metricsComparison: [
      { label: '검색 → 거래 요청 전환율', before: '34%', after: '47%', delta: '+38% 개선' },
      { label: '원하는 교재 탐색 소요 시간', before: '4분 10초', after: '1분 25초', delta: '-66% 단축' },
      { label: '오탈자·빈 검색 결과 비율', before: '28%', after: '6%', delta: '-22%p 감소' },
    ],
    star: {
      situation:
        '교내 커뮤니티 게시글 기반의 중고 전공 서적 거래는 매 학기 초 게시물이 폭주해 원하는 학수번호 교재를 찾는 데 평균 4분 이상이 소요되고, 거래 완료 글이 섞여 헛걸음하는 문제가 발생했습니다.',
      task:
        '재학생 24명 대상 UT 결과 검색 후 상세 진입 단계에서 52%가 이탈함을 확인했고, "검색 입력부터 거래 요청 클릭까지의 이탈률을 30% 이상 낮추는 것"을 핵심 과제로 설정했습니다.',
      action: [
        '학과·학수번호·교수명 복합 키워드를 150ms 디바운스로 즉시 추천하는 자동완성 드롭다운을 구현해 오탈자 검색 실패를 차단했습니다.',
        '선택한 필터(전공, 상태, 거래가능 여부)를 URL 쿼리스트링과 동기화해 뒤로 가기 시 검색 조건이 초기화되던 문제를 해결했습니다.',
        '거래 가능 상품 우선 정렬과 이미지 지연 로딩(Lazy Loading)을 적용해 초기 리스트 렌더링 체감 속도를 개선했습니다.',
      ],
      result:
        '교내 베타 테스트(실사용자 180명) 기준 검색 후 거래 요청 버튼 클릭 전환율이 기존 34%에서 47%로 38%(상대치) 상승했으며, 평균 탐색 소요 시간은 4분 10초에서 1분 25초로 단축되었습니다.',
      troubleshooting:
        '초기 구현 시 필터 상태 변경마다 전체 리스트 이미지가 깜빡이며 재마운트되는 현상이 발생했습니다. React Key 구조를 항목 고유 ID로 고정하고, 필터링 연산을 useMemo로 분리해 불필요한 DOM 재생성을 제거했습니다.',
    },
    links: {
      github: 'https://github.com/seojunkim-dev/campusmate-web',
      live: 'https://campusmate-demo.example.com',
      docLabel: 'UT 결과 및 UX 개선 리포트 포함',
    },
  },
  {
    id: 'proj-02',
    title: 'MetroPulse — 캠퍼스 셔틀·대중교통 혼잡도 대시보드',
    subtitle: '등교 시간대 정류장 대기 불확실성을 줄이는 실시간 도착·우회 경로 비교 웹앱',
    period: '2025.03 – 2025.06',
    teamType: '팀 프로젝트',
    categories: ['팀 프로젝트', '웹 개발'],
    role: '데이터 시각화 UI & 클라이언트 캐싱 구현',
    contribution: '기여도 50% (3인 팀: 백엔드 1, 프론트 2)',
    impactMetric: '대기 오차 4.2분 단축',
    impactValue: '주간 사용자 1,200명',
    techStack: ['TypeScript', 'React', 'Chart.js', 'LocalStorage'],
    thumbnail: '/src/assets/images/project_transit_dashboard_1795763412187.jpg',
    thumbnailAlt: 'MetroPulse 실시간 셔틀 도착 예측 및 시간대별 혼잡도 차트가 표시된 와이드 모니터 화면',
    slides: [
      {
        image: '/src/assets/images/project_transit_dashboard_1795763412187.jpg',
        alt: 'MetroPulse 실시간 도착 정보 및 노선 비교 대시보드',
        caption: '01. 정류장별 도착 예정 시간과 시간대별 혼잡도 추이를 한 화면에 배치한 대시보드',
      },
      {
        image: '/src/assets/images/project_campus_market_1795763411104.jpg',
        alt: 'MetroPulse 모바일 통학 즐겨찾기 화면',
        caption: '02. 출근·등교 시간대 원터치 조회를 위한 즐겨찾기 정류장 고정 기능',
      },
    ],
    metricsComparison: [
      { label: '평균 정류장 대기 예측 오차', before: '6.8분', after: '2.6분', delta: '-4.2분 단축' },
      { label: '주간 활성 사용자(WAU)', before: '신규 런칭', after: '1,200명', delta: '8주 연속 유지' },
      { label: '초기 즐겨찾기 조회 탭 수', before: '4탭', after: '1탭', delta: '조회 동선 75% 축소' },
    ],
    star: {
      situation:
        '오전 8~9시 통학 피크 타임에 학교 셔틀버스 만차로 탑승하지 못하는 학생이 많아, 학생들은 정류장에서 평균 10분 이상 대기하거나 뒤늦게 지하철 환승으로 우회해야 했습니다.',
      task:
        '공공 버스 API와 교내 셔틀 배차 데이터를 결합해 "탑승 가능 여부와 최적 우회 경로를 5초 안에 판단할 수 있는 대시보드"를 모바일 우선(Mobile-first)으로 구축하는 것이 목표였습니다.',
      action: [
        '사용자가 자주 타는 출발지-정류장 조합을 LocalStorage에 고정 저장해 재방문 시 입력 없이 즉시 도착·혼잡도 카드를 노출했습니다.',
        '폴링(Polling) 주기마다 화면 전체가 리렌더링되며 스크롤이 튀는 문제를 막기 위해 숫자 영역에 tabular-nums와 부분 상태 업데이트를 적용했습니다.',
        '공공 API 일시 장애 시 마지막 정상 응답 타임스탬프와 함께 안내 배너를 노출하는 폴백 UI를 구현했습니다.',
      ],
      result:
        '교내 커뮤니티 배포 후 시험기간 포함 8주간 주간 활성 사용자(WAU) 1,200명을 기록했고, 설문 응답자 94명 기준 평균 정류장 대기 예측 오차가 4.2분 감소했습니다.',
      troubleshooting:
        '모바일 LTE 환경에서 15초마다 API를 호출할 때 중복 요청이 겹쳐 오래된 응답이 최신 상태를 덮어쓰는 Race Condition이 발생했습니다. AbortController를 도입해 새 요청 발생 시 이전 미완료 요청을 즉시 취소하도록 수정했습니다.',
    },
    links: {
      github: 'https://github.com/seojunkim-dev/metropulse-dashboard',
      live: 'https://metropulse-demo.example.com',
      docLabel: 'API 폴링 Race Condition 해결 기록',
    },
  },
  {
    id: 'proj-03',
    title: 'CareerTrack — STAR 면접 아카이브 및 지원 현황 트래커',
    subtitle: '취업 준비생의 경험 정리를 구조화해 서류·면접 답변 작성 시간을 줄인 개인 웹 툴',
    period: '2024.11 – 2025.02',
    teamType: '개인 프로젝트',
    categories: ['개인 프로젝트', '기획·UX', '웹 개발'],
    role: '단독 기획 · UI 디자인 · 프론트엔드 개발',
    contribution: '기여도 100% (1인 단독 프로젝트)',
    impactMetric: '작성 시간 45% 절감',
    impactValue: '오프라인 임시저장 100%',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'LocalStorage'],
    thumbnail: '/src/assets/images/project_career_tracker_1795763411379.jpg',
    thumbnailAlt: 'CareerTrack 지원 현황 테이블과 STAR 면접 답변 에디터가 표시된 노트북 화면',
    slides: [
      {
        image: '/src/assets/images/project_career_tracker_1795763411379.jpg',
        alt: 'CareerTrack 지원 기업 목록 및 STAR 에디터 분할 화면',
        caption: '01. 좌측 지원 현황 리스트와 우측 STAR 구조화 에디터를 결합한 2단 작업 공간',
      },
    ],
    metricsComparison: [
      { label: '자소서 문항 초안 작성 시간', before: '120분', after: '65분', delta: '-45% 절감' },
      { label: '면접 에피소드 검색 시간', before: '3분 이상', after: '5초 이내', delta: '태그 연동 필터' },
      { label: '임시저장 데이터 유실 건수', before: '월 2~3회', after: '0건', delta: '300ms 자동 백업' },
    ],
    star: {
      situation:
        '취업 준비 과정에서 기업별 지원 일정은 스프레드시트에, 프로젝트 경험은 노션과 메모장에 흩어져 있어 면접 직전 STAR(상황-과제-행동-결과) 스토리라인을 재조합하는 데 많은 시간이 소모되었습니다.',
      task:
        '별도 회원가입이나 서버 로그인 없이도 브라우저에서 즉시 지원 현황과 STAR 경험 카드를 연결해 관리하고, Markdown/JSON으로 내보낼 수 있는 경량 생산성 도구를 설계했습니다.',
      action: [
        '지원 공고 카드와 경험 태그(협업, 문제해결, 성능개선)를 1:N으로 연결해 면접 질문 키워드 검색 시 관련 에피소드가 즉시 필터링되도록 구현했습니다.',
        '입력 중 브라우저 종료에 대비해 300ms 디바운스 기반 LocalStorage 자동 저장과 복구 알림을 구축했습니다.',
        '작성한 STAR 문서를 클릭 한 번으로 이력서 붙여넣기용 텍스트 및 Markdown 파일로 다운로드할 수 있는 내보내기 모듈을 개발했습니다.',
      ],
      result:
        '본인 및 스터디원 12명이 3개월간 실사용하며 자소서 문항 초안 작성 시간이 평균 2시간에서 1시간 5분으로 약 45% 단축되었고, 모든 데이터가 손실 없이 로컬 백업되었습니다.',
      troubleshooting:
        '시크릿 브라우저나 용량 초과 환경에서 LocalStorage.setItem() 호출 시 앱 전체가 크래시되는 예외를 발견해, 안전한 Storage 래퍼 유틸리티(try-catch + 메모리 폴백 + 사용자 안내)를 작성해 안정성을 확보했습니다.',
    },
    links: {
      github: 'https://github.com/seojunkim-dev/careertrack-star',
      live: 'https://careertrack-demo.example.com',
      docLabel: '기획 의도 및 LocalStorage 설계 문서',
    },
  },
  {
    id: 'proj-04',
    title: 'Accessa UI — 웹 접근성 검증 및 컴포넌트 시스템',
    subtitle: 'WCAG 2.1 AA 명도 대비와 키보드 포커스 규칙을 자동 점검하는 경량 디자인 시스템',
    period: '2024.07 – 2024.09',
    teamType: '개인 프로젝트',
    categories: ['개인 프로젝트', '기획·UX'],
    role: '디자인 시스템 설계 & 접근성 가이드 작성',
    contribution: '기여도 60% (교내 학회 디자인·프론트 공동 작업)',
    impactMetric: 'Lighthouse 접근성 100점',
    impactValue: '24종 컴포넌트 표준화',
    techStack: ['Figma', 'HTML5', 'CSS3', 'JavaScript'],
    thumbnail: '/src/assets/images/project_accessibility_audit_1795763412544.jpg',
    thumbnailAlt: 'Accessa UI 디자인 시스템 컬러 토큰과 명도 대비 계산기가 실행된 태블릿 및 스마트폰 화면',
    slides: [
      {
        image: '/src/assets/images/project_accessibility_audit_1795763412544.jpg',
        alt: 'Accessa UI 컴포넌트 토큰과 실시간 WCAG 명도 대비 체커',
        caption: '01. 태블릿용 UI 가이드라인과 모바일용 실시간 WCAG 2.1 AA 대비율 체커',
      },
    ],
    metricsComparison: [
      { label: 'Lighthouse 접근성 평균 점수', before: '74점', after: '99점', delta: '+25점 향상' },
      { label: '컴포넌트 명도 대비 오류 건수', before: '18건', after: '0건', delta: '4.5:1 100% 충족' },
      { label: '모달 키보드 포커스 누락률', before: '67%', after: '0%', delta: 'ESC/트랩 표준화' },
    ],
    star: {
      situation:
        '동아리 내 여러 팀이 프로젝트를 진행할 때마다 버튼·모달·입력 폼의 포커스 링이 제거되거나 회색 텍스트의 명도 대비가 3:1 미만으로 떨어져 접근성 감점과 모바일 터치 오류가 반복되었습니다.',
      task:
        '디자이너와 개발자가 같은 언어로 소통할 수 있도록 WCAG 2.1 AA 기준(명도 대비 4.5:1, 최소 터치 영역 44px, 포커스 트랩)을 내장한 공통 UI 규격과 실시간 대비율 체커를 제작했습니다.',
      action: [
        'RGB 상대 휘도(Relative Luminance) 계산식을 순수 JavaScript로 구현해 전경색·배경색 HEX 입력 즉시 AA/AAA 통과 여부를 판별하는 웹 체커를 제작했습니다.',
        '모달 다이얼로그 열림 시 배경 스크롤 잠금, `ESC` 키 닫기, 닫힘 후 트리거 요소로의 포커스 복원 패턴을 24개 기본 컴포넌트 스펙으로 문서화했습니다.',
      ],
      result:
        '학회 내 신규 3개 팀 프로젝트에 본 가이드를 적용한 결과, 전 서비스의 Lighthouse Accessibility 점수가 평균 74점에서 98~100점으로 향상되었습니다.',
      troubleshooting:
        '다크 모드 전환 시 기존 단일 색상 변수가 배경과 겹쳐 대비율이 급락하는 문제가 있어, 시맨틱 토큰(surface, ink, border) 2계층 구조로 재설계해 테마별 대비를 일관되게 보장했습니다.',
    },
    links: {
      github: 'https://github.com/seojunkim-dev/accessa-ui-kit',
      live: 'https://accessa-demo.example.com',
      docLabel: 'WCAG 2.1 체크리스트 및 토큰 명세',
    },
  },
  {
    id: 'proj-05',
    title: 'FocusFlow — 팀 스터디 포모도로 & 공유 태스크 보드',
    subtitle: '비대면 스터디원의 집중 시간 동기화와 작업 상태 공유를 돕는 경량 협업 타이머 웹앱',
    period: '2024.03 – 2024.06',
    teamType: '팀 프로젝트',
    categories: ['팀 프로젝트', '웹 개발'],
    role: '타이머 상태 동기화 & 칸반 UI 인터랙션 개발',
    contribution: '기여도 40% (3인 팀: 기획·디자인 1, 프론트 2)',
    impactMetric: '세션 완주율 +29%',
    impactValue: '타이머 오차 < 50ms',
    techStack: ['React', 'TypeScript', 'Web Audio API', 'CSS Grid'],
    thumbnail: '/src/assets/images/project_studysync_collab_1795768126392.jpg',
    thumbnailAlt: 'FocusFlow 팀 스터디용 포모도로 타이머와 공유 칸반 태스크 보드가 실행된 노트북 화면',
    slides: [
      {
        image: '/src/assets/images/project_studysync_collab_1795768126392.jpg',
        alt: 'FocusFlow 포모도로 타이머 및 3단 공유 태스크 보드 화면',
        caption: '01. 25분 집중 타이머와 팀원별 To-Do / In Progress / Completed 보드 통합 UI',
      },
    ],
    metricsComparison: [
      { label: '25분 집중 세션 완주율', before: '62%', after: '80%', delta: '+29% 상대 개선' },
      { label: '백그라운드 탭 시간 오차', before: '최대 14초', after: '50ms 이내', delta: '타임스탬프 보정' },
      { label: '세션당 태스크 완료 수', before: '1.4개', after: '2.3개', delta: '+64% 증가' },
    ],
    star: {
      situation:
        '비대면 화상 스터디 진행 시 참여자마다 개인 타이머와 할 일 메모가 따로 돌아 휴식 시간과 집중 시작 시점이 어긋나고 중도 이탈이 잦았습니다.',
      task:
        '브라우저 백그라운드 탭에서도 타이머 오차가 발생하지 않으면서, 한 화면에서 타이머와 3단 태스크 보드 상태를 즉시 전환할 수 있는 협업 웹앱을 개발했습니다.',
      action: [
        '단순 `setInterval` 카운트다운 대신 시작 시점의 `Date.now()` 종료 예정 타임스탬프를 기준으로 남은 시간을 계산해 브라우저 스로틀링 오차를 제거했습니다.',
        '할 일 카드의 상태 이동(예정 → 진행 중 → 완료)을 키보드 단축키와 클릭 버튼 양방향으로 지원해 드래그 앤 드롭이 불편한 트랙패드 환경에서도 빠르게 조작할 수 있게 했습니다.',
      ],
      result:
        '교내 알고리즘·면접 스터디 4개 그룹(총 28명) 파일럿 운영 결과 25분 세션 완주율이 62%에서 80%로 상승했으며, 세션 종료 알림 오차 50ms 이내를 유지했습니다.',
      troubleshooting:
        '탭 전환 시 브라우저가 백그라운드 타이머 주기를 1초 이상으로 지연시키는 현상이 발견되어, `visibilitychange` 이벤트 시점에 즉시 기준 타임스탬프로 재계산하고 문서 `<title>`에 남은 시간을 동기화해 해결했습니다.',
    },
    links: {
      github: 'https://github.com/seojunkim-dev/focusflow-study',
      live: 'https://focusflow-demo.example.com',
      docLabel: '브라우저 타이머 정밀도 개선 노트',
    },
  },
];

export const SKILLS: SkillItem[] = [
  {
    id: 'sk-react',
    name: 'React & Hooks',
    category: 'Frontend',
    level: '실무 활용 가능',
    proficiency: 90,
    projectContext: 'CampusMate, MetroPulse, CareerTrack 적용',
    description: '커스텀 훅 분리, URL 상태 동기화, 메모이제이션 기반 렌더링 최적화를 구현합니다.',
  },
  {
    id: 'sk-ts',
    name: 'TypeScript',
    category: 'Frontend',
    level: '실무 활용 가능',
    proficiency: 85,
    projectContext: '전 프로젝트 엄격 타입(Strict) 적용',
    description: 'API 응답 스키마와 UI 컴포넌트 Props를 인터페이스로 정의해 런타임 오류를 사전에 차단합니다.',
  },
  {
    id: 'sk-js',
    name: 'JavaScript (ES6+)',
    category: 'Frontend',
    level: '실무 활용 가능',
    proficiency: 90,
    projectContext: 'Accessa UI 대비율 계산기·DOM 제어 구현',
    description: '비동기 처리(AbortController), IntersectionObserver, Clipboard/Storage Web API를 다룹니다.',
  },
  {
    id: 'sk-css',
    name: 'HTML5 · CSS3 · Tailwind',
    category: 'Frontend',
    level: '실무 활용 가능',
    proficiency: 92,
    projectContext: '모바일(375px)~PC(1440px) 반응형 구축',
    description: '시맨틱 마크업, Grid/Flexbox 레이아웃, WAI-ARIA 접근성 속성 및 다크 모드 토큰을 설계합니다.',
  },
  {
    id: 'sk-figma',
    name: 'Figma & 프로토타이핑',
    category: 'Tools',
    level: '프로젝트 경험',
    proficiency: 80,
    projectContext: 'CampusMate UT 와이어프레임 & Accessa UI 제작',
    description: '오토레이아웃과 디자인 토큰을 활용해 디자이너의 시안을 코드 단위로 정확히 번역합니다.',
  },
  {
    id: 'sk-git',
    name: 'Git · GitHub Actions',
    category: 'Tools',
    level: '실무 활용 가능',
    proficiency: 85,
    projectContext: '하계 인턴십 PR 템플릿·CI 체크 도입',
    description: '브랜치 전략, 코드 리뷰, 정적 빌드·린트 자동화로 안전한 팀 배포 파이프라인을 운영합니다.',
  },
  {
    id: 'sk-lh',
    name: 'Lighthouse & DevTools',
    category: 'Tools',
    level: '프로젝트 경험',
    proficiency: 78,
    projectContext: '렌더링 병목·CLS(레이아웃 시프트) 진단',
    description: 'Performance/Accessibility 프로파일링으로 이미지 지연 로딩과 페인트 비용을 개선합니다.',
  },
  {
    id: 'sk-ut',
    name: '사용성 테스트(UT) & 지표 분석',
    category: 'Collaboration',
    level: '프로젝트 경험',
    proficiency: 82,
    projectContext: '재학생 24명 대상 검색 퍼널 UT 진행',
    description: '태스크 시나리오 설계, 이탈 지점 관찰, 전후 전환율 비교 리포트 작성을 수행합니다.',
  },
  {
    id: 'sk-docs',
    name: '이슈 트래킹 & 협업 문서화',
    category: 'Collaboration',
    level: '실무 활용 가능',
    proficiency: 88,
    projectContext: 'Notion·Jira·API 예외 명세 관리',
    description: '백엔드와의 에러 코드 합의 및 QA 체크리스트 관리로 프로젝트 일정 지연을 방지합니다.',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-intern',
    period: '2025.07 – 2025.08',
    category: '인턴십',
    title: '(주)러닝브릿지 제품개발팀 프론트엔드 인턴',
    organization: '하계 현장실습 (8주)',
    summary: '학생용 학습 진도 대시보드의 모바일 반응형 개편 및 웹 접근성 개선 업무를 수행했습니다.',
    outcomes: [
      '375px 모바일 뷰포트 표 깨짐 문제를 카드 리스트 전환 레이아웃으로 해결해 관련 CS 문의 83% 감소',
      '폼 입력 검증 메시지 표준화 및 키보드 탭 순서 정비로 사내 QA 통과율 100% 달성',
    ],
  },
  {
    id: 'exp-award',
    period: '2025.11',
    category: '수상',
    title: 'SW 중심대학 산학연계 캡스톤 디자인 장려상',
    organization: '한양대학교 SW중심대학사업단',
    summary: 'CampusMate 프로젝트의 사용자 이탈률 개선 과정과 정량적 UT 검증 우수성을 인정받아 수상했습니다.',
    outcomes: [
      '총 32개 출전 팀 중 상위 15% 입상 (기획 근거 및 프론트엔드 완성도 부문 최고점)',
    ],
  },
  {
    id: 'exp-cert',
    period: '2024.11 – 2025.06',
    category: '자격 · 어학',
    title: '정보처리기사 · SQLD · OPIc IH 취득',
    organization: '한국산업인력공단 / 한국데이터산업진흥원 / ACTFL',
    summary: '소프트웨어 공학·데이터베이스 이론 검증 및 영문 기술 문서 독해/커뮤니케이션 역량을 갖추었습니다.',
    outcomes: [
      '정보처리기사 최종 합격 (2025.06) / SQL 개발자(SQLD) 합격 (2024.11)',
      'OPIc 영어 IH 등급 취득 (2025.01) — 공식 문서·이슈 트래커 영문 커뮤니케이션 가능',
    ],
  },
];
