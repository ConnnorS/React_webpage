import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';

// function to pull the actor info from the API
function GetActorInfo(actorID) {
  console.log("Fetching Actor Data...");
  const url = `http://sefdb02.qut.edu.au:3000/people/${actorID}`;
  const token = localStorage.getItem("token");

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 200) {
      console.log("\tResponse OK");
      return response.json();
    } else {
      console.log("\tReponse Not OK");
      throw new Error(response.statusText);
    }
  });
}

// function to put each rating in an array and return it
function getRatings(data) {
  let temp = [];
  data.forEach(element => {
    const rating = Math.round(element.imdbRating);
    temp.push(rating);
  });

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
  const actorID = searchParams.get("id");

  // check if the user is logged in
  function checkLogin() {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn) {
      GetActorInfo(actorID)
        .then(info => {
          setActor(info);

          setRatings(getRatings(info.roles));
          console.log(ratings);

        })
    }
    else {
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

  // chart
  // store the occurence of each number
  const occurence = new Array(10).fill(0);
  ratings.forEach(element => {
    occurence[element - 1]++;
  });
  // prepare the chart data
  const chartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [{
      label: 'Rounded IMDB Rating',
      data: occurence,
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 1,
    }]    
  };

  return (
    <div className="actor">
      <div className="actorTitle">
      <h2>Actor</h2>
      <p>
        Name: {actor.name}
        <br />
        Birth Year: {actor.birthYear}
        <br />
        Death Year: {actor.deathYear}
        <br />
      </p>
      </div>
      <div className="moviesTable">
        <AgGridReact
          domLayout="autoHeight"
          className="mainTable"
          columnDefs={columns}
          rowData={actor.roles}
        />
      </div>
      <div className="ratingsChart">
        <Bar data={chartData}/>
      </div>
    </div>
  );
}
