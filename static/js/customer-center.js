(function () {
  'use strict';

  const STORAGE_KEY = 'zipaiDemoInquiries';
  const form = document.getElementById('inquiryForm');
  const list = document.getElementById('inquiryList');
  const empty = document.getElementById('inquiryEmpty');
  const count = document.getElementById('inquiryCount');
  const toast = document.getElementById('customerToast');
  const userMessage = document.getElementById('customerUserMessage');

  if (!form || !list || !empty || !count || !toast) return;

  function readInquiries() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function writeInquiries(items) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (error) { /* 데모 저장이 제한된 환경 */ }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(window.__customerToast);
    window.__customerToast = setTimeout(function () { toast.classList.remove('is-visible'); }, 2400);
  }

  function renderHistory() {
    const items = readInquiries();
    list.replaceChildren();
    count.textContent = items.length;
    empty.hidden = items.length > 0;
    list.hidden = items.length === 0;

    items.slice().reverse().forEach(function (item) {
      const article = document.createElement('article');
      const top = document.createElement('div');
      const category = document.createElement('span');
      const status = document.createElement('span');
      const title = document.createElement('strong');
      const time = document.createElement('time');
      const answer = document.createElement('div');
      article.className = 'inquiry-item';
      top.className = 'inquiry-item-top';
      category.className = 'inquiry-item-category';
      status.className = 'inquiry-item-status';
      category.textContent = item.category;
      status.textContent = item.status;
      title.textContent = item.title;
      time.dateTime = item.createdAt;
      time.textContent = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format(new Date(item.createdAt));
      answer.className = 'inquiry-item-answer';
      answer.textContent = item.reply ? '답변: ' + item.reply : '아직 등록된 답변이 없습니다.';
      answer.classList.toggle('is-pending', !item.reply);
      top.append(category, status);
      article.append(top, title, time, answer);
      list.appendChild(article);
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const items = readInquiries();
    items.push({
      id: Date.now(),
      category: data.get('category'),
      title: String(data.get('title') || '').trim(),
      email: String(data.get('email') || '').trim(),
      message: String(data.get('message') || '').trim(),
      status: '접수 완료',
      createdAt: new Date().toISOString()
    });
    writeInquiries(items);
    form.reset();
    renderHistory();
    showToast('문의가 접수되었습니다. 데모 환경의 브라우저에 저장했어요.');
  });

  if (userMessage && window.ZipaiAuth) {
    const user = window.ZipaiAuth.getUser();
    userMessage.textContent = user ? user.id + '님, 무엇을 도와드릴까요?' : '로그인하면 문의 내역을 같은 브라우저에서 확인할 수 있어요.';
  }

  renderHistory();
})();
