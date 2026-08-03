const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'ZipAI Team';
pptx.subject = 'ZipAI 프로젝트 발표';
pptx.title = 'ZipAI — 청년 주거 의사결정 플랫폼';
pptx.company = 'ZipAI';
pptx.lang = 'ko-KR';
pptx.theme = {
  headFontFace: 'Aptos Display',
  bodyFontFace: 'Aptos',
  lang: 'ko-KR'
};
pptx.defineSlideMaster({
  title: 'MASTER',
  background: { color: 'F7F9FC' },
  objects: [
    { line: { x: 0.6, y: 7.08, w: 12.1, h: 0, line: { color: 'DCE3EC', width: 0.7 } } },
    { text: { text: 'ZipAI', options: { x: 0.65, y: 7.13, w: 1, h: 0.18, fontFace: 'Aptos', fontSize: 8, bold: true, color: '52606D', margin: 0 } } },
    { text: { text: '청년 주거 의사결정 플랫폼', options: { x: 10.4, y: 7.13, w: 2.25, h: 0.18, fontFace: 'Aptos', fontSize: 8, color: '7B8794', align: 'right', margin: 0 } } }
  ],
  slideNumber: { x: 12.72, y: 7.12, w: 0.25, h: 0.2, fontSize: 8, color: '7B8794', align: 'right' }
});

const C = {
  navy: '102A43', blue: '1F6FEB', cyan: '2BB4C8', mint: 'DFF7F1',
  lightBlue: 'EAF2FF', orange: 'FF8A4C', yellow: 'FFF3C4',
  ink: '243B53', muted: '627D98', white: 'FFFFFF', line: 'D9E2EC',
  bg: 'F7F9FC', red: 'E25555', green: '20A779'
};

const img = (...parts) => path.join(__dirname, '..', ...parts);
const hero = img('static', 'images', 'happy-housing-hero-v2.png');
const housing = img('static', 'img', 'properties', 'public-housing.jpg');
const studio = img('static', 'img', 'properties', 'studio.jpg');

function addTitle(slide, kicker, title, subtitle) {
  slide.addText(kicker, { x: 0.7, y: 0.48, w: 2.4, h: 0.24, fontSize: 10, bold: true, color: C.blue, charSpacing: 1.5, margin: 0 });
  slide.addText(title, { x: 0.7, y: 0.8, w: 11.9, h: 0.62, fontSize: 28, bold: true, color: C.navy, breakLine: false, margin: 0, fit: 'shrink' });
  if (subtitle) slide.addText(subtitle, { x: 0.72, y: 1.48, w: 11.6, h: 0.38, fontSize: 13, color: C.muted, margin: 0, fit: 'shrink' });
}

function rounded(slide, x, y, w, h, fill = C.white, line = C.line, r = 0.12) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: r, fill: { color: fill }, line: { color: line, width: 1 } });
}

function pill(slide, text, x, y, w, fill, color = C.navy) {
  slide.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.34, rectRadius: 0.17, fill: { color: fill }, line: { color: fill } });
  slide.addText(text, { x, y: y + 0.055, w, h: 0.17, align: 'center', fontSize: 9, bold: true, color, margin: 0 });
}

function iconCircle(slide, label, x, y, fill, color = C.white, size = 0.48) {
  slide.addShape(pptx.ShapeType.ellipse, { x, y, w: size, h: size, fill: { color: fill }, line: { color: fill } });
  slide.addText(label, { x, y: y + 0.095, w: size, h: 0.2, align: 'center', fontSize: 13, bold: true, color, margin: 0 });
}

function bullets(slide, items, x, y, w, fontSize = 14, color = C.ink, gap = 0.43) {
  items.forEach((item, i) => {
    slide.addShape(pptx.ShapeType.ellipse, { x, y: y + i * gap + 0.1, w: 0.09, h: 0.09, fill: { color: C.blue }, line: { color: C.blue } });
    slide.addText(item, { x: x + 0.22, y: y + i * gap, w: w - 0.22, h: 0.32, fontSize, color, margin: 0, breakLine: false, fit: 'shrink' });
  });
}

function arrow(slide, x, y, w, color = C.blue) {
  slide.addShape(pptx.ShapeType.chevron, { x, y, w, h: 0.34, fill: { color }, line: { color }, rotate: 0 });
}

// 1. Cover
{
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape(pptx.ShapeType.arc, { x: 8.8, y: -1.8, w: 6.1, h: 6.1, adjustPoint: 0.28, rotate: 15, fill: { color: C.navy, transparency: 100 }, line: { color: '2E5D86', transparency: 25, width: 25 } });
  s.addShape(pptx.ShapeType.ellipse, { x: 9.75, y: 4.6, w: 3.8, h: 3.8, fill: { color: C.blue, transparency: 12 }, line: { color: C.blue, transparency: 100 } });
  pill(s, 'PROJECT PRESENTATION', 0.78, 0.75, 2.15, '1D4E78', '9FD7FF');
  s.addText('집을 찾는 순간부터\n계약하는 순간까지', { x: 0.8, y: 1.55, w: 7.6, h: 1.7, fontSize: 34, bold: true, color: C.white, margin: 0, breakLine: false, fit: 'shrink' });
  s.addText('ZipAI', { x: 0.78, y: 3.6, w: 4.0, h: 0.85, fontSize: 52, bold: true, color: '65D6C2', margin: 0 });
  s.addText('청년을 위한 통합 주거 의사결정 플랫폼', { x: 0.82, y: 4.53, w: 6.5, h: 0.38, fontSize: 18, color: 'D9EAF7', margin: 0 });
  s.addText('매물 탐색 · 공공주택 · 계약 안전 · 정책 · 생활권 분석', { x: 0.82, y: 5.15, w: 7.0, h: 0.32, fontSize: 13, color: '9FB3C8', margin: 0 });
  s.addText('2026. 07', { x: 0.82, y: 6.65, w: 1.4, h: 0.24, fontSize: 10, color: '829AB1', margin: 0 });
}

// 2. Problem
{
  const s = pptx.addSlide('MASTER');
  addTitle(s, '01  PROBLEM', '청년의 집 구하기는 하나의 검색 문제가 아닙니다', '정보가 흩어져 있어 탐색, 검증, 정책 확인을 매번 다른 서비스에서 반복해야 합니다.');
  const cards = [
    ['01', '탐색의 분절', '일반 매물과 LH·공공주택 공고가\n서로 다른 채널에 흩어져 있음', C.lightBlue],
    ['02', '계약의 불안', '보증금과 계약 절차의 위험을\n비전문가가 스스로 판단해야 함', 'FFF0EA'],
    ['03', '정책의 복잡성', '대출·주거급여·행복주택 조건이\n공고마다 달라 비교가 어려움', C.mint],
    ['04', '생활권의 미스매치', '가격만으로는 교통·편의시설 등\n실제 거주 적합성을 알기 어려움', C.yellow]
  ];
  cards.forEach((c, i) => {
    const x = 0.75 + i * 3.08;
    rounded(s, x, 2.15, 2.72, 3.55, C.white);
    iconCircle(s, c[0], x + 0.22, 2.4, i === 1 ? C.orange : i === 2 ? C.green : C.blue);
    s.addText(c[1], { x: x + 0.22, y: 3.15, w: 2.25, h: 0.42, fontSize: 18, bold: true, color: C.navy, margin: 0 });
    s.addText(c[2], { x: x + 0.22, y: 3.86, w: 2.26, h: 0.96, fontSize: 12.5, color: C.muted, margin: 0.02, breakLine: false, valign: 'mid' });
    s.addShape(pptx.ShapeType.rect, { x: x + 0.22, y: 5.25, w: 2.18, h: 0.08, fill: { color: c[3] }, line: { color: c[3] } });
  });
  s.addText('→ ZipAI는 “검색”이 아니라 주거 의사결정의 전체 여정을 연결합니다.', { x: 1.4, y: 6.2, w: 10.5, h: 0.38, fontSize: 17, bold: true, color: C.blue, align: 'center', margin: 0 });
}

// 3. Solution journey
{
  const s = pptx.addSlide('MASTER');
  addTitle(s, '02  SOLUTION', '하나의 서비스에서 이어지는 5단계 주거 여정', '사용자의 행동 순서에 맞춰 정보 탐색에서 계약 전 점검까지 연결합니다.');
  const steps = [
    ['1', '매물 탐색', '지도·필터로\n후보 찾기'],
    ['2', '공공주택', 'LH 모집공고\n함께 비교'],
    ['3', '자격·정책', '행복주택·대출\n조건 확인'],
    ['4', '생활권 분석', '교통·편의 요소\n우선순위 비교'],
    ['5', '계약 안전', '체크리스트·\n전세가율 점검']
  ];
  steps.forEach((st, i) => {
    const x = 0.75 + i * 2.48;
    rounded(s, x, 2.4, 2.05, 2.55, i === 0 ? C.lightBlue : C.white, i === 0 ? '9EC5FF' : C.line);
    iconCircle(s, st[0], x + 0.78, 2.72, i === 4 ? C.orange : C.blue);
    s.addText(st[1], { x: x + 0.22, y: 3.5, w: 1.62, h: 0.32, fontSize: 16, bold: true, color: C.navy, align: 'center', margin: 0 });
    s.addText(st[2], { x: x + 0.18, y: 4.05, w: 1.7, h: 0.6, fontSize: 11.5, color: C.muted, align: 'center', margin: 0.01, breakLine: false });
    if (i < 4) arrow(s, x + 2.08, 3.48, 0.35, 'AFC6DB');
  });
  rounded(s, 1.5, 5.6, 10.3, 0.72, C.navy, C.navy);
  s.addText('핵심 가치  |  정보의 통합  ×  판단의 지원  ×  계약 위험의 예방', { x: 1.75, y: 5.82, w: 9.8, h: 0.25, fontSize: 16, bold: true, color: C.white, align: 'center', margin: 0 });
}

// 4. Main screen mock
{
  const s = pptx.addSlide('MASTER');
  addTitle(s, '03  USER EXPERIENCE', '지도와 목록을 함께 보는 매물 탐색', '일반 매물과 공공주택을 구분하고, 조건 변경 결과를 목록·지도에 동시에 반영합니다.');
  rounded(s, 0.72, 2.0, 7.65, 4.55, C.white);
  // app header
  s.addShape(pptx.ShapeType.rect, { x: 0.73, y: 2.01, w: 7.63, h: 0.54, fill: { color: C.navy }, line: { color: C.navy } });
  s.addText('ZipAI', { x: 0.98, y: 2.16, w: 0.8, h: 0.2, fontSize: 15, bold: true, color: '65D6C2', margin: 0 });
  s.addText('매물찾기    안전계약    정책정보    행복주택', { x: 2.0, y: 2.18, w: 3.8, h: 0.18, fontSize: 8.5, color: C.white, margin: 0 });
  // list
  s.addShape(pptx.ShapeType.rect, { x: 0.74, y: 2.55, w: 3.05, h: 3.98, fill: { color: 'F8FAFD' }, line: { color: C.line } });
  pill(s, '일반 매물', 0.96, 2.77, 0.95, C.blue, C.white);
  pill(s, 'LH·공공임대', 2.0, 2.77, 1.22, 'E8EEF5', C.muted);
  [['성남시 분당구 원룸', '보증금 1,000 / 55', studio], ['역세권 투룸', '전세 1억 6,000', housing]].forEach((v, i) => {
    const y = 3.32 + i * 1.43;
    rounded(s, 0.94, y, 2.56, 1.17, C.white);
    if (fs.existsSync(v[2])) s.addImage({ path: v[2], x: 1.04, y: y + 0.1, w: 0.86, h: 0.96, sizing: 'crop' });
    s.addText(v[0], { x: 2.03, y: y + 0.15, w: 1.25, h: 0.24, fontSize: 10.5, bold: true, color: C.ink, margin: 0, fit: 'shrink' });
    s.addText(v[1], { x: 2.03, y: y + 0.49, w: 1.2, h: 0.2, fontSize: 9.5, color: C.blue, bold: true, margin: 0, fit: 'shrink' });
    s.addText('도보 7분 · 옵션 포함', { x: 2.03, y: y + 0.79, w: 1.25, h: 0.18, fontSize: 7.8, color: C.muted, margin: 0 });
  });
  // stylized map
  s.addShape(pptx.ShapeType.rect, { x: 3.8, y: 2.55, w: 4.55, h: 3.98, fill: { color: 'E8F1EA' }, line: { color: C.line } });
  [[4.0,3.1,3.9,0.07],[4.4,5.45,3.5,0.07],[5.1,2.72,0.07,3.5],[7.2,2.75,0.07,3.4]].forEach(a => s.addShape(pptx.ShapeType.line,{x:a[0],y:a[1],w:a[2],h:a[3],line:{color:'FFFFFF',width:8,transparency:5}}));
  [[4.75,3.5,'55'],[6.0,4.2,'1.6억'],[7.35,3.25,'LH'],[5.25,5.25,'48']].forEach((m, i) => {
    s.addShape(pptx.ShapeType.ellipse, { x:m[0], y:m[1], w:0.58, h:0.58, fill:{color:i===2?C.orange:C.blue}, line:{color:C.white,width:2}});
    s.addText(m[2], { x:m[0], y:m[1]+0.18, w:0.58, h:0.16, fontSize:8.5, bold:true, color:C.white, align:'center', margin:0});
  });
  // benefit panel
  rounded(s, 8.72, 2.0, 3.88, 4.55, C.navy, C.navy);
  s.addText('사용자가 얻는 것', { x: 9.08, y: 2.42, w: 3.0, h: 0.38, fontSize: 20, bold: true, color: C.white, margin: 0 });
  bullets(s, ['경기 31개 시·군 단위 검색', '거래 유형·보증금·월세 필터', '매물 상세와 출처 확인', '일반 매물 / 공공주택 전환', '반응형 모바일 UI'], 9.06, 3.18, 3.05, 12.5, 'D9EAF7', 0.54);
}

// 5. Feature ecosystem
{
  const s = pptx.addSlide('MASTER');
  addTitle(s, '04  CORE FEATURES', '탐색 이후의 판단을 돕는 기능 생태계', '단순 매물 플랫폼을 넘어 “이 집에 들어가도 되는가?”에 답하도록 설계했습니다.');
  const features = [
    ['SAFE', '계약 안전', '전세가율 계산기\n단계별 체크리스트\n안전 계약 가이드', C.orange, 'FFF0EA'],
    ['LH', '공공주택 연동', 'LH 공고 조회\n경기 지역 필터\n원문 링크 확인', C.blue, C.lightBlue],
    ['POLICY', '주거 정책', '대출·보증·급여\n신청 준비사항\n공식기관 안내', C.green, C.mint],
    ['AI', '생활권 분석', '교통·편의 비교\n우선순위 입력\n모의 분석 결과', C.cyan, 'E7F8FA']
  ];
  features.forEach((f, i) => {
    const x = 0.75 + i * 3.08;
    rounded(s, x, 2.08, 2.72, 3.85, C.white);
    pill(s, f[0], x + 0.23, 2.34, 0.9, f[4], f[3]);
    s.addText(f[1], { x: x + 0.23, y: 3.08, w: 2.25, h: 0.4, fontSize: 18, bold: true, color: C.navy, margin: 0 });
    s.addText(f[2], { x: x + 0.23, y: 3.8, w: 2.18, h: 1.22, fontSize: 12.5, color: C.muted, breakLine: false, margin: 0.02, valign: 'mid' });
    s.addShape(pptx.ShapeType.line, { x: x + 0.23, y: 5.35, w: 2.16, h: 0, line: { color: f[3], width: 3 } });
  });
  s.addText('각 기능은 공통 헤더와 메뉴로 연결되어 사용자가 주거 여정을 이탈하지 않도록 구성', { x: 1.25, y: 6.35, w: 10.85, h: 0.32, fontSize: 14, bold: true, color: C.ink, align: 'center', margin: 0 });
}

// 6. Happy housing
{
  const s = pptx.addSlide('MASTER');
  addTitle(s, '05  DIFFERENTIATOR', '행복주택 자격을 “읽는 정보”에서 “확인하는 도구”로', '사용자 입력을 공고 조건과 비교해 통과·확인 필요·미충족 상태로 정리합니다.');
  rounded(s, 0.74, 2.0, 5.35, 4.45, C.white);
  if (fs.existsSync(hero)) s.addImage({ path: hero, x: 0.75, y: 2.01, w: 5.33, h: 2.1, sizing: 'crop' });
  s.addText('행복주택 간편 자격진단', { x: 1.08, y: 4.38, w: 3.8, h: 0.4, fontSize: 21, bold: true, color: C.navy, margin: 0 });
  s.addText('신청 계층 · 나이 · 무주택 · 소득 · 자산 · 거주지 조건을 단계적으로 입력', { x: 1.08, y: 5.02, w: 4.4, h: 0.56, fontSize: 12.5, color: C.muted, margin: 0, fit: 'shrink' });
  pill(s, '진단 시작', 1.08, 5.78, 1.3, C.blue, C.white);
  const results = [
    ['통과', '무주택 요건', C.green, C.mint],
    ['확인 필요', '소득 기준', C.orange, 'FFF0EA'],
    ['미충족', '자산 기준', C.red, 'FDECEC']
  ];
  results.forEach((r, i) => {
    rounded(s, 6.6, 2.0 + i * 1.25, 5.98, 0.98, C.white);
    pill(s, r[0], 6.9, 2.3 + i * 1.25, 1.05, r[3], r[2]);
    s.addText(r[1], { x: 8.25, y: 2.28 + i * 1.25, w: 1.55, h: 0.24, fontSize: 14, bold: true, color: C.ink, margin: 0 });
    s.addText(i === 0 ? '현재 입력 기준 충족' : i === 1 ? '공고별 기준 확인 필요' : '입력값이 기준을 초과', { x: 9.8, y: 2.3 + i * 1.25, w: 2.35, h: 0.22, fontSize: 10.5, color: C.muted, align: 'right', margin: 0 });
  });
  rounded(s, 6.6, 5.78, 5.98, 0.67, C.navy, C.navy);
  s.addText('공식 자격 판정이 아닌 사전 점검 도구', { x: 6.95, y: 5.99, w: 5.28, h: 0.23, fontSize: 13.5, bold: true, color: C.white, align: 'center', margin: 0 });
}

// 7. Architecture
{
  const s = pptx.addSlide('MASTER');
  addTitle(s, '06  TECHNOLOGY', '가벼운 구조로 외부 데이터와 정적 UI를 연결', '별도 프레임워크 없이 HTML·CSS·JavaScript와 Node.js 내장 모듈로 구현했습니다.');
  const boxes = [
    [0.75, 2.45, 2.55, 2.55, 'CLIENT', 'HTML · CSS · JS', ['반응형 UI', '지도·필터', 'localStorage'], C.lightBlue, C.blue],
    [5.38, 2.45, 2.55, 2.55, 'SERVER', 'Node.js', ['정적 파일 제공', 'API 중계', '오류·캐시 처리'], C.mint, C.green],
    [10.0, 1.95, 2.55, 1.6, 'DATA', '관리자 Excel', ['10건 시연 매물'], C.yellow, C.orange],
    [10.0, 4.12, 2.55, 1.6, 'EXTERNAL', '공공데이터포털', ['LH 모집공고 API'], 'FFF0EA', C.red]
  ];
  boxes.forEach(b => {
    rounded(s, b[0], b[1], b[2], b[3], C.white);
    pill(s, b[4], b[0]+0.22, b[1]+0.24, 0.9, b[7], b[8]);
    s.addText(b[5], { x:b[0]+0.22,y:b[1]+0.84,w:b[2]-0.44,h:0.36,fontSize:18,bold:true,color:C.navy,margin:0,fit:'shrink'});
    const lines = b[6] instanceof Array ? b[6] : [];
    lines.forEach((t,j)=>s.addText('• '+t,{x:b[0]+0.24,y:b[1]+1.4+j*0.34,w:b[2]-0.45,h:0.22,fontSize:10.5,color:C.muted,margin:0}));
  });
  arrow(s, 3.62, 3.5, 1.35, C.blue);
  s.addText('fetch / JSON', { x:3.65,y:3.15,w:1.25,h:0.18,fontSize:9,color:C.muted,align:'center',margin:0});
  arrow(s, 8.25, 2.63, 1.32, C.orange);
  arrow(s, 8.25, 4.75, 1.32, C.orange);
  s.addText('/api/general-properties', { x:7.9,y:2.25,w:1.7,h:0.2,fontSize:8.5,color:C.muted,align:'center',margin:0});
  s.addText('/api/public-housing', { x:7.95,y:4.38,w:1.65,h:0.2,fontSize:8.5,color:C.muted,align:'center',margin:0});
  rounded(s, 2.55, 5.75, 7.9, 0.64, 'EEF3F8', 'EEF3F8');
  s.addText('서비스 키는 서버에서만 관리  ·  LH 응답은 10분 캐시  ·  Excel ZIP/XML 직접 파싱', { x:2.85,y:5.95,w:7.3,h:0.22,fontSize:12,bold:true,color:C.ink,align:'center',margin:0});
}

// 8. Implementation footprint
{
  const s = pptx.addSlide('MASTER');
  addTitle(s, '07  IMPLEMENTATION', '프로젝트를 구성하는 주요 모듈', '화면별 CSS·JavaScript를 분리하고, 공통 UI와 데이터 접근을 연결했습니다.');
  const rows = [
    ['index.html', '메인 지도·매물 목록·카테고리 전환', 'ENTRY'],
    ['server.js', '정적 서버, Excel 변환, LH API 중계', 'BACKEND'],
    ['static/js/home.js', '검색·필터·매물 렌더링·등록', 'FRONTEND'],
    ['templates/defense/*', '체크리스트·계산기·계약 가이드', 'SAFETY'],
    ['templates/board/*', '정책·행복주택·고객센터', 'CONTENT'],
    ['templates/ai/*', '생활권 입력과 모의 분석', 'AI UX']
  ];
  rows.forEach((r, i) => {
    const y = 2.05 + i * 0.7;
    if (i % 2 === 0) s.addShape(pptx.ShapeType.roundRect, { x:0.75,y,w:11.85,h:0.54,rectRadius:0.08,fill:{color:'EEF3F8'},line:{color:'EEF3F8'}});
    pill(s, r[2], 0.95, y+0.1, 1.05, r[2]==='BACKEND'?C.mint:C.lightBlue, r[2]==='BACKEND'?C.green:C.blue);
    s.addText(r[0], { x:2.3,y:y+0.14,w:3.1,h:0.22,fontSize:12.5,bold:true,color:C.navy,margin:0,fit:'shrink'});
    s.addText(r[1], { x:5.55,y:y+0.14,w:6.35,h:0.22,fontSize:12.5,color:C.muted,margin:0,fit:'shrink'});
  });
  rounded(s, 0.75, 6.35, 11.85, 0.42, C.navy, C.navy);
  s.addText('의존성 최소화  |  Node.js 18+에서 node server.js 한 줄로 실행', { x:1.1,y:6.46,w:11.1,h:0.17,fontSize:11.5,bold:true,color:C.white,align:'center',margin:0});
}

// 9. Limits and roadmap
{
  const s = pptx.addSlide('MASTER');
  addTitle(s, '08  NEXT STEP', '프로토타입에서 실제 서비스로 가기 위한 로드맵', '현재 한계를 명확히 정의하고 데이터·신뢰·운영 순서로 확장합니다.');
  const left = [
    ['브라우저 저장 중심', '회원·매물·문의 데이터가 서버 DB에 영속화되지 않음'],
    ['모의 인증', '로그인·관리자 권한이 실제 보안 인증 구조가 아님'],
    ['부분 자동화', '주소 좌표 변환과 공고별 자격 조건 수집이 제한적'],
    ['검증 범위', '매물 소유·중개사 자격·허위매물 여부를 검증하지 않음']
  ];
  rounded(s, 0.75, 2.0, 5.75, 4.65, 'FFF8F4', 'F5D6C5');
  s.addText('현재 한계', { x:1.08,y:2.35,w:1.5,h:0.34,fontSize:20,bold:true,color:C.orange,margin:0});
  left.forEach((a,i)=>{
    s.addText(a[0],{x:1.08,y:3.0+i*0.78,w:1.45,h:0.22,fontSize:12,bold:true,color:C.ink,margin:0,fit:'shrink'});
    s.addText(a[1],{x:2.65,y:2.98+i*0.78,w:3.3,h:0.38,fontSize:10.8,color:C.muted,margin:0,fit:'shrink'});
  });
  rounded(s, 6.82, 2.0, 5.78, 4.65, C.white);
  s.addText('확장 로드맵', { x:7.16,y:2.35,w:1.8,h:0.34,fontSize:20,bold:true,color:C.blue,margin:0});
  const road = [
    ['01', '데이터 기반', 'DB·서버 인증·파일 저장소'],
    ['02', '신뢰 강화', '중개사/매물 검증·신고/제재'],
    ['03', '자동화', '주소 지오코딩·공고 조건 수집'],
    ['04', '운영 품질', 'API 모니터링·접근성·모바일 테스트']
  ];
  road.forEach((r,i)=>{
    iconCircle(s,r[0],7.16,3.02+i*0.75,i===3?C.green:C.blue,C.white,0.42);
    s.addText(r[1],{x:7.78,y:3.02+i*0.75,w:1.25,h:0.22,fontSize:12.5,bold:true,color:C.navy,margin:0});
    s.addText(r[2],{x:9.1,y:3.02+i*0.75,w:2.85,h:0.26,fontSize:11,color:C.muted,margin:0,fit:'shrink'});
    if(i<3)s.addShape(pptx.ShapeType.line,{x:7.37,y:3.45+i*0.75,w:0,h:0.32,line:{color:'AFC6DB',width:2}});
  });
}

// 10. Closing
{
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape(pptx.ShapeType.ellipse, { x: -1.7, y: 4.2, w: 5.2, h: 5.2, fill: { color: '153E63' }, line: { color: '153E63' } });
  s.addShape(pptx.ShapeType.ellipse, { x: 10.2, y: -2.0, w: 5.0, h: 5.0, fill: { color: C.blue, transparency: 22 }, line: { color: C.blue, transparency: 100 } });
  s.addText('ZipAI', { x: 0.8, y: 0.75, w: 2.0, h: 0.55, fontSize: 30, bold: true, color: '65D6C2', margin: 0 });
  s.addText('집을 찾는 서비스에서\n집을 결정하는 서비스로', { x: 1.45, y: 2.15, w: 10.4, h: 1.3, fontSize: 36, bold: true, color: C.white, align: 'center', margin: 0, fit: 'shrink' });
  s.addText('탐색 · 정책 · 생활권 · 안전을 하나의 사용자 여정으로 연결합니다.', { x: 2.2, y: 3.85, w: 8.95, h: 0.45, fontSize: 17, color: 'B7CCE2', align: 'center', margin: 0 });
  rounded(s, 4.48, 5.1, 4.37, 0.76, '153E63', '2E5D86');
  s.addText('THANK YOU  ·  Q&A', { x: 4.8, y: 5.35, w: 3.75, h: 0.24, fontSize: 15, bold: true, color: C.white, align: 'center', margin: 0 });
}

pptx.writeFile({ fileName: path.join(__dirname, 'ZipAI_프로젝트_발표자료.pptx') });
