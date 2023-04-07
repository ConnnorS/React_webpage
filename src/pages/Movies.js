import React, {useState, useEffect} from 'react';

function PullAPI() {
    let url = "/moviesSearch.json";

    return (
    fetch(url)
        .then((res) => res.json())
        .then((res) => res.data[1])
    );
}

function GetData(props) {
    console.log(props);

    return (
        <div className = "Movies">
            <p>{props.title}</p>
        </div>
    )
}


export default function Movies() {
    const [moviesData, setMovies] = useState([]);

    return (
        <div classname = "MoviesPage">
            <h1>Movies</h1>
            <button onClick = {() => {
                PullAPI().then(moviesData => {
                    setMovies(moviesData);
                });
            }}
            >
                Get Movies
            </button>
            <GetData {...moviesData}/>
        </div>
    );
}