import { useEffect } from "react";

// function to logout the user
function LogoutUser() {
    const url = "http://sefdb02.qut.edu.au:3000/user/logout";
    const refreshToken = localStorage.getItem("refreshToken");

    console.log("Attempting Logout");
    console.log(refreshToken);

    // log out the user
    fetch(url, {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({refreshToken: refreshToken})
    })
    .then(response => {
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
    .then(() => localStorage.clear())
}

export default function Logout() {
    useEffect(() => LogoutUser, []);
    return (
        <div className = "logout">
            <h1>Logout</h1>
        </div>
    )
}