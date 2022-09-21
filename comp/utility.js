"use strict";

// Hide loader
export const hideLoader = () => {
  document.querySelector(".loader").classList.add("hide-loader");
};

// show loader
export const showLoader = () => {
  document.querySelector(".loader").classList.remove("hide-loader");
};

// display error
export function displayError(msg) {
  const searchError = document.querySelector(".wrong-search");
  const movieDisplayContainer = document.querySelector(".content-wrap");
  hideLoader();
  searchError.classList.remove("hidden");
  movieDisplayContainer.classList.remove("bg-home");
  searchError.textContent = msg;
}
