/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */


// eslint-disable-next-line no-unused-vars
const urlParams = () => new URLSearchParams(window.location.search);

// eslint-disable-next-line no-unused-vars
const createElement = tag => document.createElement(tag);

// eslint-disable-next-line no-unused-vars
const getElemId = id => document.getElementById(id);

function slideToggle() {
  const navList = document.getElementsByClassName('nav-list')[0];
  this.classList.toggle('active');
  if (navList.style.display === 'inline-block') {
    navList.style.display = 'none';
  } else {
    navList.style.display = 'inline-block';
  }
}

const getPageName = () => {
  const url = window.location.href;
  const x = url.lastIndexOf('/') + 1;
  const dot = url.lastIndexOf('.html');
  const page = `${url.substring(x, dot)}.html`;
  return page;
};

const signOut = (page = 'index.html') => {
  localStorage.removeItem('autoMartUser');
  window.location.replace(page);
};

const signOutSetup = () => {
  const signoutLink = document.getElementById('signoutLink');
  signoutLink.addEventListener('click', signOut);
};

document.addEventListener('DOMContentLoaded', () => {
  let user = '';
  const pageName = getPageName();
  if (localStorage.getItem('autoMartUser')) {
    user = JSON.parse(localStorage.getItem('autoMartUser'));
    signOutSetup();
  } else if (pageName === 'adminhome.html'
        || pageName === 'home.html'
        || pageName === 'dashboard.html') {
    window.location.replace('index.html');
  }
  const navToggle = document.getElementById('nav-toggle');
  navToggle.addEventListener('click', slideToggle);
  // toggleSoldOnDashboard(); // marks your Ads Sold or not
  if (((pageName === 'signup.html' || pageName === 'signin.html' || pageName === 'index.html') && user !== '')) {
    window.location.replace('home.html');
  }
});
