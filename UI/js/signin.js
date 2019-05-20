const signin = (event) => {
    event.preventDefault();
    const f = event.target;
    if (f.email.value === 'mrjohndoe@gmail.com' && f.password.value === '12345678') {
        const person = JSON.stringify({userType: 'admin'})
        localStorage.setItem('autoMartUser', person);
        window.location.replace('adminhome.html');
    } else {
        const person = JSON.stringify({userType: 'user'})
        localStorage.setItem('autoMartUser', person);
        window.location.replace('home.html');
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signinForm');
    signinForm.addEventListener('submit', signin);
});