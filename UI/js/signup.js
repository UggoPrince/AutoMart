const signup = (event) => {
    event.preventDefault();
    const person = JSON.stringify({userType: 'user'})
    localStorage.setItem('user', person);
    window.location.replace('home.html');
};
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', signup);
});