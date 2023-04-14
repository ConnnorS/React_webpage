// import statements
import React, {useState, useEffect} from 'react';

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";

import { useNavigate } from 'react-router-dom';

// column definitions for table
const columns = [
    {headerName: "Title",
    field: "title",
    sortable: true},
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

// function to get information from the search bar
function getSearchParams() {
    return [document.getElementById("searchBar"), document.getElementById("yearBar")];
}

// function to fetch the data from the API
function FetchAPIData(page) {
    // get the search parameters
    const searchParams = getSearchParams();
    let title = searchParams[0].value;
    let year = searchParams[1].value;

    // check if any of the variables are undefined to avoid a bad query
    title === undefined ? title = '' : title = title;
    year === undefined ? year = '' : year = year;
    page === undefined ? page = '' : page = page;
    
    // fetch the data and return it
    let url = `http://sefdb02.qut.edu.au:3000/movies/search?title=${title}&year=${year}&page=${page}`;
    return fetch(url)
        .then(response => response.ok ? response.json() : Promise.reject("Network response was not ok"))
        .then(response => response.data)
        .catch(error => {console.error("Error: ", error);});
}


export default function Movies() {
    // useState to update the array of movies
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // set up the navigate function to move across pages
    const navigate = useNavigate();

    // function to fetch and set API data (for cleaner code)
    function setAPIData() {
        FetchAPIData(currentPage)
            .then(movies => setMovies(movies));
    }

    // load the API data upon page load
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
        <div className = "ag-theme-balham"
        style={{height: "800px", width: "800px"}}>            
            <AgGridReact
                columnDefs = {columns}
                rowData = {movies}
                onRowClicked={(row) => navigate(`/moreInfo?imdbID=${row.data.imdbID}`)}
            />
        </div>

        {/* buttons to move back and fourth through the pages */}
        <div className = "tableNav">
            <button onClick = {() => {
                // change the current page to trigger the useEffect and change pages
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