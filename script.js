document.addEventListener("DOMContentLoaded", () => {
  const normalize = (path) => path.replace(/\/index\.html$/, "") || "/";
  const currentPath = normalize(window.location.pathname);

  fetch("header.html")
    .then((res) => res.text())
    .then((html) => {
      const header = document.getElementById("header");
      if (!header) return;
      header.innerHTML = html;

      // Highlight active nav link
      header.querySelectorAll(".menu a").forEach((link) => {
        const linkPath = normalize(
          new URL(link.href, location.origin).pathname
        );
        if (linkPath === currentPath) {
          link.classList.add("active");
        }
      });

      const toggleButton = header.querySelector(".menu-toggle");
      const navMenu = header.querySelector(".menu");

      if (toggleButton && navMenu) {
        toggleButton.addEventListener("click", () => {
          navMenu.classList.toggle("active");
          toggleButton.classList.toggle("active");
          document.body.classList.toggle("menu-open");
        });

        // Only close the menu when a nav item (not social link) is clicked
        navMenu.querySelectorAll(".menu-list a").forEach((link) => {
          link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            toggleButton.classList.remove("active");
            document.body.classList.remove("menu-open");
          });
        });

        // ESC key closes menu
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            navMenu.classList.remove("active");
            toggleButton.classList.remove("active");
            document.body.classList.remove("menu-open");
          }
        });
      }
    })
    .catch((err) => console.error("Header load failed:", err));

  fetch("footer.html")
    .then((res) => res.text())
    .then((html) => {
      const footer = document.getElementById("footer");
      if (footer) {
        footer.innerHTML = html;
        // Now update the year
        const yearSpan = footer.querySelector("#year");
        if (yearSpan) {
          yearSpan.textContent = new Date().getFullYear();
        }
      }
    })
    .catch((err) => console.error("Footer load failed:", err));
  // Lightbox with next/prev functionality
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox?.querySelector(".lightbox-full");
  const closeBtn = lightbox?.querySelector(".lightbox-close");
  const prevBtn = lightbox?.querySelector(".lightbox-prev");
  const nextBtn = lightbox?.querySelector(".lightbox-next");

  let currentImages = [];
  let currentIndex = 0;

  function showImage(index) {
    const img = currentImages[index];
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    currentIndex = index;
    lightbox.style.display = "flex";

    // Disable scroll
    document.body.classList.add("no-scroll");

    // Hide arrows if only one image
    const showArrows = currentImages.length > 1;
    nextBtn.style.display = showArrows ? "block" : "none";
    prevBtn.style.display = showArrows ? "block" : "none";
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";

    // Re-enable scroll
    document.body.classList.remove("no-scroll");
  }

  document.querySelectorAll(".lightbox-img").forEach((img) => {
    img.addEventListener("click", () => {
      const grid = img.closest(".image-grid");
      currentImages = Array.from(grid.querySelectorAll(".lightbox-img"));
      const clickedIndex = currentImages.indexOf(img);
      showImage(clickedIndex);
    });
  });

  nextBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage(currentIndex);
  });

  prevBtn?.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage(currentIndex);
  });

  closeBtn?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightboxImg) {
      closeLightbox();
    }
  });

  // Keyboard navigation for lightbox
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % currentImages.length;
        showImage(currentIndex);
      } else if (e.key === "ArrowLeft") {
        currentIndex =
          (currentIndex - 1 + currentImages.length) % currentImages.length;
        showImage(currentIndex);
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    }
  });
});
