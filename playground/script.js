document.addEventListener('DOMContentLoaded', () => {
  // Loading bar initialization
  NProgress.start();
  window.addEventListener('load', () => {
   
  const toggleButton = document.getElementById('theme-toggle');
  const topButton = document.getElementById('top-button');

  // Function to set the theme and update button text
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateButtonText(theme);
  }

  // Function to update button text
  function updateButtonText(theme) {
    if (theme === 'dark') {
      toggleButton.textContent = '🌙 Light Mode';
      toggleButton.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
      toggleButton.textContent = '🔅 Dark Mode';
      toggleButton.setAttribute('aria-label', 'Switch to Dark Mode');
    }
  }

  // Get the current theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    // Apply saved theme
    setTheme(savedTheme);
  } else {
    // Apply system preference if available
    const userPreferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(userPreferredTheme);
  }

  // Add click event listener to the button
  toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // Debounced scroll function
  function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      topButton.style.display = "block";
    } else {
      topButton.style.display = "none";
    }
  }
  
  window.onscroll = debounce(scrollFunction);

  topButton.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
    
    NProgress.done();

    // Fade in the page
    document.body.style.opacity = 1;
  });

  // Fallback to show the loading bar immediately in case of long load times
  setTimeout(() => {
    if (document.readyState !== 'complete') {
      NProgress.inc();  // Show some progress even if the page isn't fully loaded
    }
  }, 100);  // Adjust the timeout as needed to trigger after a brief delay
});
