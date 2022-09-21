"use strict";

import { hideLoader, displayError } from "./utility.js";
import { moviesHtml } from "./html.js";
import { getMovieData } from "./getMovieData.js";
import { addToWatchlist } from "./addToWatchlist.js";

// display data gotten from "getSearchResult()" to UI
export async function displayMovieData(e) {
  e.preventDefault();
  const input = document.querySelector(".input");
  const displayMovies = document.querySelector(".display-movies");
  const searchError = document.querySelector(".wrong-search");
  const movieDisplayContainer = document.querySelector(".content-wrap");

  try {
    // import getMovieData func()
    let movieDataArray = await getMovieData();

    // if movie not found, clear previous search and display error.
    if (movieDataArray === undefined) {
      while (displayMovies.firstChild) {
        displayMovies.removeChild(displayMovies.lastChild);
      }

      if (input.value.length === 0) {
        hideLoader();
        searchError.classList.add("hidden");
        movieDisplayContainer.classList.add("bg-home");
        return;
      }

      if (input.value.length > 0 && input.value.length < 3) {
        throw Error("Please Input minimum of 3 characters");
      }

      /* If cant find movie (wait for 2sec to delay firing...
          incase user is not done typing) */
      if (input.value.length > 3) {
        setTimeout(() => {
          displayError(`Unable to find what you’re looking for.
              Please try another search.`);
        }, 2000);
      }

      return;
    }

    // if movie found
    // remove the default bg-icon
    movieDisplayContainer.classList.remove("bg-home");

    // remove error msg
    searchError.classList.add("hidden");

    // clear previous search
    while (movieDataArray && displayMovies.firstChild) {
      displayMovies.removeChild(displayMovies.lastChild);
    }

    // hide preLoader
    hideLoader();
    // console.log(movieDataArray);

    // display movies
    movieDataArray.forEach((mov) => {
      displayMovies.insertAdjacentHTML("beforeend", moviesHtml(mov, "main"));
    });

    // add to watchlist
    addToWatchlist();
  } catch (err) {
    displayError(err.message);
    return;
  }
}
