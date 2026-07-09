document.addEventListener("DOMContentLoaded", function() {
    
    // 글 작성/수정 폼 검증
    const writeForm = document.getElementById("writeForm");
    if (writeForm) {
        writeForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const title = document.getElementById("postTitle").value.trim();
            const content = document.getElementById("postContent").value.trim();

            if (!title) {
                alert("제목을 입력해주세요.");
                return;
            }
            if (!content) {
                alert("내용을 입력해주세요.");
                return;
            }

            alert("게시글이 성공적으로 등록되었습니다.");
            window.location.href = "qna.html"; // 등록 후 목록으로 이동
        });
    }

    // 게시글 삭제 확인
    const btnDelete = document.getElementById("btnDelete");
    if (btnDelete) {
        btnDelete.addEventListener("click", function() {
            if (confirm("정말 이 게시글을 삭제하시겠습니까?")) {
                alert("삭제되었습니다.");
                window.location.href = "qna.html";
            }
        });
    }

    // 댓글 작성
    const commentForm = document.getElementById("commentForm");
    if (commentForm) {
        commentForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const commentInput = document.getElementById("commentInput").value.trim();
            if (!commentInput) {
                alert("댓글 내용을 입력해주세요.");
                return;
            }
            alert("댓글이 등록되었습니다.");
            document.getElementById("commentInput").value = "";
            // 실제 구현시 DOM에 댓글 엘리먼트 추가 로직 구성
        });
    }
});
