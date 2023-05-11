import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

// function to fetch the movie's information
function GetMovieInfo(imdbID) {
  console.log("Fetching Movie Info...");
  const url = `http://sefdb02.qut.edu.au:3000/movies/data/${imdbID}`;

  return fetch(url, { method: "GET" }).then((response) => {
    if (response.status === 200) {
      console.log("\tResponse OK");
      return response.json();
    } else {
      console.log("\tResponse Not OK");
      throw new Error(response.statusText);
    }
  });
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
      <br />

      <div className="moreInfoDataWrapper">

        <div className="moreInfoPoster">
          <img id="poster" src={movieInfo.poster} alt="Poster for selected movie." />

          <div className="moreInfoMetadata">
            <b>Released in: </b>
            {movieInfo.year}
            <br />
            <b>Run time: </b>
            {movieInfo.runtime} minutes
            <br />
            <b>Country: </b>
            {movieInfo.country}
            <br />
            <br />
            <b>Genres:</b>
            {movieInfo.genres?.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
            <br />
            <b>Box Office: </b>$
            {movieInfo.boxoffice?.toLocaleString()}
            <br />
            <br />
            <b>Ratings:</b>
            {movieInfo.ratings?.map((rating, index) => (
              <li key={index}>
                {rating.source}: {rating.value}
              </li>
            ))}
            <br />
            <b>Plot: </b>
            <br />
            <div className="plot">
              <i>{movieInfo.plot}</i>
            </div>
          </div>

        </div>

      </div>
      <br />

      {/* the table of actors */}

      <div className="mainTable">
        <h2>{movieInfo.title}'s Cast:</h2>
        <br />
        <AgGridReact
          domLayout="autoHeight"
          columnDefs={columns}
          rowData={movieInfo.principals}
          onRowClicked={(row) => navigate(`/actor?id=${row.data.id}`)}
        />
      </div>
    </div>
  );
}
