const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const img1 = document.getElementById("image1");
const img2 = document.getElementById("image2");
const img3 = document.getElementById("image3");
const toggleEl = document.getElementById("toggle-icon");
const textBox = document.getElementById("text-box");
let color = "light";
// Dark or Light Images
function imageMode(color) {
  img1.src = `img/undraw_proud_coder_${color}.svg`;
  img2.src = `img/undraw_feeling_proud_${color}.svg`;
  img3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

function toggleDarkLightMode(color) {
  nav.style.backgroundColor =
    color === "light" ? "rgb(255 255 255 / 50%)" : "rgb(0 0 0 / 50%)";
  textBox.style.backgroundColor =
    color === "light" ? "rgb(0 0 0 / 50%)" : "rgb(255 255 255 / 50%)";
  toggleEl.children[0].textContent =
    color === "light" ? "Light Mode" : "Dark Mode";
  color === "light"
    ? toggleEl.children[1].classList.replace("fa-moon", "fa-sun")
    : toggleEl.children[1].classList.replace("fa-sun", "fa-moon");
  color === "light" ? imageMode("light") : imageMode("dark");
}

// Switch Theme Dynamicaly
function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    color = "dark";
    toggleDarkLightMode(color);
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    color = "light";
    toggleDarkLightMode(color);
  }
}

// Event Listener
toggleSwitch.addEventListener("change", switchTheme);

// Check Local Storage Fot Theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    color = "dark";
    toggleDarkLightMode(color);
  }
}
