import { useEffect, useState } from "react";
import { Link } from "react-router-dom"


function LoggedOff() {
    return (
    <>
        <li>
            <Link to = "/register">Register</Link>
        </li>
        <li>
            <Link to = "/login">Login</Link>
        </li>
    </>
    )
}

function LoggedOn() {
    return (
    <>
        <li>
            <Link to = "/Logout">Log Out</Link>
        </li>
    </>
    )

}

// navigation
function Navigation() {
    return (
    <>
        <li>
            <Link to = "/">Home</Link>
        </li>
        <li>
            <Link to = "/movies">Movies</Link>
        </li>        
    </>
    )
}

// header
export default function Header() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const status = localStorage.getItem("loggedIn");
        if (status != null) setLoggedIn(status);
    }, [])

    if (!loggedIn) {
            return (
        <header><nav><ul><h1>
            <Navigation/><LoggedOff/>
        </h1></ul></nav></header>
    )
    }
    else {
        return (
        <header><nav><ul><h1>
            <Navigation/><LoggedOn/>
        </h1></ul></nav></header>
        )
    }



}