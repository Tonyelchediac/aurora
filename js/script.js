// header display code
const nav = document.getElementById("nav");
const headerbackground = document.getElementById("headerbackground");
const hamburger = document.getElementById("hamburger");

if (hamburger && nav && headerbackground) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("display");
    headerbackground.classList.toggle("display");
  });
}

if (headerbackground && nav) {
  headerbackground.addEventListener("click", () => {
    nav.classList.toggle("display");
    headerbackground.classList.toggle("display");
  });
}

// smooth scroll
const navUl = document.querySelector("#nav ul");
if (navUl && nav && headerbackground) {
  navUl.addEventListener("click", (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    if (href && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    nav.classList.toggle("display");
    headerbackground.classList.toggle("display");
  });
}

// image background color change
const carcolorbtn = document.getElementById("carcolorbtn");
const carColor = document.getElementById("carColor");
const carColorName = document.getElementById("carColorName");
const carImage = document.getElementById("carImage");
const carColorCart = document.getElementById("carColorCart");

if (carcolorbtn && carColor && carImage) {
  carcolorbtn.addEventListener("click", () => {
    carImage.style.backgroundColor = carColor.value;
    if (carColorName) carColorName.value = carColor.value;
    if (carColorCart) carColorCart.value = carColor.value;
  });
}