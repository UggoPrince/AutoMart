/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* global document:true */

function slideToggle() {
  const navList = document.getElementsByClassName('nav-list')[0];
  this.classList.toggle('active');
  if (navList.style.display === 'block') {
    navList.style.display = 'none';
  } else {
    navList.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  navToggle.addEventListener('click', slideToggle);
  // toggleSoldOnDashboard(); // marks your Ads Sold or not
});
