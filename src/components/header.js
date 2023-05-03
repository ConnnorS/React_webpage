import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// function to logout the user
export function LogoutUser() {
    const url = "http://sefdb02.qut.edu.au:3000/user/logout";
    const refreshToken = localStorage.getItem("refreshToken");

    console.log("Attempting Logout");
    console.log(refreshToken);

    // log out the user
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: refreshToken }),
    })
        .then((response) => {
            switch (response.status) {
                case 200:
                    console.log("Successfully Logged Out");
                    break;
                case 400:
                case 401:
                case 429:
                    console.log("Logout Unsuccessful");
                    throw new Error(response.statusText);
            }
        })
        .then(() => localStorage.clear());
}

function LoggedOff() {
    return (
        <>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </>
    );
}

function LoggedOn() {
    const Navigate = useNavigate();

    return (
        <>
            <li>
                <button
                    onClick={() => {
                        LogoutUser()
                            .then(() => Navigate("/"))
                            .then(() => window.location.reload());
                    }}
                >
                    Logout
                </button>
            </li>
        </>
    );
}

// navigation
function Navigation() {
    return (
        <>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/movies">Movies</Link>
            </li>
        </>
    );
}

// header
export default function Header() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const status = localStorage.getItem("loggedIn");
        if (status != null) setLoggedIn(status);
    }, []);

    if (!loggedIn) {
        return (
            <header>
                <nav>
                    <ul>
                        <h1>
                            <Navigation />
                            <LoggedOff />
                        </h1>
                    </ul>
                </nav>
            </header>
        );
    } else {
        return (
            <header>
                <nav>
                    <ul>
                        <h1>
                            <Navigation />
                            <LoggedOn />
                        </h1>
                    </ul>
                </nav>
            </header>
        );
    }
}
