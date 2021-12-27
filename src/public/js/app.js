//login functions
const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');

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
      showError(input, 'Must enter something');
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
    showError(input, 'Email invalid');
  }

  return validEmail;
}

function checkConfirmPassword(input, confirmInput) {
  input.value = input.value.trim();
  confirmInput.value = confirmInput.value.trim();

  if (input.value != confirmInput.value) {
    showError(confirmInput, "Password doesn't match");
    return false;
  }

  showSuccess(confirmInput);
  return true;
}

function checkLength(input, min, max) {
  input.value = input.value.trim();

  if (input.value.length < min) {
    showError(input, `Must has at least ${min} letters`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `Must has at most ${max} letters`);
    return false;
  }
  showSuccess(input);
  return true;
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
    if (checkEmail(email)) return;
    if (checkLength(username, 6, 25)) return;
    if (checkLength(password, 6, 25)) return;
    if (checkConfirmPassword(password, confirmPassword)) return;
  });
}
