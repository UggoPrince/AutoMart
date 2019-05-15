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
    if(getPageName() === 'home.html'){
        buildCarList(); // from buildCarList.js
        toggleMakeOfferModal(); // toggles modal for
    }
});
