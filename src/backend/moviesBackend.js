// function to get information from the search bars
function getSearchParams() {
    return {searchTitle: document.getElementById("searchBar").value, 
            searchYear: document.getElementById("yearBar").value};
}

// function to fetch the data from the API
export function FetchMovieData(page) {
    // get the search parameters
    const searchParams = getSearchParams();

    // check if any of the variables are undefined to avoid a bad query
    if (searchParams.searchTitle === undefined) searchParams.searchTitle = '';
    if (searchParams.searchYear === undefined) searchParams.searchYear = '';
    if (page === undefined) page = '';
    
    // fetch the data and return it
    let url = `http://sefdb02.qut.edu.au:3000/movies/search?title=${searchParams.searchTitle}&year=${searchParams.searchYear}&page=${page}`;
    return fetch(url, {method: "GET"})
        .then(response => {
            switch(response.status) {
                case 200:
                    return response.json();
                
                case 400:
                    throw new Error("Invalid Query");

                case 429:
                    throw new Error("Too Many Requests");
            }
        })
        .then(response => response.data)
}