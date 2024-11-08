    $(document).ready(function() {
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
