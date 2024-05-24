document.addEventListener("DOMContentLoaded", function() {
    const sign2Button = document.querySelector('.sign2');
    const loginButton = document.querySelector('.Login');
    const log2Button = document.querySelector('.log2');

    sign2Button.addEventListener('click', function(event) {
        event.preventDefault();
        loginButton.textContent = 'Sign Up';
        toggleButtonColor(sign2Button, log2Button);
    });

    log2Button.addEventListener('click', function(event) {
        event.preventDefault();
        loginButton.textContent = 'Log In';
        toggleButtonColor(log2Button, sign2Button);
    });

    function toggleButtonColor(clickedButton, otherButton) {
        // Toggle the clicked button's color
        clickedButton.classList.toggle('toggled');
        
        // Ensure the other button reverts to its original color
        if (otherButton.classList.contains('toggled')) {
            otherButton.classList.remove('toggled');
        }
    }
});