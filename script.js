// DOM elements
const dateInput = document.querySelector("#date-input");
const submitButton = document.querySelector("#submit-button");
const imageContainer = document.querySelector("#image-container");
const favoritesContainer = document.querySelector("#favorites-container");

// API endpoint and key
const APOD_ENDPOINT = "https://api.nasa.gov/planetary/apod";
const API_KEY = "u9kiEzNdq9M7ZMLn9a13jsBn3qa4Gctv0HL45W90";

// Retrieve favorites from local storage or set to empty array
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Event listener for form submission
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  const date = dateInput.value;
  if (date) {
    getImage(date);
  }
});

// Make request to APOD API and display image
function getImage(date) {
  const url = `${APOD_ENDPOINT}?api_key=${API_KEY}&date=${date}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.media_type === "image" || data.media_type === "video") {
        displayImage(data);
      } else {
        displayError();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayError() {
  // Clear image container
  imageContainer.innerHTML = "";
}

// Display Astronomy Picture of the Day image and details
function displayImage(data) {
  // Clear image container
  imageContainer.innerHTML = "";

  // Check if APOD is an image or video
  if (data.media_type === "image") {
    // Create elements for image, title, date, and explanation
    const img = document.createElement("img");
    img.src = data.url;
    img.alt = data.title;

    // Add event listener to display high-definition version when clicked
    img.addEventListener("click", function () {
      if (data.hdurl) {
        // Create high-resolution image element
        const hdImg = document.createElement("img");
        hdImg.src = data.hdurl;
        hdImg.alt = data.title;
        hdImg.classList.add("hd-image");

        // Add event listener to remove high-resolution image element when clicked outside of image
        document.addEventListener("click", function removeHdImg(e) {
          if (!hdImg.contains(e.target) && e.target !== img) {
            hdImg.remove();
            document.removeEventListener("click", removeHdImg);
          }
        });

        // Add high-resolution image element to image container
        imageContainer.appendChild(hdImg);
      }
    });

    const title = document.createElement("h2");
    title.textContent = data.title;
    const date = document.createElement("p");
    date.textContent = data.date;
    const explanation = document.createElement("p");
    explanation.textContent = data.explanation;

    // Add elements to image container
    imageContainer.appendChild(img);
    imageContainer.appendChild(title);
    imageContainer.appendChild(date);
    imageContainer.appendChild(explanation);

    // Add favorite button
    const favoriteButton = document.createElement("button");
    favoriteButton.textContent = "Add to Favorite";
    favoriteButton.addEventListener("click", function () {
      addFavorite(data);
    });
    imageContainer.appendChild(favoriteButton);
  } else if (data.media_type === "video") {
    // Create elements for video, title, date, and explanation
    const video = document.createElement("iframe");
    video.width = "560";
    video.height = "315";
    video.src = data.url;
    video.allow = "autoplay";
    video.allowFullscreen = true;
    const title = document.createElement("h2");
    title.textContent = data.title;
    const date = document.createElement("p");
    date.textContent = data.date;
    const explanation = document.createElement("p");
    explanation.textContent = data.explanation;

    // Add elements to image container
    imageContainer.appendChild(video);
    imageContainer.appendChild(title);
    imageContainer.appendChild(date);
    imageContainer.appendChild(explanation);

    // Add favorite button
    const favoriteButton = document.createElement("button");
    favoriteButton.textContent = "Favorite";
    favoriteButton.addEventListener("click", function () {
      addFavorite(data);
    });
    imageContainer.appendChild(favoriteButton);
  
  } else if (data.media_type === "video") {
    // Create elements for video, title, date, and explanation
    const video = document.createElement("iframe");
    video.width = "560";
    video.height = "315";
    video.src = data.url;
    video.allow = "autoplay";
    video.allowFullscreen = true;
    const title = document.createElement("h2");
    title.textContent = data.title;
    const date = document.createElement("p");
    date.textContent = data.date;
    const explanation = document.createElement("p");
    explanation.textContent = data.explanation;

    // Add elements to image container
    imageContainer.appendChild(video);
    imageContainer.appendChild(title);
    imageContainer.appendChild(date);
    imageContainer.appendChild(explanation);

    // Add favorite button
    const favoriteButton = document.createElement("button");
    favoriteButton.textContent = "Favorite";
    favoriteButton.addEventListener("click", function () {
      addFavorite(data);
    });
    imageContainer.appendChild(favoriteButton);
  }

  
}

function addFavorite(data) {
  // Check if image is already in favorites
  const existingIndex = favorites.findIndex((favorite) => favorite.date === data.date);

  if (existingIndex === -1) {
    // If not, add it to favorites
    favorites.push(data);

    // Update local storage with new favorites
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Create favorite item
    const favoriteItem = document.createElement("div");
    favoriteItem.classList.add("favorite-item");

    const img = document.createElement("img");
    img.src = data.url;
    img.alt = data.title;

    const title = document.createElement("h3");
    title.textContent = data.title;

    const date = document.createElement("p");
    date.textContent = data.date;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      removeFavorite(existingIndex, favoriteItem);
    });

    // Add elements to favorite item
    favoriteItem.appendChild(img);
    favoriteItem.appendChild(title);
    favoriteItem.appendChild(date);
    favoriteItem.appendChild(removeButton);

// Add favorite item to favorites container
favoritesContainer.appendChild(favoriteItem);
}
}

function removeFavorite(index, favoriteItem) {
// Remove item from favorites array
favorites.splice(index, 1);

// Update local storage with updated favorites
localStorage.setItem("favorites", JSON.stringify(favorites));

// Remove favorite item from favorites container
favoritesContainer.removeChild(favoriteItem);
}

// Load favorites from local storage on page load
function loadFavorites() {
favorites.forEach((favorite) => {
// Create favorite item
const favoriteItem = document.createElement("div");
favoriteItem.classList.add("favorite-item");

const img = document.createElement("img");
img.src = favorite.url;
img.alt = favorite.title;

const title = document.createElement("h3");
title.textContent = favorite.title;

const date = document.createElement("p");
date.textContent = favorite.date;

const removeButton = document.createElement("button");
removeButton.textContent = "Remove";
removeButton.addEventListener("click", function () {
  removeFavorite(favorites.indexOf(favorite), favoriteItem);
});

// Add elements to favorite item
favoriteItem.appendChild(img);
favoriteItem.appendChild(title);
favoriteItem.appendChild(date);
favoriteItem.appendChild(removeButton);

// Add favorite item to favorites container
favoritesContainer.appendChild(favoriteItem);
});
}

// Load favorites on page load
loadFavorites();