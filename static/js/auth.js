(function () {
  'use strict';

  const STORAGE_KEY = 'zipaiDemoUser';
  const PAGE_PATHS = {
    'index.html': 'index.html',
    'finance-policy.html': 'templates/board/finance-policy.html',
    'trend1.html': 'templates/board/trend1.html',
    'trend2.html': 'templates/board/trend2.html',
    'trend3.html': 'templates/board/trend3.html',
    'trend4.html': 'templates/board/trend4.html',
    'safety.html': 'templates/safe/safety.html',
    'happy-housing.html': 'templates/board/happy-housing.html',
    'customer-center.html': 'templates/board/customer-center.html',
    'admin.html': 'templates/admin/admin.html',
    'login.html': 'templates/member/login.html',
    'signup.html': 'templates/member/signup.html',
    'mypage.html': 'templates/member/mypage.html',
    'lifestyle-analysis.html': 'templates/ai/lifestyle-analysis.html',
    'sub33.html': 'templates/defense/fraud_result.html',
    'fraud_result.html': 'templates/defense/fraud_result.html',
    'checklist.html': 'templates/defense/checklist.html',
    'jeonse-calculator.html': 'templates/defense/charter-rate-calculator.html',
    'charter-rate-calculator.html': 'templates/defense/charter-rate-calculator.html',
    'contract-guide.html': 'templates/defense/contract-guide.html'
  };
  const PAGE_ALIASES = {
    'sub33.html': 'fraud_result.html',
    'jeonse-calculator.html': 'charter-rate-calculator.html'
  };
  const SITE_SEARCH_ITEMS = [
    { title: '매물 찾기', href: 'index.html', description: '경기도 전·월세와 LH·공공임대 매물을 지역, 역, 학교, 가격 조건으로 찾아보세요.', keywords: '집 방 아파트 원룸 투룸 쓰리룸 월세 전세 보증금 임대 매물 지역 지하철역 학교 경기도 lh 공공임대' },
    { title: '전세사기 안전 진단', href: 'fraud_result.html', description: '계약 전 위험 요소와 등기·보증금 관련 주의사항을 확인합니다.', keywords: '사기방지 전세사기 위험 진단 등기부등본 근저당 보증금 임대인 안전 계약' },
    { title: '계약 체크리스트', href: 'checklist.html', description: '집을 보고 계약하기 전 단계별로 확인해야 할 항목을 살펴보세요.', keywords: '체크리스트 계약 준비 서류 특약 등기 집보기 입주 확인' },
    { title: '전세가율 계산기', href: 'charter-rate-calculator.html', description: '매매가와 보증금을 비교해 전세가율과 위험 수준을 계산합니다.', keywords: '계산기 전세가율 깡통전세 매매가 보증금 위험 계산' },
    { title: '안전 계약 가이드', href: 'contract-guide.html', description: '집을 알아볼 때부터 잔금과 입주까지 안전한 계약 순서를 안내합니다.', keywords: '계약 가이드 절차 계약서 잔금 입주 전입신고 확정일자 중개사' },
    { title: '지역 위험·안전도', href: 'safety.html', description: '지역별 치안, CCTV, 비상벨과 생활 안전 정보를 확인하세요.', keywords: '안전도 위험도 치안 범죄 cctv 비상벨 밤길 여성 안전 지역 지도' },
    { title: '금융지원정책', href: 'trend1.html', description: '청년과 신혼부부를 위한 주거 대출·금융 지원 정보를 알아보세요.', keywords: '금융 정책 지원 대출 이자 청년 신혼부부 전세자금 버팀목 디딤돌' },
    { title: '행복주택 안내', href: 'happy-housing.html', description: '행복주택 자격, 신청 절차와 모집공고 확인 방법을 안내합니다.', keywords: '행복주택 공공주택 lh 청년 대학생 신혼부부 자격 소득 자산 신청 모집공고' },
    { title: '총 주거비 비교', href: 'lifestyle-analysis.html', description: '관심 매물의 월세, 관리비와 생활 조건을 함께 비교해 보세요.', keywords: '주거비 비교 생활권 교통 편의시설 관리비 월세 분석 ai 찜 매물' },
    { title: '고객센터', href: 'customer-center.html', description: '자주 묻는 질문을 확인하고 서비스 이용 문의를 남길 수 있습니다.', keywords: '고객센터 도움말 문의 질문 faq 이용방법 오류 신고 상담 모르는 것' },
    { title: '로그인', href: 'login.html', description: 'ZipAI 계정으로 로그인합니다.', keywords: '로그인 계정 아이디 회원' },
    { title: '회원가입', href: 'signup.html', description: 'ZipAI 회원 계정을 만듭니다.', keywords: '회원가입 가입 계정 만들기' },
    { title: '마이페이지', href: 'mypage.html', description: '내 정보와 문의 내역을 확인합니다.', keywords: '마이페이지 내정보 계정 문의내역 회원정보' }
  ];
  let memoryUser = null;

  function getRootPrefix() {
    return window.location.pathname.replace(/\\/g, '/').includes('/templates/') ? '../../' : '';
  }

  function getPageName(href) {
    const path = String(href || '').split('#')[0].split('?')[0].replace(/\\/g, '/');
    const page = (path.split('/').pop() || '').toLowerCase();
    return PAGE_ALIASES[page] || page;
  }

  function resolvePage(href) {
    const value = String(href || '');
    if (!value || value === '#' || value.charAt(0) === '#' || /^[a-z][a-z0-9+.-]*:/i.test(value)) return value;
    const parts = value.split('#');
    const cleanPath = parts[0].replace(/\\/g, '/').replace(/^(\.\.\/)+/, '').replace(/^\.\//, '').toLowerCase();
    const pageName = getPageName(cleanPath);
    const target = PAGE_PATHS[cleanPath] || PAGE_PATHS[pageName] || parts[0];
    return getRootPrefix() + target + (parts[1] ? '#' + parts[1] : '');
  }

  function clearPersistedUser() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (error) { /* persisted login cleanup only */ }
  }

  function getUser() {
    clearPersistedUser();
    try {
      const value = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
      return value && value.id ? value : memoryUser;
    } catch (error) {
      return memoryUser;
    }
  }

  function login(userId) {
    const user = {
      id: String(userId || '').trim(),
      loginAt: new Date().toISOString()
    };
    memoryUser = user;
    clearPersistedUser();
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user)); } catch (error) { /* 현재 페이지에서만 유지될 수 있음 */ }
    return user;
  }

  function logout() {
    memoryUser = null;
    clearPersistedUser();
    try { sessionStorage.removeItem(STORAGE_KEY); } catch (error) { /* 이미 로그아웃된 상태로 처리 */ }
  }

  function updateLoginButtons() {
    const user = getUser();
    document.querySelectorAll('.login-button').forEach(function (button) {
      const icon = document.createElement('i');
      const label = document.createElement('span');
      button.href = resolvePage(user ? 'mypage.html' : 'login.html');
      button.classList.toggle('is-authenticated', Boolean(user));
      button.setAttribute('aria-label', user ? user.id + ' 계정 페이지로 이동' : '로그인 페이지로 이동');
      icon.className = 'fa-solid ' + (user ? 'fa-user-check' : 'fa-user');
      icon.setAttribute('aria-hidden', 'true');
      label.className = 'auth-user-label';
      label.textContent = user ? user.id + '님' : '로그인';
      button.replaceChildren(icon, label);
    });

    document.querySelectorAll('.utility-signup-button').forEach(function (button) {
      button.href = resolvePage('signup.html');
      const shouldHideSignup = Boolean(user);
      button.hidden = shouldHideSignup;
      button.setAttribute('aria-hidden', String(shouldHideSignup));
    });

    document.querySelectorAll('.utility-links').forEach(function (container) {
      let mypageLink = container.querySelector('.utility-mypage');
      let adminLink = container.querySelector('.utility-admin');
      if (!mypageLink) {
        mypageLink = document.createElement('a');
        mypageLink.className = 'utility-mypage';
        mypageLink.href = resolvePage('mypage.html');
        mypageLink.innerHTML = '<i class="fa-solid fa-user-gear" aria-hidden="true"></i><span>마이페이지</span>';
        container.appendChild(mypageLink);
      }
      if (!adminLink) {
        adminLink = document.createElement('a');
        adminLink.className = 'utility-admin';
        adminLink.href = resolvePage('admin.html');
        adminLink.innerHTML = '<i class="fa-solid fa-user-tie" aria-hidden="true"></i><span>관리자</span>';
        container.appendChild(adminLink);
      }
      mypageLink.hidden = !user;
      mypageLink.setAttribute('aria-hidden', String(!user));
      adminLink.hidden = !user || user.id !== 'admin';
      adminLink.setAttribute('aria-hidden', String(!user || user.id !== 'admin'));
    });
  }

  function getCurrentPage() {
    return (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  }

  function setHeaderActiveLink(activePage) {
    const header = document.querySelector('.zipai-header');
    if (!header) return;
    const targetPage = getPageName(activePage);
    const currentPage = getCurrentPage();
    header.querySelectorAll('.menu-links a').forEach(function (link) {
      const isActive = getPageName(link.getAttribute('href')) === targetPage;
      link.classList.toggle('active', isActive);
      if (isActive && targetPage === currentPage) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  function setupHeaderActiveState() {
    const currentPage = getCurrentPage();
    const fraudPages = ['fraud_result.html', 'charter-rate-calculator.html', 'contract-guide.html', 'checklist.html'];
    if (fraudPages.includes(currentPage)) {
      setHeaderActiveLink('fraud_result.html');
      return;
    }
    if (['trend1.html', 'trend2.html', 'trend3.html', 'trend4.html'].includes(currentPage)) {
      setHeaderActiveLink('trend1.html');
      return;
    }
    const readyPages = ['index.html', 'finance-policy.html', 'safety.html', 'happy-housing.html', 'lifestyle-analysis.html'];
    setHeaderActiveLink(readyPages.includes(currentPage) ? currentPage : '');
  }

  function setupPendingHeaderLinks() {
    const header = document.querySelector('.zipai-header');
    if (!header) return;
    const pendingHrefs = ['charter-rate-calculator.html', 'checklist.html'];
    header.querySelectorAll('.menu-links a').forEach(function (link) {
      const href = getPageName(link.getAttribute('href'));
      if (!pendingHrefs.includes(href) || link.dataset.pendingReady === 'true') return;
      link.dataset.pendingReady = 'true';
      link.dataset.originalHref = href;
      link.href = '#';
      link.setAttribute('aria-disabled', 'true');
      link.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setupHeaderActiveState();
      });
    });
  }

  function setupFraudSubnav() {
    const header = document.querySelector('.zipai-header');
    const fraudLink = header && Array.from(header.querySelectorAll('.menu-links a')).find(function (link) {
      return getPageName(link.getAttribute('href')) === 'fraud_result.html';
    });
    if (!header || !fraudLink || fraudLink.dataset.subnavReady === 'true') return;

    const items = [
      { href: 'fraud_result.html', label: '안전 진단 결과' },
      { href: 'checklist.html', label: '체크리스트' },
      { href: 'charter-rate-calculator.html', label: '전세가율 계산' },
      { href: 'contract-guide.html', label: '계약가이드' }
    ];
    const currentPage = getCurrentPage();
    const fraudPages = items.map(function (item) { return item.href.toLowerCase(); });
    let subnavWrap = document.querySelector('.subnav-wrap');
    const hasFraudSubnav = subnavWrap && subnavWrap.querySelector('nav[aria-label="사기방지 메뉴"]');

    if (!hasFraudSubnav) {
      subnavWrap = document.createElement('div');
      const nav = document.createElement('nav');
      subnavWrap.className = 'subnav-wrap';
      nav.className = 'subnav';
      nav.setAttribute('aria-label', '사기방지 메뉴');
      items.forEach(function (item) {
        const link = document.createElement('a');
        link.href = resolvePage(item.href);
        link.textContent = item.label;
        nav.appendChild(link);
      });
      subnavWrap.appendChild(nav);
      header.insertAdjacentElement('afterend', subnavWrap);
    }

    subnavWrap.classList.add('header-fraud-subnav');
    subnavWrap.querySelectorAll('.subnav a').forEach(function (link) {
      const href = getPageName(link.getAttribute('href'));
      link.classList.toggle('active', href === currentPage);
    });

    function setFraudSubnavOpen(isOpen) {
      subnavWrap.classList.toggle('is-open', isOpen);
      fraudLink.classList.toggle('is-subnav-open', isOpen);
      fraudLink.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) setHeaderActiveLink('fraud_result.html');
      else setupHeaderActiveState();
    }

    fraudLink.dataset.subnavReady = 'true';
    fraudLink.setAttribute('aria-haspopup', 'true');
    let fraudSubnavCloseTimer = 0;

    function openFraudSubnav() {
      clearTimeout(fraudSubnavCloseTimer);
      setFraudSubnavOpen(true);
    }

    function closeFraudSubnav() {
      clearTimeout(fraudSubnavCloseTimer);
      setFraudSubnavOpen(false);
    }

    function scheduleFraudSubnavClose() {
      clearTimeout(fraudSubnavCloseTimer);
      fraudSubnavCloseTimer = setTimeout(closeFraudSubnav, 160);
    }

    setFraudSubnavOpen(false);
    fraudLink.addEventListener('mouseenter', openFraudSubnav);
    fraudLink.addEventListener('focus', openFraudSubnav);
    fraudLink.addEventListener('mouseleave', scheduleFraudSubnavClose);
    subnavWrap.addEventListener('mouseenter', openFraudSubnav);
    subnavWrap.addEventListener('mouseleave', scheduleFraudSubnavClose);
    subnavWrap.addEventListener('focusin', openFraudSubnav);
    subnavWrap.addEventListener('focusout', function () {
      setTimeout(function () {
        if (!subnavWrap.contains(document.activeElement) && document.activeElement !== fraudLink) {
          scheduleFraudSubnavClose();
        }
      }, 0);
    });
    header.querySelectorAll('.menu-links a').forEach(function (link) {
      if (link === fraudLink) return;
      link.addEventListener('mouseenter', scheduleFraudSubnavClose);
      link.addEventListener('focus', scheduleFraudSubnavClose);
    });
    fraudLink.addEventListener('click', function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openFraudSubnav();
    });
  }

  function normalizeSearchText(value) {
    return String(value || '').toLocaleLowerCase('ko-KR').replace(/\s+/g, ' ').trim();
  }

  function searchSite(query) {
    const words = normalizeSearchText(query).split(' ').filter(Boolean);
    if (!words.length) return SITE_SEARCH_ITEMS.slice(0, 6);
    return SITE_SEARCH_ITEMS.map(function (item) {
      const title = normalizeSearchText(item.title);
      const text = normalizeSearchText([item.title, item.description, item.keywords].join(' '));
      let score = 0;
      words.forEach(function (word) {
        if (title === word) score += 12;
        else if (title.includes(word)) score += 7;
        if (text.includes(word)) score += 3;
      });
      return { item: item, score: score };
    }).filter(function (result) {
      return result.score > 0;
    }).sort(function (a, b) {
      return b.score - a.score;
    }).map(function (result) {
      return result.item;
    });
  }

  function setupSiteSearch() {
    const buttons = document.querySelectorAll('.zipai-header .icon-button[aria-label="검색"]');
    if (!buttons.length || document.querySelector('.site-search-dialog')) return;

    const dialog = document.createElement('div');
    dialog.className = 'site-search-dialog';
    dialog.hidden = true;
    dialog.innerHTML =
      '<div class="site-search-backdrop" data-search-close></div>' +
      '<section class="site-search-panel" role="dialog" aria-modal="true" aria-labelledby="siteSearchTitle">' +
        '<div class="site-search-heading">' +
          '<div><span>ZIPAI 통합검색</span><h2 id="siteSearchTitle">무엇을 찾고 계신가요?</h2></div>' +
          '<button class="site-search-close" type="button" data-search-close aria-label="검색창 닫기"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>' +
        '</div>' +
        '<form class="site-search-form" role="search">' +
          '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>' +
          '<input type="search" autocomplete="off" placeholder="예: 전세사기, 행복주택 자격, 월세 매물" aria-label="사이트 검색어">' +
          '<button type="submit">검색</button>' +
        '</form>' +
        '<p class="site-search-guide">찾고 싶은 서비스나 궁금한 내용을 입력해 보세요.</p>' +
        '<div class="site-search-results" aria-live="polite"></div>' +
      '</section>';
    document.body.appendChild(dialog);

    const input = dialog.querySelector('input');
    const results = dialog.querySelector('.site-search-results');
    const guide = dialog.querySelector('.site-search-guide');
    let previousFocus = null;

    function renderResults(query) {
      const items = searchSite(query);
      guide.textContent = query
        ? (items.length ? items.length + '개의 관련 결과를 찾았어요.' : '일치하는 결과가 없어요. 다른 단어로 검색해 보세요.')
        : '많이 찾는 서비스를 먼저 보여드려요.';
      results.replaceChildren();
      items.forEach(function (item) {
        const link = document.createElement('a');
        const icon = document.createElement('span');
        const copy = document.createElement('span');
        const title = document.createElement('strong');
        const description = document.createElement('small');
        link.className = 'site-search-result';
        link.href = resolvePage(item.href);
        icon.className = 'site-search-result-icon';
        icon.innerHTML = '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
        title.textContent = item.title;
        description.textContent = item.description;
        copy.append(title, description);
        link.append(icon, copy);
        results.appendChild(link);
      });
      if (!items.length) {
        const empty = document.createElement('a');
        empty.className = 'site-search-empty';
        empty.href = resolvePage('customer-center.html');
        empty.innerHTML = '<i class="fa-regular fa-circle-question" aria-hidden="true"></i><span><strong>원하는 답을 찾지 못하셨나요?</strong><small>고객센터에서 자주 묻는 질문을 확인하거나 문의해 주세요.</small></span>';
        results.appendChild(empty);
      }
    }

    function openSearch() {
      previousFocus = document.activeElement;
      dialog.hidden = false;
      document.body.classList.add('site-search-open');
      renderResults(input.value);
      window.setTimeout(function () { input.focus(); }, 0);
    }

    function closeSearch() {
      dialog.hidden = true;
      document.body.classList.remove('site-search-open');
      if (previousFocus && previousFocus.focus) previousFocus.focus();
    }

    buttons.forEach(function (button) {
      button.setAttribute('aria-haspopup', 'dialog');
      button.addEventListener('click', openSearch);
    });
    dialog.querySelectorAll('[data-search-close]').forEach(function (button) {
      button.addEventListener('click', closeSearch);
    });
    dialog.querySelector('form').addEventListener('submit', function (event) {
      event.preventDefault();
      renderResults(input.value);
    });
    input.addEventListener('input', function () {
      renderResults(input.value);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !dialog.hidden) closeSearch();
    });
  }

  window.ZipaiAuth = {
    getUser: getUser,
    login: login,
    logout: logout,
    updateLoginButtons: updateLoginButtons,
    resolvePage: resolvePage
  };

  function initAuthUi() {
    updateLoginButtons();
    setupPendingHeaderLinks();
    setupHeaderActiveState();
    setupFraudSubnav();
    setupSiteSearch();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAuthUi);
  else initAuthUi();
})();
