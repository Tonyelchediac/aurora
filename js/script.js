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

// display search input form
const searchBtn = document.getElementById("searchBtn");
const searchContent = document.getElementById("searchContent");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchContent.classList.toggle("active");
});
