function toggleLike() {
  const btn = document.getElementById('likeBtn');
  const countSpan = document.getElementById('likeCount');
  
  // 현재 카운트 값을 숫자로 가져옴
  let currentCount = parseInt(countSpan.textContent);
  
  // 버튼 활성화 여부에 따라 증가/감소 및 스타일 토글
  if (btn.classList.contains('active')) {
    currentCount -= 1; // 1 감소
    btn.classList.remove('active');
  } else {
    currentCount += 1; // 1 증가
    btn.classList.add('active');
  }
  
  // 변경된 값을 화면에 반영
  countSpan.textContent = currentCount;
}