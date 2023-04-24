import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Actor() {
    // create a state variable for the actor infomation
    const [actor, setActor] = useState([]);

    // get the search parameters
    const [searchParams] = useSearchParams();
    const actorID = searchParams.get("id");

    const url = `http://sefdb02.qut.edu.au:3000/people/${actorID}`;
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(result => result.json())
        .then(result => setActor(result));
    }, [])

    return (
        <div>
            <h2>Actor</h2>
            <p>
                Name: {actor.name}<br/>
                Birth Year: {actor.birthYear}<br/>
                Death Year: {actor.deathYear}<br/>

            </p>
        </div>
    )
}