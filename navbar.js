document.addEventListener("DOMContentLoaded", function () {
  const navbarContainer = document.getElementById("navbar");
  if (navbarContainer) {
    fetch("navbar.html")
      .then((response) => response.text())
      .then((data) => {
        navbarContainer.innerHTML = data;

        // Highlight active link
        const currentPath = window.location.pathname;
        const navLinks = navbarContainer.querySelectorAll(
          ".nav-links a, .sidebar-nav a"
        );

        navLinks.forEach((link) => {
          const href = link.getAttribute("href");

          if (
            (href === "index.html" &&
              (currentPath.endsWith("/") ||
                currentPath.endsWith("index.html"))) ||
            (href !== "index.html" && currentPath.includes(href))
          ) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });

        // Search Input Logic
        const searchInput = navbarContainer.querySelector(".search-input");
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
      })
      .catch((error) => console.error("Error loading navbar:", error));
  }
});
