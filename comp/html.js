"use strict";

// html & css to display movie data
export const moviesHtml = function (mov, page) {
  if (page === "main") {
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
                <button class="watchlist-btn add-movie">
                <i class="fa-solid fa-circle-plus fa-lg watchlist-icon"></i>
                Watchlist
              </button>
              </div>
              <p class="movie-body">${mov.Plot}</p>
          </div>
        </div>
      `;
  } else {
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
                <button class="watchlist-btn remove-movie">
                  <i class="fa-solid fa-circle-minus watchlist-icon"></i>
                  Remove
                </button>
              </div>
              <p class="movie-body">${mov.Plot}</p>
          </div>
        </div>
      `;
  }
};
