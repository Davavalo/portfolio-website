document.addEventListener("DOMContentLoaded", () => {
  // Normalize paths like "/" and "/index.html"
  const normalize = path => path.replace(/\/index\.html$/, '') || '/';
  const currentPath = normalize(window.location.pathname);

  // Load header
  fetch("header.html")
    .then(res => res.text())
    .then(html => {
      const header = document.getElementById("header");
      if (!header) return;
      header.innerHTML = html;

      // ✅ Highlight active nav link
      header.querySelectorAll(".menu a").forEach(link => {
        const linkPath = normalize(new URL(link.href, location.origin).pathname);
        if (linkPath === currentPath) {
          link.classList.add("active");
        }
      });

      // Mobile menu functionality
      const toggleButton = header.querySelector(".menu-toggle");
      const navMenu = header.querySelector(".menu");

      if (toggleButton && navMenu) {
        toggleButton.addEventListener("click", () => {
          navMenu.classList.toggle("active");
          document.body.classList.toggle("menu-open");
        });

        // Close menu when any link is clicked
        navMenu.querySelectorAll("a").forEach(link => {
          link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
          });
        });

        // Close menu with Escape key
        document.addEventListener("keydown", e => {
          if (e.key === "Escape") {
            navMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
          }
        });
      }
    })
    .catch(err => console.error("Header load failed:", err));

  // Load footer
  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      const footer = document.getElementById("footer");
      if (footer) footer.innerHTML = html;
    })
    .catch(err => console.error("Footer load failed:", err));
});
