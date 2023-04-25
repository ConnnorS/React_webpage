import { useState } from "react";

// function to get information from the email and password bars
function GetEmailAndPassword() {
    // return the user's input as an object
    return {email: document.getElementById("userEmail").value,
            password: document.getElementById("userPassword").value}
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
        .then(result => {
            if (result.ok) {return result.json()} 
            else {throw new Error(result.statusText)}})
        .then(result => {localStorage.setItem("token", result.bearerToken.token); return "Login Successful"})
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