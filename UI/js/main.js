//import { buildCarList } from './buildCarList.js';

let navOpen = false;

function slideToggle() {
    let navList = document.getElementsByClassName('nav-list')[0];
    this.classList.toggle('active');
    if(navOpen) {
        navOpen = false;
        navList.style.display = 'none';
    }
    else {
        navOpen = true;
        navList.style.display = 'block';
    }
}

const toggleSoldOnDashboard = () => { // marks your Ad Sold or not
    const markSold = document.getElementsByClassName('markSold');
    const soldMarker = document.getElementsByClassName('soldMarker');
    for (let i = 0; i < markSold.length; i++) {
        soldMarker[i].addEventListener('change', (event) => {
            if(event.target.checked) {
                markSold[i].style.background = 'green';
                markSold[i].style.color = 'white';
                markSold[i].innerHTML = 'Sold'
            } else {
                markSold[i].style.background = '#ddd';
                markSold[i].style.color = 'black';
                markSold[i].innerHTML = 'Mark as Sold'
            }
        });
    }
};

const toggleMakeOfferModal = () => {
    const makeOfferModal = document.getElementById("makeOfferModalHome"); // Get the modal
    const btn = document.getElementsByClassName("revealOfferModal"); // Get the button that opens the modal
    const span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal

    span.addEventListener('click', () => { // When the user clicks on <span> (x), close the modal
        makeOfferModal.style.display = "none";
    });
    
    for (let i = 0; i < btn.length; i++) { // When the user clicks the button, open the modal
        btn[i].addEventListener('click', () => {
            makeOfferModal.style.display = "block";
        });
    }
    window.addEventListener('click', (event) => { // When the user clicks anywhere outside of the modal, close it
        if (event.target == makeOfferModal) {
            makeOfferModal.style.display = "none";
        }
    });
};

const buildReportFeatures = () => {
    const reportFraudModal = document.getElementById("reportFraudByUser"); // Get the modal
    const report_btn = document.getElementsByClassName("revealReportModal"); // Get the button that opens the modal
    const report_span = document.getElementsByClassName("close")[1]; // Get the <span> element that closes the modal

    report_span.addEventListener('click', () => { // When the user clicks on <span> (x), close the modal
        reportFraudModal.style.display = "none";
    });

    for (let i = 0; i < report_btn.length; i++) { // When the user clicks the button, open the modal
        report_btn[i].addEventListener('click', () => {
            reportFraudModal.style.display = "block";
        });
    }
    window.addEventListener('click', (event) => { // When the user clicks anywhere outside of the modal, close it
        if (event.target == reportFraudModal) {
            reportFraudModal.style.display = 'none';
        }
    });
};

const toggleDashboardTabs = () => {
    const tabs = document.getElementsByClassName('dtab');
    const tablink = document.getElementsByClassName('tabLink');
    const tablink2 = document.getElementsByClassName('tabLink2');
    tablink[0].addEventListener('click', () => {hideAndShowTabs(tabs, 0, 1, 2);});
    tablink[1].addEventListener('click', () => {hideAndShowTabs(tabs, 1, 0, 2);});
    tablink[2].addEventListener('click', () => {hideAndShowTabs(tabs, 2, 0, 1);});

    const dashMenu = document.getElementsByClassName('dashMenu')[0];
    dashMenu.addEventListener('click', hideMobileSideMenu);
    
    tablink2[0].addEventListener('click', () => {hideAndShowTabs(tabs, 0, 1, 2); hideMobileSideMenu();});
    tablink2[1].addEventListener('click', () => {hideAndShowTabs(tabs, 1, 0, 2); hideMobileSideMenu();});
    tablink2[2].addEventListener('click', () => {hideAndShowTabs(tabs, 2, 0, 1); hideMobileSideMenu();});
};

let mobileSideMenuOpen = false;

const hideMobileSideMenu = () => {
    const side_nav_list2 = document.getElementsByClassName('side-nav-list2')[0];
    if (!mobileSideMenuOpen) {
        side_nav_list2.style.display = 'block';
        mobileSideMenuOpen = true;
    } else {
        side_nav_list2.style.display = 'none';
        mobileSideMenuOpen = false;
    }
};

const hideAndShowTabs = (tabs, a, b, c) => {
    tabs[b].style.display = 'none';
    tabs[c].style.display = 'none';
    tabs[a].style.display = 'block';
};

const getPageName = () => {
    let url = window.location.href;
    const x = url.lastIndexOf('/')+1;
    const page = url.substring(x);
    return page;
}

document.addEventListener('DOMContentLoaded', ()=>{
    let nav_toggle = document.getElementById('nav-toggle');
    nav_toggle.addEventListener('click', slideToggle);
    toggleSoldOnDashboard(); // marks your Ads Sold or not
    if (getPageName() === 'home.html'){
        buildCarList('user'); // from buildCarList.js
        toggleMakeOfferModal(); // toggles modal for making offers
        buildReportFeatures(); // toggles report fraud modal
    }
    if (getPageName() === 'adminhome.html') {
        buildCarList('admin'); // from buildCarList.js
        toggleMakeOfferModal(); // toggles modal for
    }
    if (getPageName() === 'dashboard.html') {
        toggleDashboardTabs();
    }
    if (getPageName() === 'car.html') {
        toggleMakeOfferModal();
    }
});
