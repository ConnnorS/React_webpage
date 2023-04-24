import { useState } from "react"

// function to get information from the email and password bars
function GetEmailAndPassword() {
    // return the user's input as an object
    return {email: document.getElementById("userEmail").value,
            password: document.getElementById("userPassword1").value,
            passwordConfirm: document.getElementById("userPassword2").value};
}

// function to verify the user's input
function VerifyInput() {
    // get the user's input
    const userInput = GetEmailAndPassword();
    
    // verify the user's input
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return (emailPattern.test(userInput.email) && userInput.password === userInput.passwordConfirm);
}

// function to create the user
function CreateUser() {
    // define the url and get the user's input
    const url = 'http://sefdb02.qut.edu.au:3000/user/register';
    const data = GetEmailAndPassword();

    // create the user
    fetch(url, {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: data.email, password: data.password})})
        .then(response => {
            switch (response.status) {
                case 201:
                    console.log("User Created!");
                    return response.json();

                case 400:
                    throw new Error("Bad Request");

                case 409:
                    throw new Error("User Already Exists");

                case 429:
                    throw new Error("Too Many Requests");
            }          
        })
}

export default function Register() {
    const [regStatus, setRegStatus] = useState("Registration Incomplete");

    return (
        <div>
            <h1>Register</h1>
            <br/>
            <form><strong>
                <label htmlFor = "userEmail">Your Email: </label>
                <input id = "userEmail" name = "userEmail" type = "text"/>
                <br/>
                <label htmlFor = "userPassword1">Create Password: </label>
                <input id = "userPassword1" name = "userPassword1" type = "text"/>
                <br/>
                <label htmlFor = "userPassword2">Confirm Password: </label>
                <input id = "userPassword2" name = "userPassword2" type = "text"/>
                <br/>
            </strong></form>

            <button onClick = {() => VerifyInput() ? CreateUser() : setRegStatus("Bad Input")}>Confirm!</button>
            <p><br/><b>Status:</b> {regStatus}</p>
        <br/>    
        </div>
    )
}