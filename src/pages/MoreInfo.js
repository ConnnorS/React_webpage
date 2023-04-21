import React, { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
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


export default function MoreInfo() {
    // useState variable for more in-depth movie information
    const [mainInfo, setMainInfo] = useState([]);

    // get the search parameters (imdbID)
    const [searchParams] = useSearchParams();
    const imdbID = searchParams.get("imdbID");

    // fetch the API info
    const url = `http://sefdb02.qut.edu.au:3000/movies/data/${imdbID}`;
    useEffect(() => {
        fetch(url, {method: "GET"})
            .then(response => response.json())
            .then(mainInfo => setMainInfo(mainInfo));
    }, []);

    return (
    <div>
        <Link to = "/">Back</Link>

        <h1>{mainInfo.title}</h1>

        <p>
            Released in: {mainInfo.year}<br/>
            Run time: {mainInfo.runtime} minutes<br/>
            Genres: {mainInfo.genres?.map((genre) => (
                <li key = {genre}>{genre}</li>
            ))}<br/>
            Country: {mainInfo.country}<br/>
            Box Office: ${mainInfo.boxoffice?.toLocaleString()}<br/>
            <br/>
            <i>{mainInfo.plot}</i><br/>
            <br/>
            <img src = {mainInfo.poster}/>
        </p>

        {/* the table of movies */}
        <div className = "ag-theme-balham"
        style={{height: "300px", width: "605px"}}>            
            <AgGridReact
                columnDefs = {columns}
                rowData = {mainInfo.principals}
            />
        </div>
    </div>
    )
}