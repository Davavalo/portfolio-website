/* Sticky Nav */

window.addEventListener("scroll", function () {
    const nav = document.querySelector(".site-nav");
    const spacer = document.querySelector(".spacer");
    const navHeight = nav.offsetHeight;
  
    if (window.scrollY > 10) {
      nav.classList.add("sticky-nav");
      if (spacer) spacer.style.height = navHeight + "px";
    } else {
      nav.classList.remove("sticky-nav");
      if (spacer) spacer.style.height = "0px";
    }
  });
  
