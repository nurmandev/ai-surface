document.addEventListener("DOMContentLoaded", function () {
  // Breaking news carousel
  const newsPrev = document.querySelector(".news-prev");
  const newsNext = document.querySelector(".news-next");
  const newsContent = document.querySelector(".news-content p");

  const newsItems = [
    "Mobile Data, Not Internet Service Providers, To Be Blocked In Bali During Nyepi March 19, 2018",
    "OpenAI Announces GPT-5 with Revolutionary AI Capabilities and Enhanced Performance",
    "Google DeepMind Unveils Breakthrough in Quantum AI Processing Technology",
    "Meta Launches Advanced AI Assistant with Multimodal Understanding Features",
  ];

  let currentNewsIndex = 0;

  if (newsPrev && newsNext && newsContent) {
    newsNext.addEventListener("click", function () {
      currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
      newsContent.textContent = newsItems[currentNewsIndex];
    });

    newsPrev.addEventListener("click", function () {
      currentNewsIndex =
        (currentNewsIndex - 1 + newsItems.length) % newsItems.length;
      newsContent.textContent = newsItems[currentNewsIndex];
    });

    setInterval(function () {
      currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
      newsContent.textContent = newsItems[currentNewsIndex];
    }, 5000);
  }

  const emailInput = document.querySelector(".email-input");
  if (emailInput) {
    emailInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const subscribeBtn = document.querySelector(".subscribe-btn");
        if (subscribeBtn) {
          subscribeBtn.click();
        }
      }
    });
  }

  const subscribeBtn = document.querySelector(".subscribe-btn");
  if (subscribeBtn) {
    subscribeBtn.addEventListener("click", function () {
      const email = emailInput ? emailInput.value.trim() : "";
      if (email && email.includes("@")) {
        alert(
          "Thank you for subscribing! You will receive our weekly AI newsletter."
        );
        if (emailInput) emailInput.value = "";
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }

  const footerEmailInput = document.querySelector(".newsletter-footer-input");
  const footerSubscribeBtn = document.querySelector(".newsletter-footer-btn");

  if (footerEmailInput) {
    footerEmailInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (footerSubscribeBtn) {
          footerSubscribeBtn.click();
        }
      }
    });
  }

  if (footerSubscribeBtn) {
    footerSubscribeBtn.addEventListener("click", function () {
      const email = footerEmailInput ? footerEmailInput.value.trim() : "";
      if (email && email.includes("@")) {
        alert(
          "Thank you for subscribing! You will receive our weekly AI newsletter."
        );
        if (footerEmailInput) footerEmailInput.value = "";
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }

  const newsCards = document.querySelectorAll(".news-card");
  newsCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      if (!e.target.closest(".news-link")) {
        const link = card.querySelector(".news-link");
        if (link) {
          link.click();
        }
      }
    });
  });

  const promptCards = document.querySelectorAll(".prompt-card");
  promptCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      if (!e.target.closest(".prompt-link")) {
        const link = card.querySelector(".prompt-link");
        if (link) {
          link.click();
        }
      }
    });
  });

  const toolCards = document.querySelectorAll(".tool-card");
  toolCards.forEach((card) => {
    card.addEventListener("click", function () {
      console.log("Tool card clicked");
    });
  });

  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const searchTerm = this.value.trim();
        if (searchTerm) {
          console.log("Searching for:", searchTerm);
        }
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", function () {
        // Close all other FAQ items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("open")) {
            otherItem.classList.remove("open");
          }
        });

        // Toggle current item
        item.classList.toggle("open");
      });
    }
  });
});
