import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function MoreInfo() {
    // useState variable for more in-depth movie information
    const [mainInfo, setMainInfo] = useState([]);
    const [formattedInfo, setFormattedInfo] = useState([]);

    // get the search parameters (imdbID)
    const [searchParams] = useSearchParams();
    const imdbID = searchParams.get("imdbID");

    // fetch the API info
    const url = `http://sefdb02.qut.edu.au:3000/movies/data/${imdbID}`;
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(mainInfo => setMainInfo(mainInfo));
    }, []);

    return (
    <div>
        <h1>{mainInfo.title}</h1>

        <p>
            Released in: {mainInfo.year}<br/>
            Run time: {mainInfo.runtime} minutes<br/>
            Genres: {mainInfo.genres}<br/>
            Country: {mainInfo.country}<br/>
            Box Office: ${mainInfo.boxoffice}<br/>
            <br/>
            <i>{mainInfo.plot}</i><br/>
            <br/>
            <img src = {mainInfo.poster}/>
        </p>
    </div>
    )
}