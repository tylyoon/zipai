(function () {
  'use strict';

  const form = document.getElementById('housingCostForm');
  if (!form) return;

  const defaults = {};
  let favoriteProperties = [];

  function value(name) {
    const field = form.elements[name];
    const parsed = Number(field && field.value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }

  function name(prefix) {
    return String(form.elements[prefix + 'Name'].value || (prefix === 'a' ? '선택한 집 A' : '선택한 집 B')).trim();
  }

  function getFavoriteProperties() {
    try {
      const data = JSON.parse(localStorage.getItem('zipaiFavoriteProperties') || '[]');
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return [];
    }
  }

  function optionText(property) {
    const price = property.deal === 'jeonse'
      ? '전세 ' + Number(property.deposit || 0).toLocaleString('ko-KR') + '만원'
      : Number(property.deposit || 0).toLocaleString('ko-KR') + '/' + Number(property.monthly || 0) + '만원';
    return property.title + ' · ' + price;
  }

  function fillSelect(select, preferredIndex) {
    select.innerHTML = '';
    const unselected = document.createElement('option');
    unselected.value = '';
    unselected.textContent = '선택 안 함';
    select.appendChild(unselected);
    if (!favoriteProperties.length) {
      unselected.textContent = '선택 안 함 · 찜한 매물 없음';
      select.disabled = true;
      return;
    }
    select.disabled = false;
    favoriteProperties.forEach(function (property) {
      const option = document.createElement('option');
      option.value = String(property.id);
      option.textContent = optionText(property);
      select.appendChild(option);
    });
    select.selectedIndex = Math.min(preferredIndex + 1, favoriteProperties.length);
  }

  function applyFavorite(prefix) {
    const select = document.getElementById(prefix + 'Favorite');
    const property = favoriteProperties.find(function (item) {
      return String(item.id) === select.value;
    });
    if (!property) {
      form.elements[prefix + 'Name'].value = '';
      form.elements[prefix + 'Deposit'].value = 0;
      form.elements[prefix + 'Rent'].value = 0;
      form.elements[prefix + 'Maintenance'].value = 0;
      return;
    }
    form.elements[prefix + 'Name'].value = property.title;
    form.elements[prefix + 'Deposit'].value = Number(property.deposit || 0);
    form.elements[prefix + 'Rent'].value = Number(property.monthly || 0);
    form.elements[prefix + 'Maintenance'].value = Number(property.maintenance || 0);
  }

  function populateFavorites() {
    favoriteProperties = getFavoriteProperties();
    fillSelect(document.getElementById('aFavorite'), 0);
    fillSelect(document.getElementById('bFavorite'), 1);
    applyFavorite('a');
    applyFavorite('b');
    const help = document.getElementById('favoriteHelp');
    if (!favoriteProperties.length) {
      help.innerHTML = '<i class="fa-solid fa-circle-info"></i> 아직 찜한 매물이 없습니다. <a href="../../index.html">매물 찾기에서 하트 버튼으로 두 개 이상의 매물을 저장해 주세요.</a>';
    } else if (favoriteProperties.length === 1) {
      help.innerHTML = '<i class="fa-solid fa-circle-info"></i> 비교하려면 <a href="../../index.html">매물 찾기에서 다른 매물을 하나 더 찜해 주세요.</a>';
    }
  }

  function calculate(prefix) {
    const deposit = value(prefix + 'Deposit');
    const loan = Math.min(value(prefix + 'Loan'), deposit);
    const rate = value(prefix + 'Rate');
    const months = Math.max(1, value(prefix + 'Months'));
    const rent = value(prefix + 'Rent');
    const maintenance = value(prefix + 'Maintenance');
    const utility = value(prefix + 'Utility');
    const transport = value(prefix + 'Transport');
    const support = value(prefix + 'Support');
    const move = value(prefix + 'Move');
    const interest = loan * (rate / 100) / 12;
    const initialMonthly = move / months;
    const recurring = rent + maintenance + utility + transport + interest - support;
    const monthly = Math.max(0, recurring + initialMonthly);

    return {
      name: name(prefix),
      deposit: deposit,
      loan: loan,
      rent: rent,
      maintenance: maintenance,
      utility: utility,
      transport: transport,
      support: support,
      move: move,
      months: months,
      interest: interest,
      initialMonthly: initialMonthly,
      recurring: Math.max(0, recurring),
      monthly: monthly,
      total: monthly * months,
      initialFunds: Math.max(0, deposit - loan) + move
    };
  }

  function won(manwon) {
    const amount = Math.round(manwon * 10000);
    return amount.toLocaleString('ko-KR') + '원';
  }

  function shortWon(manwon) {
    const amount = Math.round(manwon * 10) / 10;
    if (amount >= 10000) return (Math.round(amount / 100) / 100) + '억원';
    return amount.toLocaleString('ko-KR') + '만원';
  }

  function resultCard(home, cheaper) {
    const rows = [
      ['월세', home.rent],
      ['관리비·공과금', home.maintenance + home.utility],
      ['대출이자', home.interest],
      ['교통비', home.transport],
      ['초기비용 월 환산', home.initialMonthly],
      ['주거지원금', -home.support]
    ];
    return '<article class="home-result' + (cheaper ? ' is-winner' : '') + '">' +
      '<div class="home-result-title"><div><span>' + (cheaper ? '월 부담이 더 낮아요' : '비교 매물') + '</span><h3>' + escapeHtml(home.name) + '</h3></div><strong>' + won(home.monthly) + '<small>/월</small></strong></div>' +
      '<div class="cost-bars">' + rows.map(function (row) {
        const width = home.monthly ? Math.min(100, Math.abs(row[1]) / home.monthly * 100) : 0;
        return '<div class="' + (row[1] < 0 ? 'deduction' : '') + '"><span>' + row[0] + '</span><i><b style="width:' + width + '%"></b></i><strong>' + (row[1] < 0 ? '-' : '') + won(Math.abs(row[1])) + '</strong></div>';
      }).join('') + '</div>' +
      '<footer><span>' + home.months + '개월 총비용</span><strong>' + won(home.total) + '</strong></footer></article>';
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function render() {
    const a = calculate('a');
    const b = calculate('b');
    const difference = Math.abs(a.monthly - b.monthly);
    const equal = difference < 0.005;
    const lower = equal ? null : (a.monthly < b.monthly ? a : b);

    document.getElementById('snapshotLower').textContent = equal ? '비슷함' : lower.name;
    document.getElementById('snapshotSaving').textContent = won(difference);
    document.getElementById('snapshotYearSaving').textContent = won(difference * 12);
    document.getElementById('savingAmount').textContent = won(difference);
    document.getElementById('resultTitle').textContent = equal ? '두 집의 월 부담이 거의 같아요' : lower.name + '의 월 부담이 더 낮아요';
    document.getElementById('resultSummary').textContent = equal
      ? '비용 차이가 거의 없습니다. 위치, 면적, 안전성과 계약 조건을 함께 비교하세요.'
      : lower.name + '을 선택하면 다른 집보다 매월 ' + won(difference) + ', 1년에 약 ' + won(difference * 12) + '을 절약할 수 있습니다.';
    document.getElementById('resultCards').innerHTML = resultCard(a, lower === a) + resultCard(b, lower === b);

    document.getElementById('tableNameA').textContent = a.name;
    document.getElementById('tableNameB').textContent = b.name;
    const rows = [
      ['월세', a.rent, b.rent],
      ['관리비', a.maintenance, b.maintenance],
      ['공과금 예상', a.utility, b.utility],
      ['대출이자', a.interest, b.interest],
      ['교통비', a.transport, b.transport],
      ['초기비용 월 환산', a.initialMonthly, b.initialMonthly],
      ['주거지원금 차감', -a.support, -b.support],
      ['실질 월 부담', a.monthly, b.monthly]
    ];
    document.getElementById('breakdownBody').innerHTML = rows.map(function (row, index) {
      const diff = Math.abs(row[1] - row[2]);
      return '<tr' + (index === rows.length - 1 ? ' class="total-row"' : '') + '><th>' + row[0] + '</th><td>' +
        (row[1] < 0 ? '-' : '') + won(Math.abs(row[1])) + '</td><td>' + (row[2] < 0 ? '-' : '') + won(Math.abs(row[2])) +
        '</td><td>' + won(diff) + '</td></tr>';
    }).join('');

    document.getElementById('initialFunds').textContent =
      a.name + ' ' + shortWon(a.initialFunds) + ' · ' + b.name + ' ' + shortWon(b.initialFunds);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    render();
    document.querySelector('.result-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  form.addEventListener('input', render);
  document.getElementById('aFavorite').addEventListener('change', function () { applyFavorite('a'); render(); });
  document.getElementById('bFavorite').addEventListener('change', function () { applyFavorite('b'); render(); });
  document.getElementById('resetCost').addEventListener('click', function () {
    Object.keys(defaults).forEach(function (key) { form.elements[key].value = defaults[key]; });
    fillSelect(document.getElementById('aFavorite'), 0);
    fillSelect(document.getElementById('bFavorite'), 1);
    document.getElementById('aFavorite').value = '';
    document.getElementById('bFavorite').value = '';
    applyFavorite('a');
    applyFavorite('b');
    render();
  });
  populateFavorites();
  Array.from(form.elements).forEach(function (field) {
    if (field.name) defaults[field.name] = field.value;
  });
  render();
})();
