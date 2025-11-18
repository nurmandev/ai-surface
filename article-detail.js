document.addEventListener('DOMContentLoaded', function() {
  // Breaking news carousel
  const newsPrev = document.querySelector('.news-prev');
  const newsNext = document.querySelector('.news-next');
  const newsContent = document.querySelector('.breaking-content p');
  
  const newsItems = [
    'Mobile Data, Not Internet Service Providers, To Be Blocked In Bali During Nyepi March 19, 2018',
    'OpenAI Announces GPT-5 with Revolutionary AI Capabilities and Enhanced Performance',
    'Google DeepMind Unveils Breakthrough in Quantum AI Processing Technology',
    'Meta Launches Advanced AI Assistant with Multimodal Understanding Features'
  ];
  
  let currentNewsIndex = 0;
  
  if (newsPrev && newsNext && newsContent) {
    newsNext.addEventListener('click', function() {
      currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
      newsContent.textContent = newsItems[currentNewsIndex];
    });
    
    newsPrev.addEventListener('click', function() {
      currentNewsIndex = (currentNewsIndex - 1 + newsItems.length) % newsItems.length;
      newsContent.textContent = newsItems[currentNewsIndex];
    });
    
    setInterval(function() {
      currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
      newsContent.textContent = newsItems[currentNewsIndex];
    }, 5000);
  }
  
  // Article navigation (prev/next article)
  const articlePrev = document.querySelector('.article-nav .nav-prev');
  const articleNext = document.querySelector('.article-nav .nav-next');
  
  if (articlePrev) {
    articlePrev.addEventListener('click', function() {
      console.log('Navigate to previous article');
      // In a real application, this would navigate to the previous article
      window.location.href = 'articles.html';
    });
  }
  
  if (articleNext) {
    articleNext.addEventListener('click', function() {
      console.log('Navigate to next article');
      // In a real application, this would navigate to the next article
      window.location.href = 'articles.html';
    });
  }
  
  // Search functionality
  const searchInput = document.querySelector('.search-box input');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const searchTerm = this.value.trim();
        if (searchTerm) {
          console.log('Searching for:', searchTerm);
          // In a real application, this would perform a search
        }
      }
    });
  }
  
  // Submit tool button
  const submitBtn = document.querySelector('.submit-tool-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', function() {
      console.log('Submit a tool clicked');
      // In a real application, this would open a submission form
    });
  }
  
  // Sidebar navigation
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  sidebarItems.forEach(item => {
    if (item.href && (item.href.includes('articles.html') || item.href.includes('article-detail.html'))) {
      item.classList.add('active');
    }
  });
  
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
