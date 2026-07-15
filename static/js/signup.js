(function () {
  'use strict';

  const auth = window.ZipaiAuth;
  const form = document.getElementById('signupForm');

  if (!auth || !form) return;
  if (auth.getUser()) {
    window.location.replace(auth.resolvePage('index.html'));
    return;
  }

  const password = form.elements.password;
  const passwordConfirm = form.elements.passwordConfirm;

  function validatePasswordMatch() {
    const hasValues = password.value && passwordConfirm.value;
    const message = hasValues && password.value !== passwordConfirm.value ? '비밀번호가 일치하지 않습니다.' : '';
    passwordConfirm.setCustomValidity(message);
  }

  password.addEventListener('input', validatePasswordMatch);
  passwordConfirm.addEventListener('input', validatePasswordMatch);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    validatePasswordMatch();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    auth.login(form.elements.userId.value);
    form.reset();
    window.location.href = auth.resolvePage('index.html');
  });
})();
