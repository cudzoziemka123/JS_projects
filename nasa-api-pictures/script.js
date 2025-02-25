const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// NASA API

const count = 10;
const apiKey = `DEMO_KEY`;
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function showContent(page) {
  window.scrollTo({ top: 0, behavior: "instant" });
  if (page === "results") {
    resultsNav.classList.remove("hidden");
    favoritesNav.classList.add("hidden");
  } else {
    resultsNav.classList.add("hidden");
    favoritesNav.classList.remove("hidden");
  }
  loader.classList.add("hidden");
}

function createDOMNodes(page) {
  const currentArray =
    page === "results" ? resultsArray : Object.values(favorites);
  currentArray.forEach((result) => {
    // Card Container
    const card = document.createElement("div");
    card.classList.add("card");
    // Link
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "Viev Full Image";
    link.target = "_blank";
    // Image
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");
    // Card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // Title
    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = `${result.title}`;
    // Add to favorites
    const addToFav = document.createElement("p");
    addToFav.classList.add("clickable");
    if (page === "favorites") {
      addToFav.textContent = "Remove favorite";
      addToFav.setAttribute("onclick", `removeFavorite('${result.url}')`);
    } else {
      addToFav.textContent = "Add to favorites";
      addToFav.setAttribute("onclick", `saveFavorite('${result.url}')`);
    }
    // Explanation
    const explanation = document.createElement("p");
    explanation.classList.add("card-text");
    explanation.textContent = `${result.explanation}`;
    // Footer
    const small = document.createElement("small");
    small.classList.add("text-muted");
    // Date
    const date = document.createElement("strong");
    date.textContent = `${result.date}`;
    // Copyright Info
    const copyright = document.createElement("span");
    result.copyright
      ? (copyright.innerHTML = ` ${result.copyright}`)
      : (copyright.innerHTML = " ");
    small.append(date, copyright);
    cardBody.append(title, addToFav, explanation, small);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

function updateDOM(page) {
  // Get Favorites from localStorage
  if (localStorage.getItem("nasaFavorites")) {
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
  }
  imagesContainer.textContent = "";
  createDOMNodes(page);
  showContent(page);
}

// Get 10 Images from NASA API
async function getNasaPictures() {
  // SHow Loader
  loader.classList.remove("hidden");
  try {
    const results = await fetch(apiURL);
    resultsArray = await results.json();
    console.log(resultsArray);
    updateDOM("results");
  } catch (error) {
    // Catch error there
  }
}

// Add result to Favorites
function saveFavorite(itemUrl) {
  // Loop through Results Array to select Favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      //   Show Save Confirmation for 2 Seconds
      saveConfirmed.classList.remove("hidden");
      setTimeout(() => {
        saveConfirmed.classList.add("hidden");
      }, 2000);
      //   Set Favorites in localStorage
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
  });
}

// Remove item from Favorites
function removeFavorite(itemUrl) {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
    //   Set Favorites in localStorage
    localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    updateDOM("favorites");
  }
}

// On Load
getNasaPictures();
