const hamburger = document.getElementById("hamburger");
const closeBtn = document.getElementById("closeBtn");
const navlinks = document.getElementById("navlinks");

hamburger.addEventListener("click", (e) => {
  e.preventDefault();
  navlinks.classList.add("active");
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  navlinks.classList.remove("active");
});
