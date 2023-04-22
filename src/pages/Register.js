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

function CreateUser() {
    // code to send POST request
}


export default function Register() {
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

            <button onClick = {() => VerifyInput() ? (console.log("Good")) : console.log("Bad")}>Confirm!</button>
            
        <br/>    
        </div>
    )
}