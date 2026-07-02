(function () {
  'use strict';

  const properties = [
    { id: 101, title: '채광 좋은 봉천역 풀옵션 원룸', deal: 'monthly', type: '원룸', deposit: 1000, monthly: 55, maintenance: 7, area: 19.8, floor: '3층', address: '서울 관악구 봉천동', walk: '봉천역 도보 5분', tags: ['풀옵션','역세권'], options: ['에어컨','세탁기','냉장고','인덕션','엘리베이터','CCTV'], parking: false, elevator: true, pet: false, safe: 91, photos: 8, tone: 1, x: 31, y: 55 },
    { id: 102, title: '서울대입구역 신축 1.5룸', deal: 'monthly', type: '1.5룸', deposit: 3000, monthly: 72, maintenance: 9, area: 27.4, floor: '5층', address: '서울 관악구 봉천동', walk: '서울대입구역 도보 7분', tags: ['신축','분리형','주차'], options: ['에어컨','세탁기','냉장고','붙박이장','엘리베이터','주차'], parking: true, elevator: true, pet: false, safe: 87, photos: 12, tone: 2, x: 46, y: 62 },
    { id: 103, title: '낙성대 조용한 주택가 투룸', deal: 'jeonse', type: '투룸', deposit: 18500, monthly: 0, maintenance: 5, area: 39.6, floor: '2층', address: '서울 관악구 낙성대동', walk: '낙성대역 도보 8분', tags: ['투룸','전세','남향'], options: ['에어컨','가스레인지','신발장','베란다','CCTV'], parking: false, elevator: false, pet: true, safe: 82, photos: 10, tone: 3, x: 60, y: 48 },
    { id: 104, title: '사당역 테라스 오픈형 원룸', deal: 'monthly', type: '원룸', deposit: 2000, monthly: 68, maintenance: 8, area: 23.1, floor: '4층', address: '서울 동작구 사당동', walk: '사당역 도보 6분', tags: ['테라스','풀옵션'], options: ['에어컨','세탁기','냉장고','전자레인지','테라스'], parking: false, elevator: false, pet: true, safe: 78, photos: 7, tone: 4, x: 77, y: 56 },
    { id: 105, title: '신림역 반려동물 가능한 투룸', deal: 'monthly', type: '투룸', deposit: 1500, monthly: 80, maintenance: 10, area: 42.9, floor: '3층', address: '서울 관악구 신림동', walk: '신림역 도보 4분', tags: ['반려동물','투룸','역세권'], options: ['에어컨','세탁기','냉장고','엘리베이터','반려동물'], parking: false, elevator: true, pet: true, safe: 85, photos: 14, tone: 5, x: 17, y: 72 },
    { id: 106, title: '관악구청 앞 깔끔한 원룸 전세', deal: 'jeonse', type: '원룸', deposit: 11000, monthly: 0, maintenance: 6, area: 22.5, floor: '6층', address: '서울 관악구 봉천동', walk: '서울대입구역 도보 9분', tags: ['전세','엘리베이터'], options: ['에어컨','세탁기','냉장고','인덕션','엘리베이터'], parking: false, elevator: true, pet: false, safe: 94, photos: 9, tone: 2, x: 42, y: 40 },
    { id: 107, title: '남부순환로 주차 가능한 쓰리룸', deal: 'jeonse', type: '쓰리룸', deposit: 27000, monthly: 0, maintenance: 0, area: 66.0, floor: '2층', address: '서울 동작구 사당동', walk: '남성역 도보 10분', tags: ['쓰리룸','주차','관리비없음'], options: ['에어컨','가스레인지','베란다','주차','반려동물'], parking: true, elevator: false, pet: true, safe: 73, photos: 16, tone: 3, x: 69, y: 28 },
    { id: 108, title: '샤로수길 감성 복층 1.5룸', deal: 'monthly', type: '1.5룸', deposit: 5000, monthly: 95, maintenance: 12, area: 31.2, floor: '7층', address: '서울 관악구 봉천동', walk: '서울대입구역 도보 3분', tags: ['복층','신축','풀옵션'], options: ['시스템에어컨','세탁기','냉장고','건조기','엘리베이터','주차'], parking: true, elevator: true, pet: false, safe: 89, photos: 18, tone: 4, x: 50, y: 70 },
    { id: 109, title: '보라매공원 인근 분리형 원룸', deal: 'monthly', type: '원룸', deposit: 500, monthly: 48, maintenance: 5, area: 18.2, floor: '2층', address: '서울 관악구 신림동', walk: '신대방역 도보 12분', tags: ['분리형','저렴한월세'], options: ['에어컨','세탁기','냉장고','가스레인지'], parking: false, elevator: false, pet: false, safe: 76, photos: 6, tone: 1, x: 23, y: 34 },
    { id: 110, title: '낙성대역 올수리 투룸 월세', deal: 'monthly', type: '투룸', deposit: 10000, monthly: 45, maintenance: 7, area: 46.2, floor: '3층', address: '서울 관악구 낙성대동', walk: '낙성대역 도보 5분', tags: ['올수리','투룸','남향'], options: ['에어컨','세탁기','냉장고','붙박이장','CCTV'], parking: false, elevator: false, pet: false, safe: 84, photos: 11, tone: 5, x: 63, y: 68 }
  ];

  const state = { deal: 'all', room: 'all', query: '', maxMonthly: 150, maxDeposit: 30000, parking: false, elevator: false, pet: false, safeOnly: false, favoritesOnly: false, sort: 'recommended', selected: null, zoom: 1 };
  let favorites = getStoredFavorites();
  let displayedProperties = properties.slice();

  const app = document.querySelector('.property-app');
  const propertyList = document.getElementById('propertyList');
  const mapMarkers = document.getElementById('mapMarkers');
  const detail = document.getElementById('propertyDetail');
  const filterSheet = document.getElementById('filterSheet');
  const inquiryModal = document.getElementById('inquiryModal');

  function getStoredFavorites() {
    try {
      const data = JSON.parse(localStorage.getItem('zipdosoFavorites') || '[]');
      return Array.isArray(data) ? data.map(Number) : [];
    } catch (error) { return []; }
  }

  function saveFavorites() {
    try { localStorage.setItem('zipdosoFavorites', JSON.stringify(favorites)); } catch (error) { /* local file privacy mode */ }
    document.getElementById('favoriteCount').textContent = favorites.length;
  }

  function money(value) {
    if (value >= 10000) {
      const eok = Math.floor(value / 10000);
      const rest = value % 10000;
      return eok + '억' + (rest ? ' ' + rest.toLocaleString('ko-KR') : '');
    }
    return value.toLocaleString('ko-KR');
  }

  function priceText(property) {
    return property.deal === 'jeonse' ? money(property.deposit) : money(property.deposit) + '/' + property.monthly;
  }

  function dealLabel(property) { return property.deal === 'jeonse' ? '전세' : '월세'; }

  function filteredWith(options) {
    const config = Object.assign({}, state, options || {});
    const query = config.query.trim().toLowerCase();
    let result = properties.filter(function (property) {
      if (config.deal !== 'all' && property.deal !== config.deal) return false;
      if (config.room !== 'all' && property.type !== config.room) return false;
      if (property.deal === 'monthly' && property.monthly > config.maxMonthly) return false;
      if (property.deposit > config.maxDeposit) return false;
      if (config.parking && !property.parking) return false;
      if (config.elevator && !property.elevator) return false;
      if (config.pet && !property.pet) return false;
      if (config.safeOnly && property.safe < 85) return false;
      if (config.favoritesOnly && !favorites.includes(property.id)) return false;
      if (query) {
        const target = [property.title, property.type, property.address, property.walk].concat(property.tags).join(' ').toLowerCase();
        if (!target.includes(query)) return false;
      }
      return true;
    });
    const sorters = {
      lowMonthly: function (a, b) { return (a.monthly || 9999) - (b.monthly || 9999); },
      lowDeposit: function (a, b) { return a.deposit - b.deposit; },
      largeArea: function (a, b) { return b.area - a.area; },
      safe: function (a, b) { return b.safe - a.safe; },
      recommended: function (a, b) { return (b.safe + b.photos / 3) - (a.safe + a.photos / 3); }
    };
    return result.sort(sorters[config.sort] || sorters.recommended);
  }

  function propertyCard(property) {
    const liked = favorites.includes(property.id);
    return '<article class="property-card' + (state.selected === property.id ? ' active' : '') + '" data-id="' + property.id + '" tabindex="0">' +
      '<div class="property-photo tone-' + property.tone + '">' + (property.safe >= 85 ? '<span class="safe-ribbon">안심 ' + property.safe + '</span>' : '') + '<span class="photo-count">▣ ' + property.photos + '</span></div>' +
      '<div class="property-info"><p class="property-type">' + property.type + ' · ' + property.walk + '</p><p class="property-price"><span class="deal-badge ' + property.deal + '">' + dealLabel(property) + '</span>' + priceText(property) + '</p><p class="property-meta">관리비 ' + (property.maintenance ? property.maintenance + '만' : '없음') + ' · ' + property.area + '㎡ · ' + property.floor + '</p><p class="property-address">' + property.address + '</p><p class="property-tags">' + property.tags.map(function (tag) { return '<span>#' + tag + '</span>'; }).join('') + '</p></div>' +
      '<button type="button" class="favorite-button' + (liked ? ' active' : '') + '" data-favorite="' + property.id + '" aria-label="찜하기">' + (liked ? '♥' : '♡') + '</button></article>';
  }

  function render() {
    displayedProperties = filteredWith();
    document.getElementById('listingCount').textContent = displayedProperties.length;
    document.getElementById('sheetResultCount').textContent = displayedProperties.length;
    if (!displayedProperties.length) {
      propertyList.innerHTML = '<div class="empty-list"><span>⌕</span><h2>조건에 맞는 방이 없어요</h2><p>지역이나 상세 조건을 조금 넓혀보세요.</p></div>';
    } else propertyList.innerHTML = displayedProperties.map(propertyCard).join('');
    renderMarkers();
    if (state.selected && !displayedProperties.some(function (item) { return item.id === state.selected; })) closeDetail();
  }

  function renderMarkers() {
    mapMarkers.innerHTML = properties.map(function (property) {
      const visible = displayedProperties.some(function (item) { return item.id === property.id; });
      return '<button type="button" class="map-marker ' + property.deal + (state.selected === property.id ? ' active' : '') + (visible ? '' : ' hidden') + '" style="left:' + property.x + '%;top:' + property.y + '%" data-marker="' + property.id + '" aria-label="' + property.title + '">' + dealLabel(property) + ' ' + priceText(property) + '</button>';
    }).join('');
  }

  function toggleFavorite(id) {
    if (favorites.includes(id)) favorites = favorites.filter(function (value) { return value !== id; });
    else favorites.push(id);
    saveFavorites(); render();
    if (state.selected === id) openDetail(id, false);
    showToast(favorites.includes(id) ? '찜한 매물에 저장했어요.' : '찜한 매물에서 삭제했어요.');
  }

  function openDetail(id, scrollCard) {
    const property = properties.find(function (item) { return item.id === id; });
    if (!property) return;
    state.selected = id;
    const liked = favorites.includes(id);
    document.getElementById('detailContent').innerHTML = '<div class="property-photo detail-hero tone-' + property.tone + '"><span class="photo-count">사진 ' + property.photos + '장</span></div><div class="detail-body">' +
      '<div class="detail-topline"><span class="detail-safe">✓ 집도소 안전점수 ' + property.safe + '</span><button type="button" class="detail-favorite' + (liked ? ' active' : '') + '" data-favorite="' + id + '">' + (liked ? '♥' : '♡') + '</button></div>' +
      '<h2><span class="deal-badge ' + property.deal + '">' + dealLabel(property) + '</span> ' + priceText(property) + '</h2><p class="detail-title">' + property.title + '</p><p class="detail-address">' + property.address + ' · ' + property.walk + '</p>' +
      '<dl class="detail-stats"><div><dt>전용면적</dt><dd>' + property.area + '㎡</dd></div><div><dt>해당 층</dt><dd>' + property.floor + '</dd></div><div><dt>관리비</dt><dd>' + (property.maintenance ? property.maintenance + '만원' : '없음') + '</dd></div></dl>' +
      '<section class="detail-section"><h3>옵션 정보</h3><div class="option-grid">' + property.options.map(function (option) { return '<span>✓ ' + option + '</span>'; }).join('') + '</div></section>' +
      '<section class="detail-section"><h3>보증금 안전 진단</h3><div class="safety-score-box"><span class="safety-score-ring">' + property.safe + '</span><p>기본 권리관계 기준으로 확인했어요.<br><a href="sub33.html">계약 전 정밀 진단하기 →</a></p></div></section></div>' +
      '<div class="detail-actions"><a href="checklist.html">안전 진단</a><button type="button" data-inquiry="' + id + '">방문 상담 신청</button></div>';
    detail.classList.add('open'); detail.setAttribute('aria-hidden', 'false');
    renderMarkers();
    document.querySelectorAll('.property-card').forEach(function (card) { card.classList.toggle('active', Number(card.dataset.id) === id); });
    if (scrollCard) {
      const card = document.querySelector('.property-card[data-id="' + id + '"]');
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function closeDetail() {
    state.selected = null; detail.classList.remove('open'); detail.setAttribute('aria-hidden', 'true'); renderMarkers();
    document.querySelectorAll('.property-card').forEach(function (card) { card.classList.remove('active'); });
  }

  function showToast(message) {
    const toast = document.getElementById('homeToast'); toast.textContent = message; toast.classList.add('show');
    clearTimeout(window.__homeToast); window.__homeToast = setTimeout(function () { toast.classList.remove('show'); }, 2300);
  }

  function openSheet(sheet) { sheet.classList.add('open'); sheet.setAttribute('aria-hidden', 'false'); }
  function closeSheet(sheet) { sheet.classList.remove('open'); sheet.setAttribute('aria-hidden', 'true'); }
  function detailedFilterCount() { return [state.maxMonthly < 150, state.maxDeposit < 30000, state.parking, state.elevator, state.pet, state.safeOnly].filter(Boolean).length; }
  function updateFilterBadge() {
    const count = detailedFilterCount(); const badge = document.getElementById('activeFilterCount'); badge.hidden = count === 0; badge.textContent = count;
  }
  function previewSheetCount() {
    const temp = { maxMonthly: Number(document.getElementById('monthlyRange').value), maxDeposit: Number(document.getElementById('depositRange').value), parking: document.getElementById('parkingFilter').checked, elevator: document.getElementById('elevatorFilter').checked, pet: document.getElementById('petFilter').checked, safeOnly: document.getElementById('safeFilter').checked };
    document.getElementById('sheetResultCount').textContent = filteredWith(temp).length;
  }
  function updateRangeLabels() {
    const monthly = Number(document.getElementById('monthlyRange').value), deposit = Number(document.getElementById('depositRange').value);
    document.getElementById('monthlyValue').textContent = monthly >= 150 ? '제한 없음' : monthly + '만원 이하';
    document.getElementById('depositValue').textContent = deposit >= 30000 ? '제한 없음' : money(deposit) + '만원 이하';
    previewSheetCount();
  }

  propertyList.addEventListener('click', function (event) {
    const favorite = event.target.closest('[data-favorite]'); if (favorite) { event.stopPropagation(); toggleFavorite(Number(favorite.dataset.favorite)); return; }
    const card = event.target.closest('.property-card'); if (card) openDetail(Number(card.dataset.id), false);
  });
  propertyList.addEventListener('keydown', function (event) { if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('.property-card')) { event.preventDefault(); openDetail(Number(event.target.dataset.id), false); } });
  mapMarkers.addEventListener('click', function (event) { const marker = event.target.closest('[data-marker]'); if (marker) openDetail(Number(marker.dataset.marker), true); });
  document.getElementById('detailClose').addEventListener('click', closeDetail);
  detail.addEventListener('click', function (event) {
    const favorite = event.target.closest('[data-favorite]'); if (favorite) toggleFavorite(Number(favorite.dataset.favorite));
    const inquiry = event.target.closest('[data-inquiry]'); if (inquiry) openInquiry(Number(inquiry.dataset.inquiry));
  });

  document.getElementById('dealFilters').addEventListener('click', function (event) {
    const button = event.target.closest('[data-deal]'); if (!button) return;
    state.deal = button.dataset.deal; this.querySelectorAll('[data-deal]').forEach(function (item) { item.classList.toggle('active', item === button); }); render();
  });
  document.getElementById('roomFilter').addEventListener('change', function () { state.room = this.value; render(); });
  document.getElementById('sortSelect').addEventListener('change', function () { state.sort = this.value; render(); });
  document.getElementById('locationSearch').addEventListener('submit', function (event) {
    event.preventDefault(); const input = document.getElementById('searchInput'); state.query = input.value;
    document.getElementById('locationLabel').textContent = input.value.trim() ? '“' + input.value.trim() + '” 검색 결과' : '서울 관악구 주변';
    const loading = document.getElementById('listLoading'); propertyList.hidden = true; loading.hidden = false;
    setTimeout(function () { loading.hidden = true; propertyList.hidden = false; render(); }, 420);
  });

  document.getElementById('openFilterButton').addEventListener('click', function () {
    document.getElementById('monthlyRange').value = state.maxMonthly; document.getElementById('depositRange').value = state.maxDeposit;
    document.getElementById('parkingFilter').checked = state.parking; document.getElementById('elevatorFilter').checked = state.elevator; document.getElementById('petFilter').checked = state.pet; document.getElementById('safeFilter').checked = state.safeOnly;
    updateRangeLabels(); openSheet(filterSheet);
  });
  filterSheet.querySelector('.sheet-close').addEventListener('click', function () { closeSheet(filterSheet); });
  filterSheet.querySelectorAll('input').forEach(function (input) { input.addEventListener('input', updateRangeLabels); });
  document.getElementById('applyFilters').addEventListener('click', function () {
    state.maxMonthly = Number(document.getElementById('monthlyRange').value); state.maxDeposit = Number(document.getElementById('depositRange').value); state.parking = document.getElementById('parkingFilter').checked; state.elevator = document.getElementById('elevatorFilter').checked; state.pet = document.getElementById('petFilter').checked; state.safeOnly = document.getElementById('safeFilter').checked;
    state.favoritesOnly = false; updateFilterBadge(); closeSheet(filterSheet); render();
  });
  document.getElementById('resetFilters').addEventListener('click', function () {
    document.getElementById('monthlyRange').value = 150; document.getElementById('depositRange').value = 30000; filterSheet.querySelectorAll('input[type="checkbox"]').forEach(function (input) { input.checked = false; }); updateRangeLabels();
  });

  document.getElementById('savedHomesButton').addEventListener('click', function () {
    if (!favorites.length) { showToast('아직 찜한 매물이 없어요.'); return; }
    state.favoritesOnly = !state.favoritesOnly; this.classList.toggle('active', state.favoritesOnly); render(); showToast(state.favoritesOnly ? '찜한 매물만 모아볼게요.' : '전체 매물을 보여드려요.');
  });

  document.querySelectorAll('[data-map-mode]').forEach(function (button) { button.addEventListener('click', function () { document.querySelectorAll('[data-map-mode]').forEach(function (item) { item.classList.remove('active'); }); this.classList.add('active'); const canvas = document.getElementById('mapCanvas'); canvas.classList.toggle('district', this.dataset.mapMode === 'district'); canvas.classList.toggle('safe-map', this.dataset.mapMode === 'safe'); if (this.dataset.mapMode === 'safe') showToast('색상은 데모용 동네 안전도예요.'); }); });
  function setZoom(value) { state.zoom = Math.max(1, Math.min(1.22, value)); document.getElementById('mapCanvas').style.transform = 'scale(' + state.zoom + ')'; }
  document.getElementById('zoomIn').addEventListener('click', function () { setZoom(state.zoom + .07); }); document.getElementById('zoomOut').addEventListener('click', function () { setZoom(state.zoom - .07); });
  document.getElementById('searchThisArea').addEventListener('click', function () { const button = this; button.innerHTML = '<span>↻</span> 검색 중'; setTimeout(function () { button.innerHTML = '<span>✓</span> 검색 완료'; render(); setTimeout(function () { button.innerHTML = '<span>↻</span> 현 지도에서 검색'; }, 1200); }, 500); });
  document.getElementById('myLocation').addEventListener('click', function () { setZoom(1.1); showToast('현재 위치를 관악구 중심으로 설정했어요.'); });

  document.querySelectorAll('.mobile-view-switch button').forEach(function (button) { button.addEventListener('click', function () { document.querySelectorAll('.mobile-view-switch button').forEach(function (item) { item.classList.remove('active'); }); this.classList.add('active'); app.classList.toggle('map-view', this.dataset.view === 'map'); }); });

  function openInquiry(id) { const property = properties.find(function (item) { return item.id === id; }); inquiryModal.dataset.id = id; document.getElementById('inquiryPropertyName').textContent = property.title + ' · ' + dealLabel(property) + ' ' + priceText(property); openSheet(inquiryModal); }
  inquiryModal.querySelector('.inquiry-close').addEventListener('click', function () { closeSheet(inquiryModal); });
  document.getElementById('phoneInput').addEventListener('input', function () { const number = this.value.replace(/[^0-9]/g,'').slice(0,11); this.value = number.length > 7 ? number.slice(0,3) + '-' + number.slice(3,7) + '-' + number.slice(7) : number.length > 3 ? number.slice(0,3) + '-' + number.slice(3) : number; });
  document.getElementById('submitInquiry').addEventListener('click', function () { const phone = document.getElementById('phoneInput'); if (phone.value.replace(/[^0-9]/g,'').length < 10) { phone.focus(); showToast('연락받을 휴대폰 번호를 확인해 주세요.'); return; } closeSheet(inquiryModal); phone.value = ''; showToast('데모 상담 신청이 완료됐어요.'); });
  [filterSheet, inquiryModal].forEach(function (sheet) { sheet.addEventListener('click', function (event) { if (event.target === sheet) closeSheet(sheet); }); });
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape') { closeSheet(filterSheet); closeSheet(inquiryModal); closeDetail(); } });
  document.querySelectorAll('[data-demo-link],[data-demo-button]').forEach(function (item) { item.addEventListener('click', function (event) { event.preventDefault(); showToast('이 메뉴는 메인 홈 데모에서 준비 중이에요.'); }); });

  saveFavorites(); render(); updateFilterBadge();
})();
