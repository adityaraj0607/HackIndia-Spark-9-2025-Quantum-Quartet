// Trigger a single slide effect when the page loads
const loginContainer = document.querySelector('.login-container');
loginContainer.style.opacity = '0';
loginContainer.style.transform = 'translateY(-50px)';
setTimeout(() => {
    loginContainer.style.transition = 'opacity 1s ease, transform 1s ease';
    loginContainer.style.opacity = '1';
    loginContainer.style.transform = 'translateY(0)';
}, 200); // Delay for the slide-in effect


