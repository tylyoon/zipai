# zipai
# Footer UI 제작 문서

## 프로젝트 개요

본 Footer는 HTML5, CSS3, Bootstrap 5를 기반으로 제작되었으며
웹표준(W3C)과 웹접근성(WCAG)을 고려하여 작성되었습니다.

---

# 폴더 구조

```
project
│
├── templates
│   └── common
│       └── footer.html
│
├── static
│   ├── css
│   │   ├── common.css
│   │   └── footer.css
│   │
│   ├── img
│   │   ├── favicon.ico
│   │   └── logo.svg
│   │
│   └── docs
│       └── footer-guide.md
```

---

# 사용 기술

- HTML5
- CSS3
- Bootstrap 5.3
- Font Awesome 6
- Google Font CDN
- Django Template

---

# Google Font

제목

```
Montserrat
```

본문

```
Noto Sans KR
```

---

# Icon

FontAwesome CDN 사용

사용 아이콘

- Headset
- Blog
- Instagram
- Youtube
- KakaoTalk
- Arrow Right
- Clipboard

---

# 공통 CSS

common.css에서는 다음 항목을 관리합니다.

- Color Variables
- Font Variables
- Radius
- Shadow
- Transition
- Reset
- Typography
- Button
- Form
- Utility

모든 색상은 CSS 변수(:root)를 사용합니다.

예)

```css
:root{

    --color-primary:#18345D;

    --color-footer:#1C355E;

}
```

---

# Footer CSS

footer.css에서는

- Footer Layout
- Logo
- Sitemap
- Customer Center
- SNS
- Family Site
- Checklist Card
- Footer Policy
- Company Info
- Copyright
- Responsive

를 관리합니다.

---

# Bootstrap Breakpoint

Bootstrap5 기본 중단점을 사용하였습니다.

| Device | Width |
|----------|----------|
| xs | <576 |
| sm | ≥576 |
| md | ≥768 |
| lg | ≥992 |
| xl | ≥1200 |
| xxl | ≥1400 |

---

# 반응형 처리

## Desktop

좌측

- Logo
- 소개

가운데

- Sitemap

우측

- Family Site
- Checklist

---

## Tablet

사이트맵 너비 축소

카드 세로 배치

---

## Mobile

사이트맵 숨김

```
d-none d-lg-block
```

적용

모든 콘텐츠 중앙 정렬

SNS 가운데 정렬

Family Site

100%

Checklist

100%

---

# 웹 접근성

Semantic Tag 사용

- footer
- nav
- address
- section

적용

aria-label 사용

```html
<a href="#" aria-label="Instagram">
```

alt 제공

```html
<img alt="ZipAi Logo">
```

focus 스타일 적용

```css
a:focus{

    outline:3px solid #4A7CF3;

}
```

---

# 웹표준

HTML5 Validator 통과 가능하도록 작성

CSS3 문법 준수

불필요한 inline style 사용하지 않음

---

# 유지보수

색상 변경

```
common.css
```

만 수정하면 전체 변경됩니다.

폰트 변경

```
--font-title

--font-body
```

만 수정

Footer 레이아웃 수정

```
footer.css
```

에서만 수정

---

# Django 적용

Footer 호출

```django
{% include "common/footer.html" %}
```

정적파일

```django
{% load static %}
```

CSS

```html
<link rel="stylesheet"
href="{% static 'css/common.css' %}">

<link rel="stylesheet"
href="{% static 'css/footer.css' %}">
```

favicon

```html
<link rel="icon"
href="{% static 'img/favicon.ico' %}">
```

---

# 최종 구현

✔ HTML5

✔ CSS3

✔ Bootstrap5

✔ Google Font

✔ FontAwesome

✔ Responsive

✔ Semantic HTML

✔ Accessibility

✔ CSS Variables

✔ External CSS

✔ Django Static

✔ Django Include

✔ Favicon

✔ Bootstrap Grid

✔ Mobile Optimization

---

# 제작자

HomePick Project

Footer UI Version 1.0