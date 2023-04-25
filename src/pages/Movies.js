// import statements
import React, {useState, useEffect} from 'react';

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";

import { useNavigate } from 'react-router-dom';

import { FetchMovieData } from '../backend/moviesBackend';

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

export default function Movies() {
    // page setup
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    // set the data on page load or when the page changes
    useEffect(() => setAPIData(), [currentPage]);
    function setAPIData() {
        FetchMovieData(currentPage)
            .then(movies => setMovies(movies));
    }

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