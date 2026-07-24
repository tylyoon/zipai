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
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAuthUi);
  else initAuthUi();
})();
