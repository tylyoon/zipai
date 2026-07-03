# 홈픽부동산 Footer 작업 문서

## 파일 구조

```text
footer.html
static/
├─ css/
│  ├─ common.css
│  └─ footer.css
└─ images/
   └─ favicon.svg
```

## 구현 내용

- 홈픽부동산 브랜드 CTA, 회사 정보, 사이트맵, 고객센터, 정책 링크, SNS 영역 구성
- 실제 공공 부동산 서비스 5개를 패밀리사이트로 연결
  - 국토교통부 실거래가 공개시스템
  - 대한민국 법원 인터넷등기소
  - HUG 안심전세포털
  - LH 청약플러스
  - 마이홈포털
- 우측 하단 TOP 버튼 및 CSS `scroll-behavior` 적용
- SVG 파비콘 추가
- Font Awesome 6.7.2 CDN 아이콘 사용
- Google Fonts CDN으로 제목용 `IBM Plex Sans KR`, 본문용 `Noto Sans KR` 사용

## 디자인 토큰

`static/css/common.css`에 공통 변수를 정의했다.

- Primary: `#2468e8`
- Navy: `#13284c`
- Sky: `#edf4ff`
- Heading: `IBM Plex Sans KR`
- Body: `Noto Sans KR`

## 반응형 기준

Bootstrap 5 중단점을 그대로 사용했다.

| 구분 | 너비 | 컨테이너 |
|---|---:|---:|
| sm | 576px | 540px |
| md | 768px | 720px |
| lg | 992px | 960px |
| xl | 1200px | 1140px |
| xxl | 1400px | 1320px |

- `767.98px` 이하에서는 사이트맵을 숨긴다.
- 모바일에서는 브랜드, 고객센터, 패밀리사이트 및 회사 정보를 중앙 정렬한다.
- md에서는 패밀리사이트 영역을 전체 폭으로 배치하고 lg부터 3열 레이아웃으로 복귀한다.

## 적용 방법

다른 페이지에 적용할 때 `footer.html`의 `<footer class="homepick-footer">...</footer>`와 TOP 버튼을 옮기고, `<head>`에 다음 리소스를 연결한다.

1. Google Fonts CDN
2. Font Awesome CDN
3. `static/css/footer.css`
4. `static/images/favicon.svg`

`footer.css`에서 `common.css`를 `@import`하므로 페이지에서 `common.css`를 중복 연결할 필요는 없다.

## 실제 운영 전 교체 항목

아래 항목은 회사의 확정 정보로 교체해야 한다.

- 대표자명
- 사업자등록번호
- 통신판매업 신고번호
- 사업장 주소
- 고객센터 연락처와 운영시간
- 이메일, SNS, 약관 링크

# ZipAI 헤더 작업 문서

## 작업 파일

```text
test.html
header.html
headertwo.html
static/
└─ css/
   ├─ header.css
   └─ headertwo.css
```

## 1. 테스트 페이지

`test.html`은 브라우저에서 `hello 코덱스` 문구를 확인할 수 있는 기본 HTML 문서입니다.

## 2. 첫 번째 헤더

### 관련 파일

- `header.html`
- `static/css/header.css`

### 주요 특징

- 기존 ZipAI 푸터와 동일한 파란색 및 네이비 디자인 사용
- `section`, `nav` 태그 대신 `div` 요소로 구조 작성
- Flexbox를 이용한 로고, 메뉴, 버튼 배치
- 매물 찾기, 안전 진단, 전세 계산기, 계약 가이드, 체크리스트 메뉴 제공
- 검색, 로그인, 매물 등록 기능 배치
- 로그인 버튼을 매물 등록 버튼과 같은 크기의 주요 버튼으로 개선
- 화면 너비가 `992px` 미만일 때 햄버거 메뉴로 전환
- 모바일에서 로그인과 매물 등록 버튼을 같은 너비로 표시

### 로그인 버튼 디자인

- 로그인: 흰색 배경과 파란색 테두리
- 매물 등록: 파란색 배경과 흰색 글자
- 마우스를 올리면 색상과 위치가 자연스럽게 변경됨

## 3. 두 번째 헤더

### 관련 파일

- `headertwo.html`
- `static/css/headertwo.css`

### 주요 특징

- 첫 번째 헤더와 다른 차콜, 에메랄드, 코랄 색상 조합
- 매물 검색을 중심으로 한 2단 헤더 구조
- 지역 선택, 검색어 입력, 검색 버튼 제공
- 관심 매물과 로그인 기능 제공
- 아파트, 빌라·주택, 원룸·오피스텔 등 매물 카테고리 제공
- 안전 진단 메뉴에 `NEW` 표시 적용
- 별도의 내 매물 등록 버튼 제공
- `section`, `nav` 태그 없이 `div` 요소와 ARIA 역할 사용
- 전체 레이아웃을 Flexbox 방식으로 구현
- 화면 너비가 `992px` 미만일 때 카테고리를 접이식 메뉴로 전환

## 공통 리소스

두 헤더는 다음 프로젝트 리소스를 함께 사용합니다.

- `static/css/common.css`: 색상, 글꼴, 컨테이너, 반응형 기준
- `static/images/favicon.svg`: 브라우저 파비콘
- Google Fonts: IBM Plex Sans KR, Noto Sans KR
- Font Awesome 6.7.2: 메뉴 및 버튼 아이콘

## 확인 방법

프로젝트 루트에서 `header.html` 또는 `headertwo.html`을 브라우저로 열면 각 헤더를 확인할 수 있습니다.

모바일 메뉴는 브라우저 창의 너비를 `992px` 미만으로 줄인 뒤 오른쪽 메뉴 버튼을 눌러 확인합니다.
