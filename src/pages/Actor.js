import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

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
    if (response.status == 200) {
      console.log("\tResponse OK");
      return response.json();
    } else {
      console.log("\tReponse Not OK");
      throw new Error(response.statusText);
    }
  });
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
  // create a state variable for the actor infomation
  const [actor, setActor] = useState([]);

  const Navigate = useNavigate();
  const isMounted = useRef(false);

  // get the search parameters
  const [searchParams] = useSearchParams();
  const actorID = searchParams.get("id");

  // function to check if the user is logged in
  function checkLogin() {
    const loggedIn = localStorage.getItem("loggedIn");
    console.log(loggedIn);
    if (loggedIn) GetActorInfo(actorID).then((info) => setActor(info));
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

  return (
    <div className="actor">
      <h2>Actor</h2>
      <p>
        Name: {actor.name}
        <br />
        Birth Year: {actor.birthYear}
        <br />
        Death Year: {actor.deathYear}
        <br />
      </p>
      <div className="moviesTable">
        <AgGridReact
          domLayout="autoHeight"
          className="mainTable"
          columnDefs={columns}
          rowData={actor.roles}
        />
      </div>
    </div>
  );
}
