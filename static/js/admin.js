(function () {
  'use strict';

  const STORAGE_KEY = 'zipaiDemoInquiries';
  const auth = window.ZipaiAuth;
  const deniedView = document.querySelector('[data-admin-view="denied"]');
  const adminView = document.querySelector('[data-admin-view="dashboard"]');
  const switchButton = document.getElementById('adminSwitchAccount');
  const logoutButton = document.getElementById('adminLogout');

  if (!auth || !deniedView || !adminView || !switchButton || !logoutButton) return;

  const user = auth.getUser();
  const isAdmin = Boolean(user && user.id === 'admin');
  deniedView.hidden = isAdmin;
  adminView.hidden = !isAdmin;

  switchButton.addEventListener('click', function () {
    auth.logout();
    window.location.href = auth.resolvePage('login.html');
  });
  logoutButton.addEventListener('click', function () {
    auth.logout();
    window.location.href = auth.resolvePage('login.html');
  });

  if (!isAdmin) return;

  const searchInput = document.getElementById('adminSearch');
  const categoryFilter = document.getElementById('adminCategoryFilter');
  const statusFilter = document.getElementById('adminStatusFilter');
  const list = document.getElementById('adminInquiryList');
  const empty = document.getElementById('adminEmpty');
  const resultCount = document.getElementById('adminResultCount');
  const detailEmpty = document.getElementById('adminDetailEmpty');
  const detailContent = document.getElementById('adminDetailContent');
  const statusSelect = document.getElementById('adminDetailStatus');
  const replyMessage = document.getElementById('adminReplyMessage');
  let selectedId = null;

  document.getElementById('adminUserId').textContent = user.id;

  function readItems() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(value) ? value : [];
    } catch (error) { return []; }
  }

  function writeItems(items) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (error) { /* 데모 저장 제한 */ }
  }

  function formatDate(value, withTime) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '-';
    return new Intl.DateTimeFormat('ko-KR', withTime ? { dateStyle: 'medium', timeStyle: 'short' } : { dateStyle: 'medium' }).format(date);
  }

  function filteredItems(items) {
    const query = searchInput.value.trim().toLowerCase();
    return items.filter(function (item) {
      if (categoryFilter.value && item.category !== categoryFilter.value) return false;
      if (statusFilter.value && item.status !== statusFilter.value) return false;
      if (query && ![item.title, item.email, item.message].join(' ').toLowerCase().includes(query)) return false;
      return true;
    }).reverse();
  }

  function updateStats(items) {
    document.getElementById('adminTotalCount').textContent = items.length;
    document.getElementById('adminNewCount').textContent = items.filter(function (item) { return item.status === '접수 완료'; }).length;
    document.getElementById('adminProgressCount').textContent = items.filter(function (item) { return item.status === '답변 준비'; }).length;
    document.getElementById('adminCompleteCount').textContent = items.filter(function (item) { return item.status === '답변 완료'; }).length;
  }

  function renderDetail(items) {
    const item = items.find(function (entry) { return entry.id === selectedId; });
    detailEmpty.hidden = Boolean(item);
    detailContent.hidden = !item;
    if (!item) return;
    document.getElementById('adminDetailCategory').textContent = item.category;
    document.getElementById('adminDetailDate').textContent = formatDate(item.createdAt, true);
    document.getElementById('adminDetailDate').dateTime = item.createdAt;
    document.getElementById('adminDetailTitle').textContent = item.title;
    document.getElementById('adminDetailEmail').textContent = item.email;
    document.getElementById('adminDetailMessage').textContent = item.message;
    replyMessage.value = item.reply || '';
    statusSelect.value = item.status;
  }

  function render() {
    const items = readItems();
    const visible = filteredItems(items);
    updateStats(items);
    list.replaceChildren();
    resultCount.textContent = visible.length + '건';
    empty.hidden = visible.length > 0;
    list.hidden = visible.length === 0;

    visible.forEach(function (item) {
      const button = document.createElement('button');
      const category = document.createElement('span');
      const copy = document.createElement('span');
      const title = document.createElement('strong');
      const meta = document.createElement('small');
      const status = document.createElement('span');
      button.type = 'button';
      button.className = 'admin-inquiry' + (item.id === selectedId ? ' is-active' : '');
      button.dataset.id = item.id;
      category.className = 'admin-inquiry-category';
      copy.className = 'admin-inquiry-copy';
      status.className = 'admin-status';
      category.textContent = item.category;
      title.textContent = item.title;
      meta.textContent = item.email + ' · ' + formatDate(item.createdAt, false);
      status.textContent = item.status;
      status.dataset.status = item.status;
      copy.append(title, meta);
      button.append(category, copy, status);
      list.appendChild(button);
    });
    renderDetail(items);
  }

  list.addEventListener('click', function (event) {
    const button = event.target.closest('[data-id]');
    if (!button) return;
    selectedId = Number(button.dataset.id);
    render();
  });
  [searchInput, categoryFilter, statusFilter].forEach(function (control) {
    control.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', render);
  });
  document.getElementById('adminSaveStatus').addEventListener('click', function () {
    const items = readItems();
    const item = items.find(function (entry) { return entry.id === selectedId; });
    if (!item) return;
    item.status = statusSelect.value;
    writeItems(items);
    render();
  });
  document.getElementById('adminSaveReply').addEventListener('click', function () {
    const reply = replyMessage.value.trim();
    if (!reply) {
      replyMessage.focus();
      replyMessage.setCustomValidity('답변 내용을 입력해 주세요.');
      replyMessage.reportValidity();
      replyMessage.setCustomValidity('');
      return;
    }
    const items = readItems();
    const item = items.find(function (entry) { return entry.id === selectedId; });
    if (!item) return;
    item.reply = reply;
    item.repliedAt = new Date().toISOString();
    item.status = '답변 완료';
    writeItems(items);
    render();
  });
  document.getElementById('adminDeleteInquiry').addEventListener('click', function () {
    if (!selectedId || !window.confirm('이 문의를 삭제할까요?')) return;
    writeItems(readItems().filter(function (item) { return item.id !== selectedId; }));
    selectedId = null;
    render();
  });

  render();
})();
