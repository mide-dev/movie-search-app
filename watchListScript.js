const input = document.querySelector(".input");
const searchBar = document.querySelector(".search-bar");
const search = document.querySelector(".search");
const displayMovies = document.querySelector(".display-movies");
const searchError = document.querySelector(".wrong-search");
const movieDisplayContainer = document.querySelector(".content-wrap");
const posterImage = document.querySelector(".movie-img");
const preLoader = document.querySelector(".loader");

// let user delete movie from watchlist
async function removeFromWatchlist() {
  const retrieveMovies = await getMovieData();

  //hide pre-loader
  hideLoader();
}
