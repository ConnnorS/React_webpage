import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function GetActorInfo(actorID) {
  console.log("Fetching Actor Data");
  const url = `http://sefdb02.qut.edu.au:3000/people/${actorID}`;
  const token = localStorage.getItem("token");

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    switch (response.status) {
      case 200:
        console.log("Response OK");
        return response.json();
      case 400:
      case 401:
      case 404:
      case 429:
        console.log("Response not OK");
        throw new Error(response.statusText);
    }
  });
}

export default function Actor() {
  // create a state variable for the actor infomation
  const [actor, setActor] = useState([]);
  const [notLoggedInMessage, setNotLoggedInMessage] = useState("");

  // get the search parameters
  const [searchParams] = useSearchParams();
  const actorID = searchParams.get("id");

  useEffect(() => {
    GetActorInfo(actorID).then((info) => setActor(info));
  }, []);

  return (
    <div className = "actor">
      <h1>{notLoggedInMessage}</h1>
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
  );
}
