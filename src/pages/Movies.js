// import statements
import React, { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";

import { useNavigate } from "react-router-dom";

// function to get information from the search bars
function getSearchParams() {
  console.log("\tGetting Search Params");

  return {
    searchTitle: document.getElementById("searchBar").value,
    searchYear: document.getElementById("yearBar").value,
  };
}

// function to fetch the data from the API
function FetchMovieData(page) {
  console.log("Fetching Movie Data...");

  // get the search parameters
  const searchParams = getSearchParams();

  // check if any of the variables are undefined to avoid a bad query
  if (searchParams.searchTitle === undefined) searchParams.searchTitle = "";
  if (searchParams.searchYear === undefined) searchParams.searchYear = "";
  if (page === undefined) page = "";

  // fetch the data and return it
  let url = `http://sefdb02.qut.edu.au:3000/movies/search?title=${searchParams.searchTitle}&year=${searchParams.searchYear}&page=${page}`;
  return fetch(url, { method: "GET" })
    .then((response) => {
      if (response.status == 200) {
        console.log("\tResponse OK");
        return response.json();
      } else {
        console.log("\tResponse not OK");
        throw new Error(Response.statstext);
      }
    })
    .then((response) => response.data);
}

// column definitions for table
const columns = [
  { headerName: "Title", field: "title" },
  { headerName: "Year", field: "year" },
  { headerName: "IMDB Rating", field: "imdbRating" },
  { headerName: "RottenTomatoes", field: "rottenTomatoesRating" },
  { headerName: "MetaScore", field: "metacriticRating" },
  { headerName: "Classification", field: "classification" },
];

export default function Movies() {
  // page setup
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // set the data on page load or when the page changes
  useEffect(() => setAPIData(), [currentPage]);

  function setAPIData() {
    FetchMovieData(currentPage).then((movies) => setMovies(movies));
  }

  return (
    <div className="movies">
      {/* search boxes to filter movies */}
      <div className="search">
        <h4>
          Movies containing the text: &nbsp;
          <input type="text" id="searchBar" />
          &nbsp; from year: &nbsp;
          <input type="number" id="yearBar" />
          &nbsp;
          <button onClick={() => setAPIData()}>Search</button>&emsp;
          <button onClick={() => window.location.reload()}>Reset</button>
        </h4>
      </div>

      {/* the table of movies */}
      <div
        style={{ height: "1200px", width: "1250px" }}
        className="moviesTable"
      >
        <AgGridReact
          className="mainTable"
          columnDefs={columns}
          rowData={movies}
          onRowClicked={(row) =>
            navigate(`/moreInfo?imdbID=${row.data.imdbID}`)
          }
        />
      </div>

      {/* buttons to move back and fourth through the pages */}
      <div className="tableNav">
        <button
          onClick={() => {
            // change the current page to trigger the useEffect and change pages
            // only allow the page to go back if it's >= 2
            if (currentPage >= 2) {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          Previous Page
        </button>
        <text>&emsp; Page: {currentPage}&emsp;</text>
        <button
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
