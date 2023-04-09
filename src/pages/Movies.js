import React, {useState, useEffect} from 'react';

export default function Movies() {
    const [movies, setMovies] = useState([]);

    let url = '/movies.json';

    let data = fetch(url)
        .then(response => response.json())
        .then(movie => setMovies(movie));

    return (
        <div>
            <h1>Movies</h1>
            <h2>{}</h2>
        </div>
    )
}