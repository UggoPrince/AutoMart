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

const toggleSearchBoxType = () => {
    const searchType = document.getElementById('searchType');
    searchType.options.selectedIndex = 0;
    disableSearchBoxes();

    searchType.addEventListener('change', (event) => {
        const val = parseInt(event.target.value, 10);
        if (val === 0) {
            disableSearchBoxes();
            displaySearchBoxDivs(0, 'none');
            displaySearchBoxDivs(1, 'none');
            displaySearchBoxDivs(2, 'none');
        } else if (val === 1) {
            enableStateSearchBoxes(false, 'default'); // enable search by state
            enablePriceSearchBoxes(true, 'not-allowed'); // disable
            enableManufacturerSearchBox(true, 'not-allowed');
            enableSearchButton(false, 'default') // enable
            displaySearchBoxDivs(0, 'block');
            displaySearchBoxDivs(1, 'none');
            displaySearchBoxDivs(2, 'none');
        } else if (val === 2) {
            enablePriceSearchBoxes(false, 'default'); // enable
            enableStateSearchBoxes(true, 'not-allowed') // disable
            enableManufacturerSearchBox(true, 'not-allowed');
            enableSearchButton(false, 'default') // enable
            displaySearchBoxDivs(0, 'none');
            displaySearchBoxDivs(1, 'block');
            displaySearchBoxDivs(2, 'none');
        } else if (val === 3) {
            enablePriceSearchBoxes(true, 'not-allowed'); // disable
            enableStateSearchBoxes(true, 'not-allowed') // disable
            enableManufacturerSearchBox(false, 'default'); // enable
            enableSearchButton(false, 'default') // enable
            displaySearchBoxDivs(0, 'none');
            displaySearchBoxDivs(1, 'none');
            displaySearchBoxDivs(2, 'block');
        }
    });
};

const displaySearchBoxDivs = (n, show) => {
    const searchBoxDiv = document.getElementsByClassName('searchBoxBodyDiv');
    searchBoxDiv[n].style.display = show;
};

const disableSearchBoxes = () => {
    enableStateSearchBoxes(true, 'not-allowed'); // disable
    enablePriceSearchBoxes(true, 'not-allowed'); // disable
    enableSearchButton(true, 'not-allowed'); // disable search button
    enableManufacturerSearchBox(true, 'not-allowed');
};

const enableStateSearchBoxes = (truthy, cursor) => {
    const searchState = document.getElementById('searchTypeOfState');
    searchState.disabled = truthy;
    searchState.style.cursor = cursor;
};

const enablePriceSearchBoxes = (truthy, cursor) => {
    const searchPrice = document.getElementsByClassName('searchTypeOfPrice');
    searchPrice[0].disabled = truthy;
    searchPrice[0].style.cursor = cursor;
    searchPrice[1].disabled = truthy;
    searchPrice[1].style.cursor = cursor;
};

const enableManufacturerSearchBox = (truthy, cursor) => {
    const searchManufact = document.getElementById('searchTypeOfManufacturer');
    searchManufact.disabled = truthy;
    searchManufact.style.cursor = cursor;
}

const enableSearchButton = (truthy, cursor) => {
    const searchButton = document.getElementById('searchButton');
    searchButton.disabled = truthy;
    searchButton.style.cursor = cursor;
};

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

const togglePostAdvertModal = () => {
    const postAdvertModal = document.getElementById('postAdvertModal');
    const revealPostAdvertModal = document.getElementsByClassName('revealPostAdvertModal');
    const span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal

    span.addEventListener('click', () => { // When the user clicks on <span> (x), close the modal
        postAdvertModal.style.display = "none";
    });
    
    for (let i = 0; i < revealPostAdvertModal.length; i++) { // When the user clicks the tab, open the modal
        revealPostAdvertModal[i].addEventListener('click', () => {
            postAdvertModal.style.display = "block";
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === postAdvertModal) {
            postAdvertModal.style.display = "none"
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
const signOutSetup = () => {
    const signoutLink = document.getElementById('signoutLink');
    signoutLink.addEventListener('click', signOut);
};
const signOut = () => {
    localStorage.removeItem('autoMartUser');
    window.location.replace('index.html');
};

document.addEventListener('DOMContentLoaded', ()=>{
    let user = '';
    const pageName = getPageName();
    if (localStorage.getItem('autoMartUser')) {
        user = JSON.parse(localStorage.getItem('autoMartUser'));
    } else {
        if (pageName === 'adminhome.html'
        || pageName === 'home.html'
        || pageName === 'car.html'
        || pageName === 'dashboard.html'
        || pageName === 'postad.html') {
            window.location.replace('index.html');
        }
    }

    
    let nav_toggle = document.getElementById('nav-toggle');
    nav_toggle.addEventListener('click', slideToggle);
    toggleSoldOnDashboard(); // marks your Ads Sold or not
    if(getPageName() === '' || getPageName() === 'index.html') {
        toggleSearchBoxType();
        buildCarList('noUser');
    }
    if (getPageName() === 'home.html'){
        if (user !== '' && user.userType === 'admin')
            window.location.replace('adminhome.html');
        toggleSearchBoxType();
        buildCarList('user'); // from buildCarList.js
        toggleMakeOfferModal(); // toggles modal for making offers
        buildReportFeatures(); // toggles report fraud modal
        signOutSetup();
    }
    if (getPageName() === 'adminhome.html') {
        if (user !== '' && user.userType === 'user')
            window.location.replace('home.html');
        toggleSearchBoxType();
        buildCarList('admin'); // from buildCarList.js
        toggleMakeOfferModal(); // toggles modal for
        signOutSetup();
    }
    if (getPageName() === 'dashboard.html') {
        toggleDashboardTabs();
        togglePostAdvertModal();
        signOutSetup();
    }
    if (getPageName() === 'car.html') {
        toggleMakeOfferModal();
        signOutSetup();
    }

    if ((getPageName() === 'signup.html'
        || getPageName() === 'signin.html') 
        && user !== '') {
        if (user.userType === 'admin')
            window.location.replace('adminhome.html');
        else 
            window.location.replace('home.html');
    }
});
