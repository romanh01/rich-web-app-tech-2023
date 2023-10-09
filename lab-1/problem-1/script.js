function displayWindowWidth() {
    const windowWidth = window.innerWidth;

    // Display window width below
    const windowWidthDisplay = document.querySelector('#windowWidthDisplay p');
    if (windowWidthDisplay) {
        windowWidthDisplay.textContent = 'Window Width: ' + windowWidth + 'px';
    }
}

displayWindowWidth();
window.addEventListener('resize', displayWindowWidth);