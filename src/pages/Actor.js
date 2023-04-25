import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { GetActorInfo } from "../backend/actorBackend";

export default function Actor() {
    // create a state variable for the actor infomation
    const [actor, setActor] = useState([]);

    // get the search parameters
    const [searchParams] = useSearchParams();
    const actorID = searchParams.get("id");
   
    useEffect(() => {GetActorInfo(actorID).then(info => setActor(info))}, [])

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