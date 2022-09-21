"use strict";

import { myWatchlist } from "./userWatchlist.js";
import { hideLoader } from "./utility.js";
import { getMovieData } from "./getMovieData.js";

// let user save movie to watchlist
export async function addToWatchlist() {
  const retrieveMovies = await getMovieData();
  if (retrieveMovies.length === 0) return;

  //hide pre-loader
  hideLoader();

  // use watchlist-btn index to match
  // btn clicked with movies in retrieveMovie arr
  const addMovieBtn = document.querySelectorAll(".add-movie");
  addMovieBtn.forEach((movie, i) => {
    movie.addEventListener("click", () => {
      myWatchlist(retrieveMovies[i], "add");
    });
  });
}
