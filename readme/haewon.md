# zipai 부동산 Q&A 게시판 작업 내역

## 1. 개요

- **목표:** zipai 부동산 플랫폼의 Q&A 게시판(목록, 상세, 쓰기/수정) 화면 3종 제작
- **위치 (디렉토리 경로):** 첨부하신 폴더 구조 이미지 기준 `board(김해원)` 폴더에 해당하는 `templates/board/` 에 생성
- **기술 스택:** HTML5, CSS3, Vanilla JavaScript, Bootstrap 5, FontAwesome

## 2. 작업 파일 및 화면 설명

### 1) 목록 페이지 (`qna.html`)

- **구성 요소:** 게시글 번호, 제목(댓글 수 표시), 작성자, 작성일, 조회수
- **기능 UI:**
  - 상단에 게시물 총 갯수와 검색창 배치
  - Bootstrap의 Table 요소를 활용하여 깔끔한 리스트 구성 (공지사항은 상단 고정 스타일 적용)
  - 하단에 페이지네이션(Paging)과 [글쓰기] 버튼 배치

### 2) 상세 페이지 (`qna_detail.html`)

- **구성 요소:** 제목, 작성자, 작성일시, 조회수, 본문 영역
- **기능 UI:**
  - 본문 하단에 [목록으로], [수정], [삭제] 버튼 배치 (수정/삭제는 작성자 본인 및 관리자 권한용 UI)
  - 하단에 댓글 리스트(작성자, 날짜, 내용) 및 댓글 입력 폼(Textarea + 등록 버튼) 구성

### 3) 작성/수정 페이지 (`write.html`)

- **구성 요소:** 제목 입력, 내용 입력(Textarea), 파일 첨부
- **기능 UI:**
  - 게시글 등록 및 취소 버튼 배치
  - (차후 WYSIWYG 에디터 연동을 대비하여 넓은 Textarea 확보)

## 3. UI/UX 스크립트 및 디자인 (`board.css`, `board.js`)

- **디자인 연동:** 이전 헤더/푸터 작업과 일관성을 유지하기 위해 `common.css`의 변수(`--primary-color`, `--accent-color`)를 불러와 활용했습니다.
- **자바스크립트 흐름 (Frontend 동작):**
  - **게시글 등록:** 제목, 내용 미입력 시 `alert` 경고 후, 정상 입력 시 "성공적으로 등록되었습니다." 메시지와 함께 `qna.html`로 리다이렉트 됩니다.
  - **게시글 삭제:** 삭제 버튼 클릭 시 `confirm` 창으로 재확인을 거칩니다.
  - **댓글 등록:** 내용 미입력 방지 검증을 추가했습니다.

## 4. 디렉토리 구조

```
📦 zipai_board_project
 ┣ 📂 templates
 ┃ ┗ 📂 board
 ┃   ┣ 📜 qna.html
 ┃   ┣ 📜 qna_detail.html
 ┃   ┗ 📜 write.html
 ┣ 📂 static
 ┃ ┣ 📂 css
 ┃ ┃ ┣ 📜 common.css
 ┃ ┃ ┗ 📜 board.css
 ┃ ┗ 📂 js
 ┃   ┗ 📜 board.js
 ┗ 📂 docs
   ┗ 📜 board_work_summary.md
```
