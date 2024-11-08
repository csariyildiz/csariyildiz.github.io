// project.js
var wproject = {
  
  toggleTheme: function() {
    if (localStorage.getItem('darkMode') === 'enabled') {
      $('body').addClass('dark-mode');
    }
  }
};
