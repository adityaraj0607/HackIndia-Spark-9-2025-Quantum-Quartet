document.addEventListener("DOMContentLoaded", function() {
    const loadingAnimation = document.createElement("div");
    loadingAnimation.id = "loading-animation";
    loadingAnimation.innerHTML = `<img src="assets/plane-icon.svg" alt="Loading Plane" />`;
    document.body.appendChild(loadingAnimation);

    setTimeout(() => {
        loadingAnimation.style.opacity = 0;
        setTimeout(() => {
            loadingAnimation.remove();
        }, 500);
    }, 3000); // Adjust the duration as needed
});