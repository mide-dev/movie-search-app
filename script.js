"use strict";

// Declare variables
const input = document.querySelector(".input");
const search = document.querySelector(".search");

// GET data from OMBD API
async function getMovieData() {
  const searchInput = input.value;
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=e639720b&s=${searchInput}`
  );
  const movies = await response.json();
  console.log(movies);
}

search.addEventListener("click", getMovieData);
