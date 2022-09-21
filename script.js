"use strict";

import { hideLoader } from "./comp/utility.js";
import { initWatchlist } from "./comp/userWatchlist.js";
import { displayMovieData } from "./comp/displayMovieData.js";

// Declare variables
const input = document.querySelector(".input");
const searchBar = document.querySelector(".search-bar");

hideLoader();
initWatchlist();
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
