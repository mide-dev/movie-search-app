"use strict";

import { showLoader } from "./utility.js";

// GET search data from OMBD API
export async function getSearchResult() {
  const input = document.querySelector(".input");
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
    return;
  }
}
