import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';

// function to pull the actor info from the API
function GetActorInfo(actorID) {
  console.log("Fetching Actor Data...");
  const url = `http://sefdb02.qut.edu.au:3000/people/${actorID}`;
  const token = localStorage.getItem("token"); // get the web token for local storage for authentication

  // fetch the data
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 200) { // verify our response is ok
      console.log("\tResponse OK");
      return response.json();
    } else { // if the response isn't ok, throw an error
      console.log("\tReponse Not OK");
      throw new Error(response.statusText);
    }
  });
}

// function to put each rating in an array and return it
function getRatings(data) {
  let temp = []; // temperary array to store the ratings
  // for each element in the data array, round it and push it to the temp array
  data.forEach(element => {
    const rating = Math.round(element.imdbRating);
    temp.push(rating);
  });
  // return the new populated array
  return temp;
}

// column definitions for table
const columns = [
  { headerName: "Movie", field: "movieName" },
  { headerName: "ID", field: "movieId" },
  { headerName: "Role", field: "category" },
  { headerName: "Character", field: "characters" },
];

// function to display the actor info
export default function Actor() {
  const [actor, setActor] = useState([]);
  const [ratings, setRatings] = useState([]);
  const Navigate = useNavigate();
  const isMounted = useRef(false);

  // get the actor id
  const [searchParams] = useSearchParams();
  const actorID = searchParams.get("id"); // get the actor info from the search paramameters

  // check if the user is logged in
  function checkLogin() {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) { // if the user is logged in, get the actor info
      GetActorInfo(actorID)
        .then(info => { setActor(info); setRatings(getRatings(info.roles)); })
    }
    else { // if the user isn't logged in, alert them and navigate to the movies page
      alert("You must be logged in to view this content");
      Navigate("/movies");
    }
  }

  // don't mount the useEffect upon initial render
  // (avoids two altert()'s)
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    checkLogin();
  }, []);

  /* chart data */
  // count the occurence of each rating
  const occurence = new Array(10).fill(0);
  ratings.forEach(element => {
    occurence[element - 1]++;
  });
  // prepare the chart data
  const chartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], // x-axis
    datasets: [{ // y-axis
      label: 'Occurence of IMDB Rating',
      data: occurence,
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
    }]
  };

  return (
    <div className="actor">
      {/* display the actor's main info */}
      <div className="actorTitle">
        <h1>{actor.name}</h1>
        <br />
        <h4>{actor.birthYear} -  {actor.deathYear}</h4>
        <br />
      </div>
      <br />
      {/* display the actor's IMDB ratings */}
      <div className="ratingsChart">
        <h2>{actor.name}'s IMDB Ratings</h2>
        <Bar data={chartData} />
      </div>
      <br /><br />
      {/* display the actor's roles */}
      <h2>{actor.name}'s Roles</h2>
      <div className="moviesTable">
        <AgGridReact
          domLayout="autoHeight"
          className="mainTable"
          columnDefs={columns}
          rowData={actor.roles}
        />
      </div>
      <br />

    </div>
  );
}
