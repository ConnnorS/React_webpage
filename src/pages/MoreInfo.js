import React from "react"
import { useSearchParams } from "react-router-dom"

export default function MoreInfo() {
    // get the search parameters (imdbID)
    const [searchParams] = useSearchParams();
    const imdbID = searchParams.get("imdbID");

    return (
    <div>
        <h1>More Info</h1>
        <h2>Your ID is {imdbID}</h2>
    </div>
    )
}