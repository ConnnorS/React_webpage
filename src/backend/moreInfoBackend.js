// function to fetch the movie's information
export function GetMovieInfo(imdbID) {
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