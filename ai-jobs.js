// AI Jobs Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Mobile sidebar toggle
  const sidebar = document.getElementById("sidebar");
  const backBtn = document.querySelector(".back-btn");

  // Create overlay for mobile sidebar
  const overlay = document.createElement("div");
  overlay.className = "sidebar-overlay";
  overlay.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  `;
  document.body.appendChild(overlay);

  // Create hamburger menu button
  const hamburgerBtn = document.createElement("button");
  hamburgerBtn.className = "hamburger-btn";
  hamburgerBtn.innerHTML = `
    <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H25V2H0V0Z" fill="white"/>
      <path d="M0 9H25V11H0V9Z" fill="white"/>
      <path d="M0 18H25V20H0V18Z" fill="white"/>
    </svg>
  `;
  hamburgerBtn.style.cssText = `
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  `;

  // Add hamburger to header (only visible on mobile)
  const headerLeft = document.querySelector(".header-left");
  if (headerLeft) {
    headerLeft.insertBefore(hamburgerBtn, headerLeft.firstChild);
  }

  // Show hamburger on mobile
  function checkMobile() {
    if (window.innerWidth <= 1200) {
      hamburgerBtn.style.display = "block";
    } else {
      hamburgerBtn.style.display = "none";
      closeSidebar();
    }
  }

  // Toggle sidebar
  function toggleSidebar() {
    sidebar.classList.toggle("open");
    if (sidebar.classList.contains("open")) {
      overlay.style.display = "block";
      document.body.style.overflow = "hidden";
    } else {
      overlay.style.display = "none";
      document.body.style.overflow = "";
    }
  }

  // Close sidebar
  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.style.display = "none";
    document.body.style.overflow = "";
  }

  // Event listeners
  hamburgerBtn.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", closeSidebar);

  // Close sidebar when clicking sidebar links
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 1200) {
        closeSidebar();
      }
    });
  });

  // Back button functionality
  if (backBtn) {
    backBtn.addEventListener("click", function (e) {
      if (!backBtn.href.includes("index.html")) {
        e.preventDefault();
        window.history.back();
      }
    });
  }

  // Initialize
  checkMobile();
  window.addEventListener("resize", checkMobile);

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Apply link click tracking (optional)
  const applyLinks = document.querySelectorAll(".apply-link");
  applyLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      // Add your apply logic here
      console.log("Apply clicked for job");
      // You can open a modal, redirect to application page, etc.
    });
  });

  // Search functionality
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      const searchTerm = e.target.value.toLowerCase();
      const jobCards = document.querySelectorAll(".job-card");

      jobCards.forEach((card) => {
        const title = card
          .querySelector(".job-title")
          .textContent.toLowerCase();
        const description = card
          .querySelector(".job-description")
          .textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll(".job-tag"))
          .map((tag) => tag.textContent.toLowerCase())
          .join(" ");

        if (
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          tags.includes(searchTerm)
        ) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // Category filter functionality
  const categoryItems = document.querySelectorAll(".category-item");
  categoryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const category = this.textContent.trim();
      const sections = document.querySelectorAll(".job-section");

      sections.forEach((section) => {
        const sectionTitle = section
          .querySelector(".section-title")
          .textContent.trim();
        if (sectionTitle === category) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });

      // Close sidebar on mobile after category selection
      if (window.innerWidth <= 1200) {
        closeSidebar();
      }
    });
  });
});
