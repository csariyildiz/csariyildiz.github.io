// script.js

$(document).ready(function() {
  
  WebProject.initializeDarkMode();

  // Bind dark mode toggle to button
  $('#darkModeToggle').click(function() {
    WebProject.toggleDarkMode();
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
