import React, {useState, useEffect} from 'react';

// function to fetch the data from the API
function FetchAPIData() {
    let url = 'http://sefdb02.qut.edu.au:3000/movies/search';

    return fetch(url)
        .then(response => response.json())
        .then(response => response.data)
}


export default function Movies() {
    // useState to update the state
    const [movies, setMovies] = useState([]);

    // load the API data upon page load
    useEffect(() => {
        FetchAPIData()
            .then(movies => setMovies(movies));
    }, [])
    

    return (
        <div>
            <h1>Movies</h1>
            {movies.map(movie => movie.title)}
        </div>
    )
}