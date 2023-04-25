import React, { useEffect, useState } from "react"
import { useSearchParams, Link, useNavigate } from "react-router-dom"
import { AgGridReact } from 'ag-grid-react';

// columns for actor information
const columns = [
    {headerName: "Role",
    field: "category"},
    {headerName: "Name",
    field: "name"},
    {headerName: "Character/s",
    field: "characters"}
]

// function to fetch the movie's information
function GetMovieInfo(imdbID) {
    const url = `http://sefdb02.qut.edu.au:3000/movies/data/${imdbID}`;

    return fetch(url, {method: "GET"})
            .then(response => {
                switch(response.status) {
                    case 200:
                        return response.json();

                    case 400:
                        throw new Error("Invalid Query Parameter");

                    case 404:
                        throw new Error("Movie ID Not Found");

                    case 429:
                        throw new Error("Too Many Requests");
                }
            });
}


export default function MoreInfo() {
    // useState variable for more in-depth movie information
    const [movieInfo, setMovieInfo] = useState([]);

    // get the search parameters (imdbID)
    const [searchParams] = useSearchParams();
    const imdbID = searchParams.get("imdbID");

    // set up the navigate function to move across pages
    const navigate = useNavigate();

    // fetch the API info upon page load
    useEffect(() => {GetMovieInfo(imdbID).then(info => setMovieInfo(info))}, []);

    return (
    <div>
        <h1>{movieInfo.title}</h1>

        <p>
            Released in: {movieInfo.year}<br/>
            Run time: {movieInfo.runtime} minutes<br/>
            Genres: {movieInfo.genres?.map((genre) => (
                <li key = {genre}>{genre}</li>
            ))}<br/>
            Country: {movieInfo.country}<br/>
            Box Office: ${movieInfo.boxoffice?.toLocaleString()}<br/>
            <br/>
            <i>{movieInfo.plot}</i><br/>
            <br/>
            <img src = {movieInfo.poster} alt = "Movie Poster"/>
        </p>

        {/* the table of actors */}
        <div className = "ag-theme-balham"
        style={{height: "300px", width: "605px"}}>            
            <AgGridReact
                columnDefs = {columns}
                rowData = {movieInfo.principals}
                onRowClicked={row => navigate(`/actor?id=${row.data.id}`)}
            />
        </div>
    </div>
    )
}