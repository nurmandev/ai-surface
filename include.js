document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");
  const promises = [];

  includes.forEach((el) => {
    const file = el.getAttribute("data-include");
    const promise = fetch(file)
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load ${file}`);
        return response.text();
      })
      .then((data) => {
        // Create a temporary container
        const temp = document.createElement("div");
        temp.innerHTML = data;

        // Execute scripts found in the included content
        executeScripts(temp);

        // Replace the placeholder with the content
        el.replaceWith(...Array.from(temp.childNodes));
      })
      .catch((error) => console.error(error));

    promises.push(promise);
  });

  Promise.all(promises).then(() => {
    // All includes loaded. Initialize global UI logic.
    initializeNavigation();
    initializeSidebar();
    initializeSearch();
    initializeRouter();
  });
});

// Helper to execute scripts in a container
function executeScripts(container) {
  const scripts = container.querySelectorAll("script");
  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");
    Array.from(oldScript.attributes).forEach((attr) =>
      newScript.setAttribute(attr.name, attr.value)
    );
    newScript.appendChild(document.createTextNode(oldScript.innerHTML));
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

function initializeRouter() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    // Check if it's an internal link and not a special link (download, target blank, hash)
    if (
      link &&
      link.href.startsWith(window.location.origin) &&
      !link.hasAttribute("download") &&
      link.target !== "_blank" &&
      !link.getAttribute("href").startsWith("#")
    ) {
      e.preventDefault();
      const url = link.href;
      navigateTo(url);
    }
  });

  window.addEventListener("popstate", () => {
    navigateTo(window.location.href, false);
  });
}

async function navigateTo(url, pushState = true) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Swap Main Content
    const newMain = doc.querySelector("main");
    const currentMain = document.querySelector("main");

    if (newMain && currentMain) {
      // Fade out effect (optional, but nice)
      currentMain.style.opacity = "0";
      currentMain.style.transition = "opacity 0.2s ease";

      setTimeout(() => {
        currentMain.replaceWith(newMain);
        executeScripts(newMain);
        // Fade in
        newMain.style.opacity = "0";
        newMain.style.transition = "opacity 0.2s ease";
        requestAnimationFrame(() => {
          newMain.style.opacity = "1";
        });
      }, 200);
    } else {
      // Fallback if structure is different
      window.location.href = url;
      return;
    }

    // Update Title
    document.title = doc.title;

    // Update Head (Scripts and Styles)
    updateHead(doc);

    if (pushState) {
      history.pushState({}, "", url);
    }

    // Re-initialize UI
    initializeNavigation();

    // Close mobile sidebar if open
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const hamburger = document.getElementById("hamburgerMenu");
    if (sidebar) sidebar.classList.remove("mobile-open");
    if (overlay) overlay.classList.remove("active");
    if (hamburger) hamburger.classList.remove("active");
    document.body.classList.remove("sidebar-open");

    window.scrollTo(0, 0);
  } catch (error) {
    console.error("Navigation error:", error);
    window.location.href = url;
  }
}

function updateHead(newDoc) {
  // Handle Stylesheets
  const newLinks = newDoc.querySelectorAll("link[rel='stylesheet']");
  newLinks.forEach((newLink) => {
    if (
      !document.querySelector(`link[href="${newLink.getAttribute("href")}"]`)
    ) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = newLink.getAttribute("href");
      document.head.appendChild(link);
    }
  });

  // Handle Scripts in Head (defer/async)
  const newScripts = newDoc.querySelectorAll("head script[src]");
  newScripts.forEach((newScript) => {
    if (
      !document.querySelector(`script[src="${newScript.getAttribute("src")}"]`)
    ) {
      const script = document.createElement("script");
      script.src = newScript.getAttribute("src");
      script.defer = newScript.defer;
      script.async = newScript.async;
      document.head.appendChild(script);
    }
  });
}

function initializeSearch() {
  const searchInput = document.querySelector(".navbar .search-input");
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const searchTerm = this.value.trim();
        if (searchTerm) {
          console.log("Searching for:", searchTerm);
          // Implement search redirection or logic here if needed
        }
      }
    });
  }
}

function initializeNavigation() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-links a, .sidebar-nav a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    // Normalize paths for comparison
    const isHome =
      href === "index.html" || href === "./index.html" || href === "/";
    const isCurrentHome =
      currentPath.endsWith("/") || currentPath.endsWith("index.html");

    if (isHome && isCurrentHome) {
      link.classList.add("active");
    } else if (!isHome && currentPath.includes(href)) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function initializeSidebar() {
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const closeBtn = document.getElementById("sidebarCloseBtn");

  if (hamburgerMenu && sidebar && sidebarOverlay) {
    // Remove existing listeners to avoid duplicates if re-initialized
    // Cloning removes listeners
    const newHamburger = hamburgerMenu.cloneNode(true);
    hamburgerMenu.parentNode.replaceChild(newHamburger, hamburgerMenu);

    newHamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      newHamburger.classList.toggle("active");
      sidebar.classList.toggle("mobile-open");
      sidebarOverlay.classList.toggle("active");
      document.body.classList.toggle("sidebar-open");
    });

    // Close button logic
    if (closeBtn) {
      // Clone close button too to remove old listeners
      const newCloseBtn = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);

      newCloseBtn.addEventListener("click", () => {
        sidebar.classList.remove("mobile-open");
        sidebarOverlay.classList.remove("active");
        newHamburger.classList.remove("active");
        document.body.classList.remove("sidebar-open");
      });
    }

    // Overlay click logic
    // Clone overlay too
    const newOverlay = sidebarOverlay.cloneNode(true);
    sidebarOverlay.parentNode.replaceChild(newOverlay, sidebarOverlay);

    newOverlay.addEventListener("click", () => {
      sidebar.classList.remove("mobile-open");
      newOverlay.classList.remove("active");
      newHamburger.classList.remove("active");
      document.body.classList.remove("sidebar-open");
    });

    // Dropdown logic
    const dropdowns = document.querySelectorAll(
      ".sidebar-dropdown .dropdown-toggle"
    );
    dropdowns.forEach((toggle) => {
      // Clone to remove listeners
      const newToggle = toggle.cloneNode(true);
      toggle.parentNode.replaceChild(newToggle, toggle);

      newToggle.addEventListener("click", function () {
        const submenu = this.nextElementSibling;
        const icon = this.querySelector(".fa-chevron-down");

        if (submenu) {
          submenu.classList.toggle("collapsed");
          const isExpanded = !submenu.classList.contains("collapsed");
          this.setAttribute("aria-expanded", isExpanded);

          if (icon) {
            icon.style.transform = isExpanded
              ? "rotate(180deg)"
              : "rotate(0deg)";
          }
        }
      });
    });

    // Close sidebar when any link is clicked (mobile UX)
    const links = sidebar.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove("mobile-open");
          sidebarOverlay.classList.remove("active");
          newHamburger.classList.remove("active");
          document.body.classList.remove("sidebar-open");
        }
      });
    });
  }
}
