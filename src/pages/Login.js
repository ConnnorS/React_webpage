import { useState } from "react";

// function to get information from the email and password bars
function GetEmailAndPassword() {
    // return the user's input as an object
    return {email: document.getElementById("userEmail").value,
            password: document.getElementById("userPassword").value};
}

// function to refresh the token
function RefreshBearer() {
    const refreshToken = localStorage.getItem("refreshToken");
    const url = "http://sefdb02.qut.edu.au:3000/user/refresh";

    return fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({refreshToken: refreshToken})})
    .then(result => {
        const bearerExpiry = new Date().getTime() + result.bearerToken.expires_in * 1000;
        localStorage.setItem("token", result.bearerToken.token);
        localStorage.setItem("refreshToken", result.refreshToken.token);
        localStorage.setItem("bearerExpiration", bearerExpiry);

        return "Token Refreshed";
    })
    .catch(() => {return "Error in token Refresh"});

}

// function to check if the token is expired
function isBearerExpired() {
    const expirationTime = localStorage.getItem("bearerExpiration");
    if (expirationTime && new Date().getTime() > expirationTime) RefreshBearer();
}

// function to login the user
function SignIn() {
    const url = "http://sefdb02.qut.edu.au:3000/user/login";
    const data = GetEmailAndPassword();

    // log in the user and get the bearer token if successful
    return fetch(url, {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: data.email, password: data.password})})
        // check if the response is ok
    .then(result => {
        if (result.ok) {return result.json()} 
        else {throw new Error(result.statusText)}
    })
    // get the bearer token and its expiry
    .then(result => {
        console.log(result.bearerToken);
        console.log(result.refreshToken);
        const bearerExpiry = new Date().getTime() + result.bearerToken.expires_in * 1000;
        localStorage.setItem("token", result.bearerToken.token);
        localStorage.setItem("refreshToken", result.refreshToken.token);
        localStorage.setItem("bearerExpiration", bearerExpiry);
        localStorage.setItem("loggedIn", true);
        // call the refresh token function every 10 minutes
        setInterval(isBearerExpired(), 600000)

        return "Login Successful";
    })
    // return an error if something went wrong
    .catch(() => {return "Error in Login"});
}

export default function Login() {
    const [loginStatus, setLoginStatus] = useState("Status");

    return (
        <div>
            <h1>Login</h1>
            <br/>
            <form><strong>
            <label htmlFor = "userEmail">Your Email: </label>
                <input id = "userEmail" name = "userEmail" type = "text"/>
                <br/>
                <label htmlFor = "userPassword">Password: </label>
                <input id = "userPassword" name = "userPassword" type = "text"/>
                <br/>
            </strong></form>
            <button onClick = {() => SignIn().then(response => setLoginStatus(response))}>Confirm!</button>
            <p>{loginStatus}</p>
        </div>
    )
}