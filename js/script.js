// header display code
const nav = document.getElementById("nav");
const headerbackground = document.getElementById("headerbackground");
const hamburger = document.getElementById("hamburger");
hamburger.addEventListener("click", () => {
  nav.classList.toggle("display");
  headerbackground.classList.toggle("display");
});
headerbackground.addEventListener("click", () => {
  nav.classList.toggle("display");
  headerbackground.classList.toggle("display");
});

// smooth scroll
const navUl = document.querySelector("#nav ul");
navUl.addEventListener("click", (e) => {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.scrollIntoView({ behavior: "smooth" });
  nav.classList.toggle("display");
  headerbackground.classList.toggle("display");
});

// image background color change
const carcolorbtn = document.getElementById("carcolorbtn");
const carColor = document.getElementById("carColor");
const carColorName = document.getElementById("carColorName");
const carImage = document.getElementById("carImage");
const carColorCart = document.getElementById("carColorCart");

carcolorbtn.addEventListener("click", () => {
  carImage.style.backgroundColor = carColor.value;
  carColorName.value = carColor.value;
  carColorCart.value = carColor.value;
});
