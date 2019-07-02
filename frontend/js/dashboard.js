/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
let dashBoardMobileMenuOpen = false;
const toggleDashboardMenu = (dashboardMenu) => {
  if (!dashBoardMobileMenuOpen) {
    dashboardMenu.style.display = 'inline-block';
    dashBoardMobileMenuOpen = true;
  } else {
    dashboardMenu.style.display = 'none';
    dashBoardMobileMenuOpen = false;
  }
};

const togglePostAdvertModal = () => {
  const postAdvertModal = document.getElementById('postAdvertModal');
  const revealPostAdvertModal = document.getElementsByClassName('revealPostAdvertModal')[0];
  const span = document.getElementsByClassName('close')[0]; // Get the <span> element that closes the modal

  span.addEventListener('click', () => { // When the user clicks on <span> (x), close the modal
    postAdvertModal.style.display = 'none';
  });

  // When the user clicks the tab, open the modal
  revealPostAdvertModal.addEventListener('click', () => {
    postAdvertModal.style.display = 'block';
  });

  window.addEventListener('click', (event) => {
    if (event.target === postAdvertModal) {
      postAdvertModal.style.display = 'none';
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const menuButtonForMobile = document.getElementById('dashbaordMenuButton');
  const dashboardMenu = document.getElementById('dashboard-header');
  menuButtonForMobile.addEventListener('click', () => {
    toggleDashboardMenu(dashboardMenu);
  });
  togglePostAdvertModal();
});
