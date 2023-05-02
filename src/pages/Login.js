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

    console.log(`Sending ${refreshToken}`);

    return fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({refreshToken: refreshToken})
    })
    // check if the response is ok
    .then(result => {
        if (result.ok) {return result.json()} 
        else {throw new Error(result.statusText)}
    })
    .then(result => {
        console.log("Result OK");
        console.log(result);

        localStorage.setItem("token", result.bearerToken.token);
        localStorage.setItem("refreshToken", result.refreshToken.token);

        return "Token Refreshed";
    })
    .catch(() => {return "Error in token Refresh"});
}

// function to login the user
function SignInUser() {
    const url = "http://sefdb02.qut.edu.au:3000/user/login";
    const data = GetEmailAndPassword();

    console.log("Attempting Login");
    console.log(`Sending email: ${data.email} and password: ${data.password}`);

    // log in the user and get the bearer token if successful
    return fetch(url, {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: data.email, password: data.password})
    })
    // check if the response is ok
    .then(result => {
        if (result.ok) {return result.json()} 
        else {throw new Error(result.statusText)}
    })
    // get the bearer token and its expiry
    .then(result => {
        console.log("Result OK");
        console.log(result);
        localStorage.setItem("token", result.bearerToken.token);
        localStorage.setItem("refreshToken", result.refreshToken.token);
        localStorage.setItem("loggedIn", true);
        // call the refresh token function every 10 minutes
        setTimeout(RefreshBearer, result.bearerToken.expires_in * 1000);

        return "Login Successful";
    })
    // return an error if something went wrong
    .catch(() => {return "Error in Login"});
}

export default function Login() {
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
                <button type = "submit" onClick = {() => {SignInUser(); window.location.reload()}}>Confirm!</button>
            </strong></form>
        </div>
    )
}