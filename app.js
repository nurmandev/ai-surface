const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
const navLinks = document.getElementById("navLinks");
const navRight = document.getElementById("navRight");
const sidebar = document.getElementById("sidebar");
const mainContent = document.querySelector(".main-content");
const promptsToggle = document.getElementById("promptsToggle");
const promptsSubmenu = document.getElementById("promptsSubmenu");
const jobsToggle = document.getElementById("jobsToggle");
const jobsSubmenu = document.getElementById("jobsSubmenu");

// Sidebar toggle for desktop
sidebarToggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
  mainContent.classList.toggle("expanded");
});

// Mobile menu toggle
mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  navRight.classList.toggle("active");
  sidebar.classList.toggle("active");

  // Change icon
  if (navLinks.classList.contains("active")) {
    mobileMenuBtn.textContent = "✕";
  } else {
    mobileMenuBtn.textContent = "☰";
  }
});

// Close menu when clicking on a link
const navItems = navLinks.querySelectorAll("a");
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
    navRight.classList.remove("active");
    sidebar.classList.remove("active");
    mobileMenuBtn.textContent = "☰";
  });
});

// Sidebar expandable items
promptsToggle.addEventListener("click", (e) => {
  e.preventDefault();
  promptsToggle.classList.toggle("expanded");
  promptsSubmenu.classList.toggle("open");
});

jobsToggle.addEventListener("click", (e) => {
  e.preventDefault();
  jobsToggle.classList.toggle("expanded");
  jobsSubmenu.classList.toggle("open");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar") && !e.target.closest(".sidebar")) {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("active");
      navRight.classList.remove("active");
      sidebar.classList.remove("active");
      mobileMenuBtn.textContent = "☰";
    }
  }
});
