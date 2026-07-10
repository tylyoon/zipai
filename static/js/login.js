(function () {
  'use strict';

  const auth = window.ZipaiAuth;
  const form = document.getElementById('loginForm');

  if (!auth || !form) return;
  if (auth.getUser()) {
    window.location.replace(auth.resolvePage('index.html'));
    return;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    auth.login(form.elements.userId.value);
    form.reset();
    window.location.href = auth.resolvePage('index.html');
  });
})();
