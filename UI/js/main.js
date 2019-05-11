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

document.addEventListener('DOMContentLoaded', ()=>{
    let nav_toggle = document.getElementById('nav-toggle');
    nav_toggle.addEventListener('click', slideToggle);
});
