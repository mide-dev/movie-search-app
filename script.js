"use strict";

// Declare variables
const input = document.querySelector(".input");
const search = document.querySelector(".search");
const displayMovies = document.querySelector(".display-movies");
const searchError = document.querySelector(".wrong-search");
const movieDisplayContainer = document.querySelector(".content-wrap");

function displayError(msg) {
  searchError.classList.remove("hidden");
  movieDisplayContainer.classList.remove("bg-home");
  searchError.textContent = msg;
}

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
      throw new Error(
        displayError(
          `Unable to find what you’re looking for.
          Please try another search.`
        )
      );
    }
    //
    return movies.Search;
    // prettier-ignore
  } catch (err) {
    displayError(err.message);
    // rethrow error to catch outside func
    throw err;
  }
}

// Get Indiviual movie data
async function getMovieData() {
  try {
    const searchData = await getSearchResult();
    const ids = [];

    // use each movie ids from searchData to fetch info...
    //... about individual movies & push the promise returned in array "ids"
    searchData.forEach((mov) => {
      ids.push(
        fetch(`http://www.omdbapi.com/?apikey=e639720b&i=${mov.imdbID}`).then(
          (res) => res.json()
        )
      );
    });

    const retrieveMovies = await Promise.all(ids);
    // console.log(retrieveMovies);
    return retrieveMovies;
  } catch (err) {
    displayError(`Unable to find what you’re looking for.
    Please try another search.`);
  }
}

// display data gotten from "getSearchResult()" to UI
async function displayMovieData() {
  let movieDataArray = await getMovieData();

  console.log(movieDataArray);

  movieDataArray.forEach((mov) => {
    const html = `
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

    displayMovies.insertAdjacentHTML("beforeend", html);
  });
}

search.addEventListener("click", displayMovieData);
