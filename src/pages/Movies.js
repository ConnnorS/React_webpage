import React, {useState, useEffect} from 'react';

function pullData() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('/moviesSearch.json')
        .then(response => response.json())
        .then(movies => setMovies(movies));
    }, [])
}



export default function Movies() {
    return (
        <div>
            <h1>Movies</h1>
        </div>
    )
}