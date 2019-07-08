/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-console */
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

const buildSignupFormData = form => ({
  firstname: form.firstname.value,
  lastname: form.lastname.value,
  address: form.address.value,
  phoneNumber: form.phoneNumber.value,
  email: form.email.value,
  password: form.password.value,
});

const getNotify = () => document.getElementsByClassName('serverNotice')[0];

const displayError = (error) => {
  const errorSpan = document.getElementsByClassName('errorSpan');
  const notify = getNotify();
  if (error.firstname) errorSpan[0].innerHTML = error.firstname;
  if (error.lastname) errorSpan[1].innerHTML = error.lastname;
  if (error.address) errorSpan[2].innerHTML = error.address;
  if (error.phoneNumber) errorSpan[3].innerHTML = error.phoneNumber;
  if (error.email) errorSpan[4].innerHTML = error.email;
  if (error.password) errorSpan[5].innerHTML = error.password;
  if (error.error === 'You already have an account with this email. Login.') {
    notify.innerHTML = 'You already have an account with this email. Login.';
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
  notify.innerHTML = 'Account Successfully Created!';
  const user = JSON.stringify(data);
  localStorage.setItem('autoMartUser', user);
  window.location.replace('home.html');
};


const signup = async (event) => {
  event.preventDefault();
  cleanErrorDisplay();
  const notify = getNotify();
  notify.style.display = 'inline-block';
  notify.style.color = 'green';
  notify.style.background = 'rgb(198, 240, 198)';
  notify.innerHTML = 'Wait. Processing...';
  const url = 'https://automarter.herokuapp.com/api/v1/auth/signup';
  const form = event.target;
  const formData = buildSignupFormData(form);
  const req = await postData(url, formData)
    .then(data => data)
    .catch(error => error);
  if (req.fetchError && req.fetchError === 'Failed to fetch') {
    handleNetworkError();
  } else if (req === 'undefined') {
    handleNetworkError();
  } else if (req.error) {
    handleUserError(req.error);
  } else if (req.status === 201) {
    handleSuccess(req.data);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', signup);
});
