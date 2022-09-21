"use strict";

// initialize default array in localstorage
export function initWatchlist() {
  // if movie array available in localstorage => breakout of func;
  if (localStorage.getItem("movies")) return;
  // else, generate movie empty array
  localStorage.setItem("movies", JSON.stringify([]));
}

// user watchlist - accepts a movie object &
//  an action to add/remove movie from storage
export function myWatchlist(movie, action) {
  // get movie arr from local storage
  const watchList = JSON.parse(localStorage.getItem("movies"));
  // if add movie
  if (action === "add") {
    for (let data of watchList) {
      // check if movie previously added to prevent duplicate
      if (movie.Title === data.Title) {
        console.log(`you've added this before`);
        return;
      }
    }

    // extract needed items from the movie arr to avoid storing unnecessary data
    const importantData = {
      ["Title"]: movie.Title,
      ["Poster"]: movie.Poster,
      ["imdbRating"]: movie.imdbRating,
      ["Genre"]: movie.Genre,
      ["Plot"]: movie.Plot,
      ["Runtime"]: movie.Runtime,
    };

    // add extracted object to localstorage
    watchList.push(importantData);
    localStorage.setItem("movies", JSON.stringify(watchList));
  }
}
