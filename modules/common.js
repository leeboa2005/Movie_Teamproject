// 반응형 네비게이션 기능
const navToggleBtn = document.querySelector(".nav_toggleBtn");
const nav = document.querySelector(".mb_nav");

navToggleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  nav.classList.toggle("active");
  navToggleBtn.classList.toggle("active");
});
