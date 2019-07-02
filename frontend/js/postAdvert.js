/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */

const postData = async (url, formData) => {
  const { token } = JSON.parse(localStorage.getItem('autoMartUser'));
  const serverRes = await fetch(url, {
    method: 'POST',
    headers: {
      Authentication: `${token}`,
      // 'Content-Type': 'application/json',
    },
    body: formData,
  }).then(response => response.json())
    .catch(error => ({ fetchError: error.message }));
  return serverRes;
};

const buildPostAdvertData = (form) => {
  const formData = new FormData();
  formData.append('bodyType', form.bodyType.value);
  formData.append('state', form.state.value);
  formData.append('status', 'available');
  formData.append('manufacturer', form.manufacturer.value);
  formData.append('model', form.model.value);
  formData.append('photo', form.photo.files[0]);
  formData.append('price', form.price.value);
  formData.append('title', form.title.value);
  return formData;
};

const getNotify = () => document.getElementsByClassName('serverNotice')[0];

const displayError = (error) => {
  const errorSpan = document.getElementsByClassName('errorSpan');
  const notify = getNotify();
  if (error.bodyType) errorSpan[0].innerHTML = error.bodyType;
  if (error.state) errorSpan[1].innerHTML = error.state;
  if (error.manufacturer) errorSpan[2].innerHTML = error.manufacturer;
  if (error.model) errorSpan[3].innerHTML = error.model;
  if (error.image) errorSpan[4].innerHTML = error.image;
  if (error.price) errorSpan[5].innerHTML = error.price;
  if (error.title) errorSpan[6].innerHTML = error.title;
  if (error.status === 401) {
    notify.innerHTML = 'Session expired, login';
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

const handleUserError = (reqError) => {
  const notify = getNotify();
  notify.style.color = 'red';
  notify.style.background = 'rgb(255, 182, 182)';
  if (reqError.status === 401 && reqError.status === 'Session expired, login') {
    notify.innerHTML = 'Session expired, login to continue.';
  } else notify.innerHTML = 'Unsuccessful!';
  displayError(reqError.error);
};

const closeModalAfterSuccess = () => {
  setTimeout(() => {
    const postAdvertModal = document.getElementById('postAdvertModal');
    postAdvertModal.style.display = 'none';
  }, 1000);
};

const handleSuccess = (data) => {
  const notify = getNotify();
  notify.innerHTML = 'Car Advert Created.';
  const person = JSON.stringify(data);
  localStorage.setItem('autoMartUser', person);
  closeModalAfterSuccess();
};

const postAdvert = async (event) => {
  event.preventDefault();
  cleanErrorDisplay();
  const notify = getNotify();
  notify.style.display = 'inline-block';
  notify.style.color = 'green';
  notify.style.background = 'rgb(198, 240, 198)';
  notify.innerHTML = 'Wait. Processing...';
  const url = 'https://automarter.herokuapp.com/api/v1/car/';
  const form = event.target;
  const formData = buildPostAdvertData(form);
  const req = await postData(url, formData)
    .then(data => data)
    .catch(error => error);
  console.log(req);
  if (req.fetchError && req.fetchError === 'Failed to fetch') {
    handleNetworkError();
  } else if (req === 'undefined') {
    handleNetworkError();
  } else if (req.error) {
    handleUserError(req);
  } else if (req.status === 201) {
    handleSuccess(req.data);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('postAdvertForm');
  signupForm.addEventListener('submit', postAdvert);
});
