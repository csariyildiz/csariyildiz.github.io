// project.js
var acsWebProject = {
  
  toggleTheme: function() {
    if (localStorage.getItem('darkMode') === 'enabled') {
      $('body').addClass('dark-mode');
    }
  }
};
