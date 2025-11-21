// Sidebar and mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const sidebarSectionTitles = document.querySelectorAll(
    ".sidebar-section-title"
  );

  // Toggle mobile menu
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.toggle("active");
      sidebar.classList.toggle("mobile-open");
      sidebarOverlay.classList.toggle("active");
      document.body.classList.toggle("sidebar-open");
      document.body.style.overflow = sidebar.classList.contains("mobile-open")
        ? "hidden"
        : "";
    });
  }

  // Close sidebar when overlay is clicked
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", function () {
      hamburgerMenu.classList.remove("active");
      sidebar.classList.remove("mobile-open");
      this.classList.remove("active");
      document.body.classList.remove("sidebar-open");
      document.body.style.overflow = "";
    });
  }

  // Close sidebar when close button is clicked
  const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener("click", function () {
      hamburgerMenu.classList.remove("active");
      sidebar.classList.remove("mobile-open");
      sidebarOverlay.classList.remove("active");
      document.body.classList.remove("sidebar-open");
      document.body.style.overflow = "";
    });
  }

  // Close sidebar when a navigation link is clicked on mobile (not section titles)
  const sidebarLinks = document.querySelectorAll(
    ".sidebar-section-links .sidebar-link"
  );
  sidebarLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      // Only close if it's a real navigation link, not an anchor
      if (this.href && !this.href.endsWith("#")) {
        if (window.innerWidth <= 768) {
          hamburgerMenu.classList.remove("active");
          sidebar.classList.remove("mobile-open");
          sidebarOverlay.classList.remove("active");
          document.body.classList.remove("sidebar-open");
          document.body.style.overflow = "";
        }
      }
    });
  });

  // Toggle sidebar sections
  sidebarSectionTitles.forEach(function (title) {
    title.addEventListener("click", function (e) {
      e.stopPropagation();
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      const links = this.nextElementSibling;

      this.setAttribute("aria-expanded", !isExpanded);

      if (links && links.classList.contains("sidebar-section-links")) {
        if (isExpanded) {
          links.classList.add("collapsed");
        } else {
          links.classList.remove("collapsed");
        }
      }
    });
  });

  // Copy to clipboard functionality for prompt boxes
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const promptBox = this.closest(".prompt-box");
      const promptText = promptBox.querySelector(".prompt-text");

      if (promptText) {
        const textToCopy = promptText.textContent;

        // Create a temporary textarea to copy the text
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();

        try {
          document.execCommand("copy");

          // Visual feedback
          const originalText = this.textContent;
          this.textContent = "Copied!";
          this.style.background = "#4caf50";

          setTimeout(() => {
            this.textContent = originalText;
            this.style.background = "";
          }, 2000);
        } catch (err) {
          console.error("Failed to copy text: ", err);
        }

        document.body.removeChild(textarea);
      }
    });
  });

  // Prevent sidebar clicks from closing the sidebar
  if (sidebar) {
    sidebar.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // Close mobile menu when window is resized to desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1200) {
      hamburgerMenu.classList.remove("active");
      sidebar.classList.remove("mobile-open");
      sidebarOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});
