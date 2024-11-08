// script.js
function toggleDarkMode() {
  $('body').toggleClass('dark-mode');
  localStorage.setItem('darkMode', $('body').hasClass('dark-mode') ? 'enabled' : 'disabled');
}

function initializeDarkMode() {
  if (localStorage.getItem('darkMode') === 'enabled') {
    $('body').addClass('dark-mode');
  }
}

$(document).ready(function() {

  $('#darkModeToggle').click(function() {
    toggleDarkMode();
  });

  $('.container').fadeIn();

      $('#convertButton').click(function() {
        const htmlContent = $('#htmlInput').val();
        
        // Create a new instance of Showdown's converter
        const converter = new showdown.Converter({ tables: true, simplifiedAutoLink: true });
        
        // Convert HTML to Markdown
        const markdown = converter.makeMarkdown(htmlContent);
        
        // Display the result
        $('#markdownOutput').text(markdown);
      });
    });
