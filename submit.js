document.addEventListener('DOMContentLoaded', () => {
  initializeFAQ();
  initializeSmoothScrolling();
  initializeButtonAnimations();
  initializeModal();
});

function initializeFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', handleFAQToggle);
  });
}

function handleFAQToggle(e) {
  e.preventDefault();
  const button = e.currentTarget;
  const card = button.parentElement;
  const allCards = document.querySelectorAll('.faq-card');
  
  const isCurrentlyOpen = card.classList.contains('faq-card-open');
  
  allCards.forEach(c => {
    if (c.classList.contains('faq-card-open') && c !== card) {
      closeFAQCard(c);
    }
  });
  
  if (!isCurrentlyOpen) {
    openFAQCard(card);
  } else {
    closeFAQCard(card);
  }
}

function openFAQCard(card) {
  card.classList.add('faq-card-open');
  card.innerHTML = `
    <h3>What does "Thumbnail View" on Mobile Mean?</h3>
    <p>Thumbnail View on Mobile means that your thumbnail will be visible in your category on phone as well. Non Boosted listings will only display an icon.</p>
  `;
  setTimeout(() => {
    const newCard = card;
    const closeButton = document.createElement('button');
    closeButton.className = 'faq-question';
    closeButton.innerHTML = `
      <span>What does "Thumbnail View" on Mobile Mean?</span>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 7.5H15" stroke="white" stroke-width="2"/>
      </svg>
    `;
    closeButton.addEventListener('click', handleFAQToggle);
  }, 100);
}

function closeFAQCard(card) {
  card.classList.remove('faq-card-open');
  card.innerHTML = `
    <button class="faq-question">
      <span>What does "Thumbnail View" on Mobile Mean?</span>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 0V15M0 7.5H15" stroke="white" stroke-width="2"/>
      </svg>
    </button>
  `;
  setTimeout(() => {
    const newQuestion = card.querySelector('.faq-question');
    if (newQuestion) {
      newQuestion.addEventListener('click', handleFAQToggle);
    }
  }, 100);
}

function initializeSmoothScrolling() {
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
}

function initializeButtonAnimations() {
  const buttons = document.querySelectorAll('.submit-button, .cta-button');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(5px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(0)';
    });
  });
}

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const background = document.querySelector('.background-image');
  if (background) {
    background.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

const cards = document.querySelectorAll('.testimonial-card, .benefit-card, .stat-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1
});

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});
function initializeModal() {
  const modal = document.getElementById('submitModal');
  const modalOverlay = modal.querySelector('.modal-overlay');
  const submitButtons = document.querySelectorAll('.submit-button, .cta-button');
  
  submitButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });
  
  modalOverlay.addEventListener('click', closeModal);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  const form = modal.querySelector('.submit-form');
  form.addEventListener('submit', handleFormSubmit);
}

function openModal() {
  const modal = document.getElementById('submitModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('submitModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  console.log('Form submitted:', data);
  
  alert('Thank you for your submission! Your AI tool will be reviewed shortly.');
  
  closeModal();
  e.target.reset();
}
