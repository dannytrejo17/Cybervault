const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    const open = !mobileMenu.classList.contains("hidden");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
}
