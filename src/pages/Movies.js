// import statements
import React, {useState, useEffect} from 'react';

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";

import { useNavigate } from 'react-router-dom';

// column definitions for table
const columns = [
    {headerName: "Title",
    field: "title",},
    {headerName: "Year",
    field: "year"},
    {headerName: "IMDB Rating",
    field: "imdbRating"},
    {headerName: "RottenTomatoes",
    field: "rottenTomatoesRating"},
    {headerName: "MetaScore",
    field: "metacriticRating"},
    {headerName: "Classification",
    field: "classification"},
]

// function to get information from the search bars
function getSearchParams() {
    return {searchTitle: document.getElementById("searchBar").value, 
            searchYear: document.getElementById("yearBar").value};
}

// function to fetch the data from the API
function FetchAPIData(page) {
    // get the search parameters
    const searchParams = getSearchParams();

    // check if any of the variables are undefined to avoid a bad query
    if (searchParams.searchTitle === undefined) searchParams.searchTitle = '';
    if (searchParams.searchYear === undefined) searchParams.searchYear = '';
    if (page === undefined) page = '';
    
    // fetch the data and return it
    let url = `http://sefdb02.qut.edu.au:3000/movies/search?title=${searchParams.searchTitle}&year=${searchParams.searchYear}&page=${page}`;
    return fetch(url, {method: "GET"})
        .then(response => {
            switch(response.status) {
                case 200:
                    return response.json();
                
                case 400:
                    throw new Error("Invalid Query");

                case 429:
                    throw new Error("Too Many Requests");
            }
        })
        .then(response => response.data)
}


export default function Movies() {
    // useState to update the array of movies
    // and to keep track of the page number
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();

    // function to fetch and set API data (for cleaner code)
    function setAPIData() {
        FetchAPIData(currentPage)
            .then(movies => setMovies(movies));
    }

    // load the API data upon page load
    // re-load when the page changes
    useEffect(() => setAPIData(), [currentPage])
    

    return (
        <div className='movies'>

        {/* search boxes to filter movies */}
        <div className = "search">
              <h4>
                Movies containing the text: &nbsp;
                <input type = "text" id = "searchBar"/>
                &nbsp; from year: &nbsp;
                <input type = "number" id = "yearBar"/>
                &nbsp;
                <button id = "searchButton" onClick = {() => setAPIData()}>Search!</button>
              </h4>             
        </div>

        {/* the table of movies */}
        <div
        style={{height: "800px", width: "800px"}}>            
            <AgGridReact 
            className= "mainTable"
                columnDefs = {columns}
                rowData = {movies}
                onRowClicked={(row) => navigate(`/moreInfo?imdbID=${row.data.imdbID}`)}
            />
        </div>

        {/* buttons to move back and fourth through the pages */}
        <div className = "tableNav">
            <button onClick = {() => {
                // change the current page to trigger the useEffect and change pages
                // only allow the page to go back if it's >= 2
                if (currentPage >= 2) {
                    setCurrentPage(currentPage - 1)
                }
                }}>Previous Page</button>
            {currentPage}
            <button onClick = {() => {setCurrentPage(currentPage + 1)}}>Next Page</button>
        </div>

        </div>
    )
}