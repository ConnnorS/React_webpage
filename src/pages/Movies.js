import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";

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
function getSearch() {
    return document.getElementById("searchBar");
}


// function to filter the API data based on a search term
function FilterData(searchParam, data) {
    searchParam = searchParam.value;
    let returnValue = [];

    // loop through the data array to find matches
    data.forEach(element => {
        if (element.title.toLowerCase().includes(searchParam)) {
            returnValue.push(element);
        }       
    });

    return returnValue;
}

// function to fetch the data from the API
function FetchAPIData() {
    let url = 'http://sefdb02.qut.edu.au:3000/movies/search';

    return fetch(url)
        .then(response => response.json())
        .then(response => response.data)
}


export default function Movies() {
    // useState to update the array of movies objects
    const [movies, setMovies] = useState([]);
    const [originalData, setOriginalData] = useState([]);

    // load the API data upon page load
    useEffect(() => {
        FetchAPIData()
            .then(movies => {setMovies(movies);
                            setOriginalData(movies)})
    }, [])
    

    return (
        <div className='movies'>

        <div className = "search">
              <h3>
                Movies containing the text: 
                <input type = "text" id = "searchBar"/>
                from year: 
                <input id = "yearBar"/>
                <button onClick={() => {setMovies}}>Search!</button>
              </h3>              
        </div>


        <div className = "ag-theme-balham"
        style={{height: "300px", width: "800px"}}>            
            <AgGridReact
                columnDefs = {columns}
                rowData = {movies}
            />
        </div>
        </div>
    )
}