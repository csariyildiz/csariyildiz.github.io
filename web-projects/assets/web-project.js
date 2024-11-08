// web-project.js

function toggleDarkMode() {
  $('body').toggleClass('dark-mode');
  localStorage.setItem('darkMode', $('body').hasClass('dark-mode') ? 'enabled' : 'disabled');
}

function initializeDarkMode() {
  if (localStorage.getItem('darkMode') === 'enabled') {
    $('body').addClass('dark-mode');
  }
}

export { toggleDarkMode, initializeDarkMode };
