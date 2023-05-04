import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

// function to fetch the movie's information
function GetMovieInfo(imdbID) {
  console.log("Fetching Movie Info");
  const url = `http://sefdb02.qut.edu.au:3000/movies/data/${imdbID}`;

  return fetch(url, { method: "GET" }).then(response => {
    if (response.status == 200) {
        console.log("Response OK");
        return response.json();
    }
    else {
      console.log("Response Note OK");
      throw new Error(response.statusText);
    }       
  })
}

// columns for actor information
const columns = [
  { headerName: "Role", field: "category" },
  { headerName: "Name", field: "name" },
  { headerName: "Character/s", field: "characters" },
];

export default function MoreInfo() {
  // page setup
  const [movieInfo, setMovieInfo] = useState([]);
  const [searchParams] = useSearchParams();
  const imdbID = searchParams.get("imdbID");
  const navigate = useNavigate();

  // fetch the API info upon page load
  useEffect(() => {
    GetMovieInfo(imdbID).then((info) => setMovieInfo(info));
  }, []);

  return (
    <div className="moreInfo">
      <h1>{movieInfo.title}</h1>

      <p>
        Released in: {movieInfo.year}
        <br />
        Run time: {movieInfo.runtime} minutes
        <br />
        Genres:{" "}
        {movieInfo.genres?.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
        <br />
        Country: {movieInfo.country}
        <br />
        Box Office: ${movieInfo.boxoffice?.toLocaleString()}
        <br />
        <br />
        <i>{movieInfo.plot}</i>
        <br />
        <br />
        <img src={movieInfo.poster} alt="Movie Poster" />
      </p>

      {/* the table of actors */}
      <div
        className="ag-theme-balham"
        style={{ height: "300px", width: "605px" }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={movieInfo.principals}
          onRowClicked={(row) => navigate(`/actor?id=${row.data.id}`)}
        />
      </div>
    </div>
  );
}
