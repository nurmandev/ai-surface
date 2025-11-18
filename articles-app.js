document.addEventListener('DOMContentLoaded', function() {
  // Breaking news carousel
  const newsPrev = document.querySelector('.prev-arrow');
  const newsNext = document.querySelector('.next-arrow');
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
  
  // Newsletter signup handler
  const newsletterInput = document.querySelector('.newsletter-signup input');
  const newsletterBtn = document.querySelector('.newsletter-signup button');
  
  if (newsletterInput && newsletterBtn) {
    newsletterBtn.addEventListener('click', function() {
      const email = newsletterInput.value.trim();
      if (email && email.includes('@')) {
        alert('Thank you for subscribing! You will receive our weekly AI newsletter.');
        newsletterInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
    
    newsletterInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        newsletterBtn.click();
      }
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
        }
      }
    });
  }
  
  // Filter tabs
  const filterTabs = document.querySelectorAll('.tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      filterTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Article card interactions
  const articleCards = document.querySelectorAll('.article-card');
  articleCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (!e.target.closest('.read-more')) {
        const link = card.querySelector('.read-more');
        if (link) {
          link.click();
        }
      }
    });
  });
  
  // Sidebar navigation
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  sidebarItems.forEach(item => {
    if (item.href && item.href.includes('articles.html')) {
      item.classList.add('active');
    }
  });
});
