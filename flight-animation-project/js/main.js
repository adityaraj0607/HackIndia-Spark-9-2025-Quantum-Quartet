// This file contains the JavaScript code that triggers the flight animation when the website is loading.

document.addEventListener("DOMContentLoaded", function() {
    const loadingAnimation = document.getElementById("loading-animation");
    const mainContent = document.getElementById("main-content");

    // Show loading animation
    loadingAnimation.style.display = "block";

    // Simulate loading time
    setTimeout(() => {
        // Hide loading animation
        loadingAnimation.style.display = "none";
        // Show main content
        mainContent.style.display = "block";
    }, 3000); // Adjust the time as needed
});