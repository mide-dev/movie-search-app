"use strict";

import { getSearchResult } from "./getSearchResult.js";

// Get each movie data
export async function getMovieData() {
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
    return;
  }
}
