(function () {
  'use strict';

  const properties = [
    { id: 101, title: '채광 좋은 봉천역 풀옵션 원룸', deal: 'monthly', type: '원룸', deposit: 1000, monthly: 55, maintenance: 7, area: 19.8, floor: '3층', address: '서울 관악구 봉천동', walk: '봉천역 도보 5분', tags: ['풀옵션','역세권'], options: ['에어컨','세탁기','냉장고','인덕션','엘리베이터','CCTV'], parking: false, elevator: true, pet: false, safe: 91, photos: 8, tone: 1, lat: 37.4823, lng: 126.9410 },
    { id: 102, title: '서울대입구역 신축 1.5룸', deal: 'monthly', type: '1.5룸', deposit: 3000, monthly: 72, maintenance: 9, area: 27.4, floor: '5층', address: '서울 관악구 봉천동', walk: '서울대입구역 도보 7분', tags: ['신축','분리형','주차'], options: ['에어컨','세탁기','냉장고','붙박이장','엘리베이터','주차'], parking: true, elevator: true, pet: false, safe: 87, photos: 12, tone: 2, lat: 37.4809, lng: 126.9521 },
    { id: 103, title: '낙성대 조용한 주택가 투룸', deal: 'jeonse', type: '투룸', deposit: 18500, monthly: 0, maintenance: 5, area: 39.6, floor: '2층', address: '서울 관악구 낙성대동', walk: '낙성대역 도보 8분', tags: ['투룸','전세','남향'], options: ['에어컨','가스레인지','신발장','베란다','CCTV'], parking: false, elevator: false, pet: true, safe: 82, photos: 10, tone: 3, lat: 37.4769, lng: 126.9637 },
    { id: 104, title: '사당역 테라스 오픈형 원룸', deal: 'monthly', type: '원룸', deposit: 2000, monthly: 68, maintenance: 8, area: 23.1, floor: '4층', address: '서울 동작구 사당동', walk: '사당역 도보 6분', tags: ['테라스','풀옵션'], options: ['에어컨','세탁기','냉장고','전자레인지','테라스'], parking: false, elevator: false, pet: true, safe: 78, photos: 7, tone: 4, lat: 37.4765, lng: 126.9816 },
    { id: 105, title: '신림역 반려동물 가능한 투룸', deal: 'monthly', type: '투룸', deposit: 1500, monthly: 80, maintenance: 10, area: 42.9, floor: '3층', address: '서울 관악구 신림동', walk: '신림역 도보 4분', tags: ['반려동물','투룸','역세권'], options: ['에어컨','세탁기','냉장고','엘리베이터','반려동물'], parking: false, elevator: true, pet: true, safe: 85, photos: 14, tone: 5, lat: 37.4842, lng: 126.9297 },
    { id: 106, title: '관악구청 앞 깔끔한 원룸 전세', deal: 'jeonse', type: '원룸', deposit: 11000, monthly: 0, maintenance: 6, area: 22.5, floor: '6층', address: '서울 관악구 봉천동', walk: '서울대입구역 도보 9분', tags: ['전세','엘리베이터'], options: ['에어컨','세탁기','냉장고','인덕션','엘리베이터'], parking: false, elevator: true, pet: false, safe: 94, photos: 9, tone: 2, lat: 37.4784, lng: 126.9516 },
    { id: 107, title: '남부순환로 주차 가능한 쓰리룸', deal: 'jeonse', type: '쓰리룸', deposit: 27000, monthly: 0, maintenance: 0, area: 66.0, floor: '2층', address: '서울 동작구 사당동', walk: '남성역 도보 10분', tags: ['쓰리룸','주차','관리비없음'], options: ['에어컨','가스레인지','베란다','주차','반려동물'], parking: true, elevator: false, pet: true, safe: 73, photos: 16, tone: 3, lat: 37.4849, lng: 126.9716 },
    { id: 108, title: '샤로수길 감성 복층 1.5룸', deal: 'monthly', type: '1.5룸', deposit: 5000, monthly: 95, maintenance: 12, area: 31.2, floor: '7층', address: '서울 관악구 봉천동', walk: '서울대입구역 도보 3분', tags: ['복층','신축','풀옵션'], options: ['시스템에어컨','세탁기','냉장고','건조기','엘리베이터','주차'], parking: true, elevator: true, pet: false, safe: 89, photos: 18, tone: 4, lat: 37.4789, lng: 126.9574 },
    { id: 109, title: '보라매공원 인근 분리형 원룸', deal: 'monthly', type: '원룸', deposit: 500, monthly: 48, maintenance: 5, area: 18.2, floor: '2층', address: '서울 관악구 신림동', walk: '신대방역 도보 12분', tags: ['분리형','저렴한월세'], options: ['에어컨','세탁기','냉장고','가스레인지'], parking: false, elevator: false, pet: false, safe: 76, photos: 6, tone: 1, lat: 37.4920, lng: 126.9238 },
    { id: 110, title: '낙성대역 올수리 투룸 월세', deal: 'monthly', type: '투룸', deposit: 10000, monthly: 45, maintenance: 7, area: 46.2, floor: '3층', address: '서울 관악구 낙성대동', walk: '낙성대역 도보 5분', tags: ['올수리','투룸','남향'], options: ['에어컨','세탁기','냉장고','붙박이장','CCTV'], parking: false, elevator: false, pet: false, safe: 84, photos: 11, tone: 5, lat: 37.4771, lng: 126.9634 }
  ];

  const state = { deal: 'all', room: 'all', query: '', maxMonthly: 150, maxDeposit: 30000, parking: false, elevator: false, pet: false, safeOnly: false, favoritesOnly: false, sort: 'recommended', selected: null, bounds: null };
  let favorites = getStoredFavorites();
  let displayedProperties = properties.slice();
  let propertyMap = null;
  let currentLocationMarker = null;
  let safetyInsightPanel = null;
  let initialMapFitDone = false;
  const propertyMarkers = new Map();
  const aggregateMarkers = new Map();
  let safetyZoneLayers = [];
  const defaultMapCenter = [37.4828, 126.9525];
  const southKoreaBounds = [[32.75, 124.0], [38.7, 132.3]];
  const markerZoomLevels = { district: 12, neighborhood: 14.5 };
  const safetyPalette = {
    high: { label: '안전', color: '#079455', fill: '#12b76a' },
    medium: { label: '주의', color: '#b77900', fill: '#fdb022' },
    low: { label: '위험', color: '#d92d20', fill: '#f04438' }
  };
  const propertyRegions = {
    101: { district: '관악구', neighborhood: '봉천동' },
    102: { district: '관악구', neighborhood: '봉천동' },
    103: { district: '관악구', neighborhood: '낙성대동' },
    104: { district: '동작구', neighborhood: '사당동' },
    105: { district: '관악구', neighborhood: '신림동' },
    106: { district: '관악구', neighborhood: '봉천동' },
    107: { district: '동작구', neighborhood: '사당동' },
    108: { district: '관악구', neighborhood: '봉천동' },
    109: { district: '관악구', neighborhood: '신림동' },
    110: { district: '관악구', neighborhood: '낙성대동' }
  };

  const app = document.querySelector('.property-app');
  const propertyList = document.getElementById('propertyList');
  const realMapElement = document.getElementById('realMap');
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
    const favoriteCount = document.getElementById('favoriteCount');
    if (favoriteCount) favoriteCount.textContent = favorites.length;
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
      if (config.bounds && !config.bounds.contains([property.lat, property.lng])) return false;
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

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char];
    });
  }

  function markerLabel(property) {
    if (isSafetyMode()) return safetyPalette[safetyTone(property.safe)].label;
    return dealLabel(property) + ' ' + priceText(property);
  }

  function safetyTone(score) {
    if (score >= 88) return 'high';
    if (score >= 80) return 'medium';
    return 'low';
  }

  function safetyClass(score) {
    return 'safe-' + safetyTone(score);
  }

  function isSafetyMode() {
    const canvas = document.getElementById('mapCanvas');
    return Boolean(canvas && canvas.classList.contains('safe-map'));
  }

  function markerIcon(property) {
    const classes = ['map-marker-bubble', property.deal, safetyClass(property.safe)];
    if (state.selected === property.id) classes.push('active');
    return L.divIcon({
      className: 'listing-map-icon',
      html: '<button type="button" class="' + classes.join(' ') + '" aria-label="' + escapeHtml(property.title) + '">' + escapeHtml(markerLabel(property)) + '</button>',
      iconSize: [1, 1],
      iconAnchor: [0, 0]
    });
  }

  function regionFor(property) {
    return propertyRegions[property.id] || { district: '기타', neighborhood: '기타' };
  }

  function currentMarkerLevel() {
    if (!propertyMap) return 'property';
    const zoom = propertyMap.getZoom();
    if (zoom < markerZoomLevels.district) return 'district';
    if (zoom < markerZoomLevels.neighborhood) return 'neighborhood';
    return 'property';
  }

  function clearMarkerMap(markerMap) {
    markerMap.forEach(function (marker) {
      if (propertyMap && propertyMap.hasLayer(marker)) propertyMap.removeLayer(marker);
    });
  }

  function clearSafetyZones() {
    safetyZoneLayers.forEach(function (layer) {
      if (propertyMap && propertyMap.hasLayer(layer)) propertyMap.removeLayer(layer);
    });
    safetyZoneLayers = [];
  }

  function groupLabel(property, level) {
    const region = regionFor(property);
    return level === 'district' ? region.district : region.neighborhood;
  }

  function groupKey(property, level) {
    const region = regionFor(property);
    return level === 'district' ? region.district : region.district + ' ' + region.neighborhood;
  }

  function groupedProperties(level) {
    const groups = new Map();
    displayedProperties.forEach(function (property) {
      const key = groupKey(property, level);
      if (!groups.has(key)) {
        groups.set(key, {
          key: key,
          label: groupLabel(property, level),
          level: level,
          properties: [],
          latTotal: 0,
          lngTotal: 0
        });
      }
      const group = groups.get(key);
      group.properties.push(property);
      group.latTotal += property.lat;
      group.lngTotal += property.lng;
      group.safeTotal = (group.safeTotal || 0) + property.safe;
    });

    return Array.from(groups.values()).map(function (group) {
      group.lat = group.latTotal / group.properties.length;
      group.lng = group.lngTotal / group.properties.length;
      group.safeAverage = Math.round(group.safeTotal / group.properties.length);
      return group;
    });
  }

  function aggregateIcon(group) {
    const classes = ['map-aggregate-marker', group.level, safetyClass(group.safeAverage)];
    const safetyLabel = safetyPalette[safetyTone(group.safeAverage)].label;
    const caption = isSafetyMode() ? safetyLabel + ' · ' + group.properties.length + '개' : group.properties.length + '개 매물';
    return L.divIcon({
      className: 'aggregate-map-icon',
      html: '<button type="button" class="' + classes.join(' ') + '" aria-label="' + escapeHtml(group.label + ' ' + safetyLabel + ', 안전도 ' + group.safeAverage + '점, ' + group.properties.length + '개 매물') + '">' +
        '<strong>' + escapeHtml(group.label) + '</strong><span>' + escapeHtml(caption) + '</span></button>',
      iconSize: [1, 1],
      iconAnchor: [0, 0]
    });
  }

  function safetySubjects(level) {
    if (level === 'property') {
      return displayedProperties.map(function (property) {
        return {
          lat: property.lat,
          lng: property.lng,
          safe: property.safe,
          label: property.title,
          count: 1,
          level: 'property'
        };
      });
    }

    return groupedProperties(level).map(function (group) {
      return {
        lat: group.lat,
        lng: group.lng,
        safe: group.safeAverage,
        label: group.label,
        count: group.properties.length,
        level: group.level
      };
    });
  }

  function renderSafetyZones(level) {
    clearSafetyZones();
    updateSafetyInsight();
    if (!propertyMap || !isSafetyMode() || !displayedProperties.length) return;

    const radiusByLevel = { district: 1900, neighborhood: 850, property: 320 };
    safetySubjects(level).forEach(function (subject) {
      const palette = safetyPalette[safetyTone(subject.safe)];
      const layer = L.circle([subject.lat, subject.lng], {
        radius: radiusByLevel[subject.level] || 420,
        interactive: false,
        className: 'safety-zone safety-zone-' + safetyTone(subject.safe),
        color: palette.color,
        fillColor: palette.fill,
        fillOpacity: subject.level === 'property' ? 0.28 : 0.22,
        opacity: 0.9,
        weight: subject.level === 'property' ? 2 : 3
      }).addTo(propertyMap);
      safetyZoneLayers.push(layer);
    });
  }

  function ensureSafetyInsightPanel() {
    const mapPanel = document.getElementById('mapPanel');
    if (!mapPanel || safetyInsightPanel) return;
    safetyInsightPanel = document.createElement('div');
    safetyInsightPanel.className = 'safety-insight-panel';
    safetyInsightPanel.id = 'safetyInsightPanel';
    mapPanel.appendChild(safetyInsightPanel);
  }

  function updateSafetyInsight() {
    ensureSafetyInsightPanel();
    if (!safetyInsightPanel) return;
    if (!isSafetyMode() || !displayedProperties.length) {
      safetyInsightPanel.innerHTML = '';
      return;
    }

    const average = Math.round(displayedProperties.reduce(function (sum, property) {
      return sum + property.safe;
    }, 0) / displayedProperties.length);
    const counts = displayedProperties.reduce(function (result, property) {
      result[safetyTone(property.safe)] += 1;
      return result;
    }, { high: 0, medium: 0, low: 0 });
    const tone = safetyTone(average);

    safetyInsightPanel.innerHTML =
      '<div class="safety-insight-head"><span class="safety-dot ' + tone + '"></span><div><strong>안전도 렌즈</strong><small>현재 표시된 매물 기준</small></div><b>' + average + '</b></div>' +
      '<div class="safety-meter"><i style="width:' + average + '%"></i></div>' +
      '<div class="safety-legend-row"><span><i class="high"></i>안전 ' + counts.high + '</span><span><i class="medium"></i>주의 ' + counts.medium + '</span><span><i class="low"></i>위험 ' + counts.low + '</span></div>';
  }

  function focusGroup(group) {
    if (!propertyMap || !group.properties.length) return;
    const bounds = L.latLngBounds(group.properties.map(function (property) {
      return [property.lat, property.lng];
    }));
    propertyMap.flyToBounds(bounds, {
      paddingTopLeft: [70, 80],
      paddingBottomRight: [90, 130],
      maxZoom: group.level === 'district' ? 13.5 : 15,
      duration: 0.65
    });
  }

  function renderAggregateMarkers(level) {
    clearMarkerMap(propertyMarkers);
    clearMarkerMap(aggregateMarkers);
    aggregateMarkers.clear();

    groupedProperties(level).forEach(function (group) {
      const marker = L.marker([group.lat, group.lng], {
        icon: aggregateIcon(group),
        keyboard: true,
        title: group.label
      }).on('click', function () {
        focusGroup(group);
      });
      aggregateMarkers.set(group.key, marker);
      marker.addTo(propertyMap);
    });
  }

  function initMap() {
    if (!realMapElement) return;
    if (!window.L) {
      realMapElement.innerHTML = '<div class="map-fallback">지도를 불러오지 못했습니다. 인터넷 연결 또는 Leaflet CDN 로딩 상태를 확인해 주세요.</div>';
      return;
    }

    propertyMap = L.map(realMapElement, {
      zoomControl: false,
      attributionControl: true,
      maxBounds: southKoreaBounds,
      maxBoundsViscosity: 0.9,
      minZoom: 7,
      maxZoom: 19,
      zoomSnap: 0.25,
      zoomDelta: 0.5,
      wheelPxPerZoomLevel: 120,
      wheelDebounceTime: 20,
      zoomAnimation: true,
      fadeAnimation: true,
      markerZoomAnimation: true,
      inertia: true,
      easeLinearity: 0.18
    }).setView(defaultMapCenter, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      bounds: southKoreaBounds,
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(propertyMap);

    propertyMap.on('zoomend', renderMarkers);
    window.addEventListener('load', function () { refreshMapLayout(true); });
    window.addEventListener('resize', function () { refreshMapLayout(false); });
    refreshMapLayout(true);
  }

  function fitDisplayedProperties() {
    if (!propertyMap || !displayedProperties.length) return;
    const bounds = L.latLngBounds(displayedProperties.map(function (property) {
      return [property.lat, property.lng];
    }));
    propertyMap.flyToBounds(bounds, {
      paddingTopLeft: [70, 80],
      paddingBottomRight: [90, 130],
      maxZoom: 15,
      duration: 0.7
    });
  }

  function refreshMapLayout(shouldFit) {
    if (!propertyMap) return;
    setTimeout(function () {
      propertyMap.invalidateSize();
      if (shouldFit) fitDisplayedProperties();
    }, 80);
  }

  function focusPropertyOnMap(property) {
    if (!propertyMap || !property) return;
    propertyMap.invalidateSize();
    propertyMap.flyTo([property.lat, property.lng], Math.max(propertyMap.getZoom(), 15), {
      animate: true,
      duration: 0.65
    });
  }

  function renderMarkers() {
    if (!propertyMap || !window.L) return;

    const markerLevel = currentMarkerLevel();
    if (markerLevel !== 'property') {
      renderAggregateMarkers(markerLevel);
      renderSafetyZones(markerLevel);
      if (!initialMapFitDone && displayedProperties.length) {
        fitDisplayedProperties();
        initialMapFitDone = true;
      }
      return;
    }

    clearMarkerMap(aggregateMarkers);
    aggregateMarkers.clear();

    const visibleIds = new Set(displayedProperties.map(function (property) { return property.id; }));
    properties.forEach(function (property) {
      const visible = visibleIds.has(property.id);
      let marker = propertyMarkers.get(property.id);

      if (!visible) {
        if (marker && propertyMap.hasLayer(marker)) propertyMap.removeLayer(marker);
        return;
      }

      if (!marker) {
        marker = L.marker([property.lat, property.lng], {
          icon: markerIcon(property),
          keyboard: true,
          title: property.title,
          alt: property.title
        }).on('click', function () {
          openDetail(property.id, true);
        });
        propertyMarkers.set(property.id, marker);
      } else {
        marker.setLatLng([property.lat, property.lng]);
        marker.setIcon(markerIcon(property));
      }

      marker.setZIndexOffset(state.selected === property.id ? 1000 : 0);
      if (!propertyMap.hasLayer(marker)) marker.addTo(propertyMap);
    });
    renderSafetyZones('property');

    if (!initialMapFitDone && displayedProperties.length) {
      fitDisplayedProperties();
      initialMapFitDone = true;
    }
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
      '<section class="detail-section"><h3>보증금 안전 진단</h3><div class="safety-score-box"><span class="safety-score-ring">' + property.safe + '</span><p>기본 권리관계 기준으로 확인했어요.<br><a href="templates/defense/fraud_result.html">계약 전 정밀 진단하기 →</a></p></div></section></div>' +
      '<div class="detail-actions"><a href="templates/defense/checklist.html">안전 진단</a><button type="button" data-inquiry="' + id + '">방문 상담 신청</button></div>';
    detail.classList.add('open'); detail.setAttribute('aria-hidden', 'false');
    renderMarkers();
    focusPropertyOnMap(property);
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
    state.bounds = null;
    document.getElementById('locationLabel').textContent = input.value.trim() ? '"' + input.value.trim() + '" 검색 결과' : '서울 관악구 주변';
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

  const savedHomesButton = document.getElementById('savedHomesButton');
  if (savedHomesButton) {
    savedHomesButton.addEventListener('click', function () {
      if (!favorites.length) { showToast('아직 찜한 매물이 없어요.'); return; }
      state.favoritesOnly = !state.favoritesOnly;
      this.classList.toggle('active', state.favoritesOnly);
      this.setAttribute('aria-pressed', String(state.favoritesOnly));
      render();
      showToast(state.favoritesOnly ? '찜한 매물만 모아볼게요.' : '전체 매물을 보여드려요.');
    });
  }

  document.querySelectorAll('[data-map-mode]').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('[data-map-mode]').forEach(function (item) { item.classList.remove('active'); });
      this.classList.add('active');
      const mapPanel = document.getElementById('mapPanel');
      const canvas = document.getElementById('mapCanvas');
      canvas.classList.toggle('district', this.dataset.mapMode === 'district');
      canvas.classList.toggle('safe-map', this.dataset.mapMode === 'safe');
      if (mapPanel) mapPanel.classList.toggle('safety-view', this.dataset.mapMode === 'safe');
      if (propertyMap) propertyMap.invalidateSize();
      renderMarkers();
      if (this.dataset.mapMode === 'safe') showToast('안전도 렌즈를 켰어요. 점수별 권역을 확인해 보세요.');
    });
  });

  document.getElementById('zoomIn').addEventListener('click', function () {
    if (propertyMap) propertyMap.setZoomAround(propertyMap.getCenter(), propertyMap.getZoom() + 0.5, { animate: true });
  });
  document.getElementById('zoomOut').addEventListener('click', function () {
    if (propertyMap) propertyMap.setZoomAround(propertyMap.getCenter(), propertyMap.getZoom() - 0.5, { animate: true });
  });
  document.getElementById('searchThisArea').addEventListener('click', function () {
    const button = this;
    button.innerHTML = '<span>↻</span> 검색 중';
    if (propertyMap) state.bounds = propertyMap.getBounds();
    setTimeout(function () {
      render();
      button.innerHTML = '<span>✓</span> 검색 완료';
      showToast('현재 지도 범위 안의 매물을 다시 불러왔어요.');
      setTimeout(function () { button.innerHTML = '<span>↻</span> 현 지도에서 검색'; }, 1200);
    }, 350);
  });
  document.getElementById('myLocation').addEventListener('click', function () {
    if (!propertyMap) return;
    if (!navigator.geolocation) {
      propertyMap.flyTo(defaultMapCenter, 14, { duration: 0.65 });
      showToast('현재 위치를 지원하지 않아 관악구 중심으로 이동했어요.');
      return;
    }

    showToast('현재 위치를 확인하고 있어요.');
    navigator.geolocation.getCurrentPosition(function (position) {
      const currentLatLng = [position.coords.latitude, position.coords.longitude];
      if (!L.latLngBounds(southKoreaBounds).contains(currentLatLng)) {
        propertyMap.flyTo(defaultMapCenter, 14, { duration: 0.65 });
        showToast('현재 위치가 대한민국 지도 범위 밖이라 관악구 중심으로 이동했어요.');
        return;
      }

      if (!currentLocationMarker) {
        currentLocationMarker = L.circleMarker(currentLatLng, {
          radius: 8,
          color: '#2468e8',
          weight: 3,
          fillColor: '#ffffff',
          fillOpacity: 1
        }).addTo(propertyMap);
      } else {
        currentLocationMarker.setLatLng(currentLatLng);
      }
      propertyMap.flyTo(currentLatLng, 15, { duration: 0.75 });
      showToast('현재 위치로 이동했어요.');
    }, function () {
      propertyMap.flyTo(defaultMapCenter, 14, { duration: 0.65 });
      showToast('위치 권한을 받을 수 없어 관악구 중심으로 이동했어요.');
    }, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  });

  document.querySelectorAll('.mobile-view-switch button').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('.mobile-view-switch button').forEach(function (item) { item.classList.remove('active'); });
      this.classList.add('active');
      app.classList.toggle('map-view', this.dataset.view === 'map');
      if (this.dataset.view === 'map' && propertyMap) {
        setTimeout(function () {
          propertyMap.invalidateSize();
          if (!initialMapFitDone) fitDisplayedProperties();
        }, 80);
      }
    });
  });

  function openInquiry(id) { const property = properties.find(function (item) { return item.id === id; }); inquiryModal.dataset.id = id; document.getElementById('inquiryPropertyName').textContent = property.title + ' · ' + dealLabel(property) + ' ' + priceText(property); openSheet(inquiryModal); }
  inquiryModal.querySelector('.inquiry-close').addEventListener('click', function () { closeSheet(inquiryModal); });
  document.getElementById('phoneInput').addEventListener('input', function () { const number = this.value.replace(/[^0-9]/g,'').slice(0,11); this.value = number.length > 7 ? number.slice(0,3) + '-' + number.slice(3,7) + '-' + number.slice(7) : number.length > 3 ? number.slice(0,3) + '-' + number.slice(3) : number; });
  document.getElementById('submitInquiry').addEventListener('click', function () { const phone = document.getElementById('phoneInput'); if (phone.value.replace(/[^0-9]/g,'').length < 10) { phone.focus(); showToast('연락받을 휴대폰 번호를 확인해 주세요.'); return; } closeSheet(inquiryModal); phone.value = ''; showToast('데모 상담 신청이 완료됐어요.'); });
  [filterSheet, inquiryModal].forEach(function (sheet) { sheet.addEventListener('click', function (event) { if (event.target === sheet) closeSheet(sheet); }); });
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape') { closeSheet(filterSheet); closeSheet(inquiryModal); closeDetail(); } });
  document.querySelectorAll('[data-demo-link],[data-demo-button]').forEach(function (item) { item.addEventListener('click', function (event) { event.preventDefault(); showToast('이 메뉴는 메인 홈 데모에서 준비 중이에요.'); }); });

  if (window.location.hash === '#saved-homes' && favorites.length && savedHomesButton) {
    state.favoritesOnly = true;
    savedHomesButton.classList.add('active');
    savedHomesButton.setAttribute('aria-pressed', 'true');
  }
  initMap(); saveFavorites(); render(); updateFilterBadge();
})();
