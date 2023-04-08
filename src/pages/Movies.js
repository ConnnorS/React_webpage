import React, {useState, useEffect} from 'react';

function PullAPI() {
    let url = "/moviesSearch.json";

    return (
    fetch(url)
        .then((res) => res.json())
        .then((res) => res.data[0])
    );
}

export default function Movies() {
    const [moviesData, setMovies] = useState([]);

    useEffect(() => {
        setMovies(PullAPI())
    }, []);

    return (
        <div>
        </div>
    );
}