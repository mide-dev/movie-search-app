"use strict";

// Declare variables
const input = document.querySelector(".input");
const search = document.querySelector(".search");
const searchBar = document.querySelector(".search-bar");
const displayMovies = document.querySelector(".display-movies");
const searchError = document.querySelector(".wrong-search");
const movieDisplayContainer = document.querySelector(".content-wrap");
const posterImage = document.querySelector(".movie-img");
const preLoader = document.querySelector(".loader");

// Hide loader
const hideLoader = () => {
  preLoader.classList.add("hide-loader");
};

// show loader
const showLoader = () => {
  preLoader.classList.remove("hide-loader");
};

// display error
function displayError(msg) {
  hideLoader();
  searchError.classList.remove("hidden");
  movieDisplayContainer.classList.remove("bg-home");
  searchError.textContent = msg;
}

hideLoader();

// html & css to display movie data
const html = function (mov) {
  return `
      <div class="movie-wrap">
        <img class="movie-img" src="${mov.Poster}" alt="movie-poster" />
        <div class="movie-content">
            <div class="title-ratings-wrap">
            <h2 class="movie-title">${mov.Title}</h2>
            <i class="fa-solid fa-star fa-xs icon"></i>
            <span class="movie-rating">${mov.imdbRating}</span>
            </div>
            <div class="min-desc-wrap">
            <p>${mov.Runtime}</p>
            <p>${mov.Genre}</p>
            <button class="watchlist-btn">
                <i class="fa-solid fa-circle-plus fa-lg watchlist-icon"></i>Watchlist
            </button>
            </div>
            <p class="movie-body">${mov.Plot}</p>
        </div>
      </div>
    `;
};

// GET search data from OMBD API
async function getSearchResult() {
  try {
    showLoader();
    const searchInput = input.value;
    const searchResult = await fetch(
      `http://www.omdbapi.com/?apikey=e639720b&s=${searchInput}`
    );
    // throw err if ntwrk fails
    if (!searchResult.ok) {
      throw new Error("Netwrok Error. Please check your internet connection");
    }

    const movies = await searchResult.json();

    return movies.Search;
  } catch (err) {
    // error been handled in displayMovieData()
    return;
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
    // error been handled in displayMovieData()
    return;
  }
}

// display data gotten from "getSearchResult()" to UI
async function displayMovieData(e) {
  e.preventDefault();

  try {
    // import getMovieData func()
    let movieDataArray = await getMovieData();

    // if movie not found, clear previous search and handle error.
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
    console.log(movieDataArray);

    // for (let i of movieDataArray) {
    //   if (watchlist-btn.addEventListener('click')
    // }
    // display movies
    movieDataArray.forEach((mov) => {
      displayMovies.insertAdjacentHTML("beforeend", html(mov));
    });
  } catch (err) {
    displayError(err.message);
    return;
  }
}

searchBar.addEventListener("submit", displayMovieData);

// search for title as user types
let timeout;

input.addEventListener("keyup", function (e) {
  // clear timeout if already set
  // prevent previous search from executing
  clearTimeout(timeout);

  // Make a new timeout set to go off in 200ms (.2 second)
  timeout = setTimeout(displayMovieData.bind(null, e), 200);
});
