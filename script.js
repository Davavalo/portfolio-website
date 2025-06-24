document.addEventListener("DOMContentLoaded", () => {
  // --- existing logic here ---
  const normalize = (path) => path.replace(/\/index\.html$/, "") || "/";
  const currentPath = normalize(window.location.pathname);

  fetch("header.html")
    .then((res) => res.text())
    .then((html) => {
      const header = document.getElementById("header");
      if (!header) return;
      header.innerHTML = html;

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
          document.body.classList.toggle("menu-open");
        });

        navMenu.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
          });
        });

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            navMenu.classList.remove("active");
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
      if (footer) footer.innerHTML = html;
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
  }

  document.querySelectorAll(".lightbox-img").forEach((img, i) => {
    img.addEventListener("click", () => {
      // Get all .lightbox-img in the same .image-grid
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

  closeBtn?.addEventListener("click", () => {
    lightbox.style.display = "none";
    lightboxImg.src = "";
  });

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target === lightboxImg) {
      lightbox.style.display = "none";
      lightboxImg.src = "";
    }
  });

  // Keyboard navigation
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
        lightbox.style.display = "none";
        lightboxImg.src = "";
      }
    }
  });
});
