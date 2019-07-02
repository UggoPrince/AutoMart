/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */

const postData = async (url, formData) => {
  const serverRes = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  }).then(response => response.json())
    .catch(error => ({ fetchError: error.message }));
  return serverRes;
};

const buildLoginFormData = form => ({
  email: form.email.value,
  password: form.password.value,
});

const getNotify = () => document.getElementsByClassName('serverNotice')[0];

const displayError = (error) => {
  const errorSpan = document.getElementsByClassName('errorSpan');
  const notify = getNotify();
  if (error.email) errorSpan[0].innerHTML = error.email;
  if (error.password) errorSpan[1].innerHTML = error.password;
  if (error.error === 'You do not have an account. Sign up now.') {
    notify.innerHTML = 'You do not have an account. Sign up now.';
  } else if (error.error === 'Incorrect email/password') {
    notify.innerHTML = 'Incorrect email or password.';
  }
};

const cleanErrorDisplay = () => {
  const errorSpan = document.querySelectorAll('.errorSpan');
  errorSpan.forEach((element) => {
    element.innerHTML = '';
  });
};

const handleNetworkError = () => {
  const notify = getNotify();
  notify.style.color = 'red';
  notify.style.background = 'rgb(255, 182, 182)';
  notify.innerHTML = 'Not connecting. Check your network.';
};

const handleUserError = (error) => {
  const notify = getNotify();
  notify.style.color = 'red';
  notify.style.background = 'rgb(255, 182, 182)';
  notify.innerHTML = 'Unsuccessful!';
  displayError(error);
};

const handleSuccess = (data) => {
  const notify = getNotify();
  notify.innerHTML = 'Login Successful!';
  const user = JSON.stringify(data);
  localStorage.setItem('autoMartUser', user);
  window.location.replace('dashboard.html');
};

const signin = async (event) => {
  event.preventDefault();
  cleanErrorDisplay();
  const notify = getNotify();
  notify.style.display = 'inline-block';
  notify.style.color = 'green';
  notify.style.background = 'rgb(198, 240, 198)';
  notify.innerHTML = 'Wait. Processing...';
  const url = 'https://automarter.herokuapp.com/api/v1/auth/signin';
  const form = event.target;
  const formData = buildLoginFormData(form);
  const req = await postData(url, formData)
    .then(data => data)
    .catch(error => error);
  if (req.fetchError && req.fetchError === 'Failed to fetch') {
    handleNetworkError();
  } else if (req === 'undefined') {
    handleNetworkError();
  } else if (req.error) {
    handleUserError(req.error);
  } else if (req.status === 200) {
    handleSuccess(req.data);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signinForm');
  signupForm.addEventListener('submit', signin);
});
