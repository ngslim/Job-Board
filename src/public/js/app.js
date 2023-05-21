//login functions
const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const postRegisterForm = document.querySelector('#post-register-form');

function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector('small');

  parent.classList.add('error');
  small.innerText = message;
}

function checkEmpty(listInput) {
  let isEmpty = false;
  listInput.forEach((input) => {
    input.value = input.value.trim();
    if (!input.value) {
      isEmpty = true;
      showError(input, 'Không được để trống');
    } else {
      showSuccess(input);
    }
  });

  return isEmpty;
}

function checkEmail(input) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  input.value = input.value.trim();

  let validEmail = regex.test(input.value);

  if (validEmail) {
    showSuccess(input);
  } else {
    showError(input, 'Email không hợp lệ');
  }

  return validEmail;
}

function checkConfirmPassword(input, confirmInput) {
  input.value = input.value.trim();
  confirmInput.value = confirmInput.value.trim();

  if (input.value != confirmInput.value) {
    showError(confirmInput, 'Mật khẩu không khớp');
    return false;
  }

  showSuccess(confirmInput);
  return true;
}

function checkLength(input, min, max) {
  input.value = input.value.trim();

  if (input.value.length < min) {
    showError(input, `Tối thiểu ${min} ký tự`);
    return true;
  } else if (input.value.length > max) {
    showError(input, `Tối đa ${max} ký tự`);
    return true;
  }
  showSuccess(input);
  return false;
}

function checkPhone(input) {
  if (!input.value) {
    return true;
  }

  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i;
  input.value = input.value.trim();

  let validPhone = regex.test(input.value);

  if (validPhone) {
    showSuccess(input);
  } else {
    showError(input, 'Số điện thoại không hợp lệ');
  }

  return validPhone;
}

function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector('small');

  parent.classList.remove('error');
  small.innerText = '';
}

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    e.preventDefault();
    if (checkEmpty([username, password])) return;
    loginForm.submit();
  });
}

if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirm-password');
    const email = document.querySelector('#email');
    e.preventDefault();
    if (checkEmpty([username, email, password, confirmPassword])) return;
    if (!checkEmail(email)) return;
    if (checkLength(username, 6, 25)) return;
    if (checkLength(password, 6, 25)) return;
    if (!checkConfirmPassword(password, confirmPassword)) return;
    registerForm.submit();
  });
}

if (postRegisterForm) {
  postRegisterForm.addEventListener('submit', function (e) {
    const firstname = document.querySelector('#firstname');
    const lastname = document.querySelector('#lastname');
    const address = document.querySelector('#address');
    const school = document.querySelector('#school');
    const phone = document.querySelector('#phone');
    const dob = document.querySelector('#dob');

    e.preventDefault();

    if (checkEmpty([firstname, lastname])) return;
    if (!checkPhone(phone)) return;
    postRegisterForm.submit();
  });
}
