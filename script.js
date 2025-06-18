document.addEventListener("DOMContentLoaded", () => {
    // Normalize paths like "/" and "/index.html" to ensure matching
    const normalize = path => path.replace(/\/index\.html$/, '') || '/';
    const currentPath = normalize(window.location.pathname);

    // Load header
    fetch("header.html")
        .then(res => res.text())
        .then(html => {
            const header = document.getElementById("header");
            if (!header) return;
            header.innerHTML = html;

            // Highlight active nav link
            const links = header.querySelectorAll("nav.nav-left a");
            links.forEach(link => {
                const linkPath = normalize(new URL(link.href, location.origin).pathname);
                if (linkPath === currentPath) {
                    link.classList.add("active");
                }
            });
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
