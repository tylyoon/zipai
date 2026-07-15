# ZipAI 안전도 페이지 작업 정리

## 구성 파일

- `templates/safety.html`: 안전도 검색, 결과 점수, 지도 히트맵, 상세 지표 섹션을 포함한 전체 HTML 페이지
- `templates/header.html`: ZipAI 공통 상단 메뉴
- `templates/footer.html`: ZipAI 공통 푸터와 사이트맵
- `static/css/common.css`: 색상, 폰트, 공통 컴포넌트, Bootstrap 5 중단점 변수
- `static/css/header.css`: 헤더 전용 스타일
- `static/css/footer.css`: 푸터 전용 스타일과 `common.css` 연결
- `static/css/safety.css`: 안전도 페이지 전용 반응형 스타일
- `static/images/favicon.svg`: ZipAI 파비콘

## 반영 내용

- ZipAI 컬러 규칙을 CSS 변수로 정의했습니다.
- Google Fonts `Inter`, `Noto Sans KR`를 CDN 방식으로 연결했습니다.
- Font Awesome 아이콘 CDN을 사용했습니다.
- Bootstrap 5 CSS CDN과 중단점 기준에 맞춘 반응형 레이아웃을 적용했습니다.
- 모바일에서는 푸터 사이트맵을 숨기고, 주요 콘텐츠를 중앙 정렬했습니다.
- 오른쪽 하단에 맨 위로 이동하는 투더탑 버튼을 추가했습니다.

## UX/UI 방향

- 왼쪽 검색 패널에서 지역 또는 매물을 검색하고 분석 조건을 선택할 수 있습니다.
- 검색 결과는 종합 안전점수와 세부 지표 막대로 바로 확인할 수 있습니다.
- 지도 영역은 안전 우수, 주의 필요, 고위험 구간, CCTV·비상벨을 색상과 아이콘으로 구분했습니다.
- 상세 지표 카드에서 지역안전, 범죄 주의구간, 여성 밤길, 치안시설, 안전 비상벨, CCTV 여부를 빠르게 비교할 수 있습니다.