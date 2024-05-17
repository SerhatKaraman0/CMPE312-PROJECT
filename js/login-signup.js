document.addEventListener("DOMContentLoaded", function() {
    const sign2Button = document.querySelector('.sign2');
    const loginButton = document.querySelector('.Login');
    const log2Button = document.querySelector('.log2')

    sign2Button.addEventListener('click', function() {
      loginButton.textContent = 'Sign Up';
    });
    
    log2Button.addEventListener('click', function() {
        loginButton.textContent = 'Log In';
      });
    
  });