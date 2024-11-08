// project.js
var wProject = {
  
  toggleTheme: function() {
    if (localStorage.getItem('darkMode') === 'enabled') {
      $('body').addClass('dark-mode');
    }
  }
};
