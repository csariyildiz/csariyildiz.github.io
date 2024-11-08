// project.js
var acsWebProject = {
  toggleDarkMode: function() {
    $('body').toggleClass('dark-mode');
    localStorage.setItem('darkMode', $('body').hasClass('dark-mode') ? 'enabled' : 'disabled');
  },
  
  initializeDarkMode: function() {
    if (localStorage.getItem('darkMode') === 'enabled') {
      $('body').addClass('dark-mode');
    }
  }
};
