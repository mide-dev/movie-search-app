"use strict";

// Declare variables
const input = document.querySelector(".input");
const search = document.querySelector(".search");
const displayMovies = document.querySelector(".display-movies");
const searchError = document.querySelector(".wrong-search");
const movieDisplayContainer = document.querySelector(".content-wrap");
const posterImage = document.querySelector(".movie-img");
const preLoader = document.querySelector(".loader");

// display error
function displayError(
  msg = `Unable to find what you’re looking for.
  Please try another search.`
) {
  searchError.classList.remove("hidden");
  movieDisplayContainer.classList.remove("bg-home");
  searchError.textContent = msg;
}

function displayLoader() {
  preLoader.style.display = "none";
}

// html & css to display movie data
const html = function (mov) {
  return `
      <div class="movie-wrap">
        <img class="movie-img" src="${mov.Poster}" alt="movie-poster" />
        <div class="movie-content">
            <div class="title-ratings-wrap">
            <h2 class="movie-title">${mov.Title}</h2>
            <i class="fa-solid fa-star fa-2xs icon"></i>
            <span class="movie-rating">${mov.imdbRating}</span>
            </div>
            <div class="min-desc-wrap">
            <p>${mov.Runtime}</p>
            <p>${mov.Genre}</p>
            <p class="movie-watchlist">
                <i class="fa-solid fa-circle-plus watchlist-icon"></i>Watchlist
            </p>
            </div>
            <p class="movie-body">${mov.Plot}</p>
        </div>
      </div>
    `;
};

// GET search data from OMBD API
async function getSearchResult() {
  try {
    const searchInput = input.value;
    const searchResult = await fetch(
      `http://www.omdbapi.com/?apikey=e639720b&s=${searchInput}`
    );
    // throw err if ntwrk fails
    if (!searchResult.ok) {
      throw new Error(
        displayError("Netwrok Error. Please check your internet connection")
      );
    }

    const movies = await searchResult.json();
    // throw err if can't find movie title
    if (movies.Response === "False") {
      throw new Error(displayError());
    }
    //
    return movies.Search;
  } catch (err) {
    displayError();
    // rethrow error to catch outside func
    throw err;
  }
}

// Get Indiviual movie data
async function getMovieData() {
  try {
    // import getSearchResult()
    const searchData = await getSearchResult();
    const ids = [];

    // fetch each movie data and push its promise to "ids"
    searchData.forEach((mov) => {
      ids.push(
        fetch(`http://www.omdbapi.com/?apikey=e639720b&i=${mov.imdbID}`).then(
          (res) => res.json()
        )
      );
    });

    // resolve the promise and return as final value
    const retrieveMovies = await Promise.all(ids);
    return retrieveMovies;
  } catch (err) {
    displayError();
  }
}

// display data gotten from "getSearchResult()" to UI
async function displayMovieData() {
  try {
    // import getMovieData func()
    let movieDataArray = await getMovieData();

    // if movie not found, clear previous search and display error.
    if (movieDataArray === undefined) {
      while (displayMovies.firstChild) {
        displayMovies.removeChild(displayMovies.lastChild);
      }
      return;
    }

    // remove error msg if movie found
    searchError.classList.add("hidden");

    // clear previous search and display new data
    while (movieDataArray && displayMovies.firstChild) {
      displayMovies.removeChild(displayMovies.lastChild);
    }

    console.log(movieDataArray);
    // remove the default bg-icon
    movieDisplayContainer.classList.remove("bg-home");

    // display the data
    movieDataArray.forEach((mov) => {
      displayMovies.insertAdjacentHTML("beforeend", html(mov));
    });
  } catch (err) {
    displayError();
  }
}

search.addEventListener("click", displayMovieData);
