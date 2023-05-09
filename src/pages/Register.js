import { useState } from "react";
import { useNavigate } from "react-router-dom";

// function to get information from the email and password bars
function GetEmailAndPassword() {
  // return the user's input as an object
  return {
    email: document.getElementById("userEmail").value,
    password: document.getElementById("userPassword1").value,
    passwordConfirm: document.getElementById("userPassword2").value,
  };
}

function passwordsMatch() {
  const data = GetEmailAndPassword();

  return data.password === data.passwordConfirm;
}

// function to create the user
function CreateUser() {
  // define the url and get the user's input
  const url = "http://sefdb02.qut.edu.au:3000/user/register";
  const data = GetEmailAndPassword();

  // create the user
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: data.email, password: data.password }),
  }).then((response) => {
    console.log(response.status);
    if (response.status === 201) {
      console.log("Response OK");
      alert("User Created!");
    } else {
      console.log("Response Not OK");
      alert("User Already Exists or Bad Request");
    }
  });
}

export default function Register() {
  const Navigate = useNavigate();
  return (
    <div className="register">
      <h1>Register</h1>
      <br />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (passwordsMatch()) {
            CreateUser()
              .then(() => Navigate("/register"))
              .then(() => window.location.reload());
          } else alert("Passwords must match.");
        }}
      >
        <strong>
          <label htmlFor="userEmail">Your Email: </label>
          <input id="userEmail" name="userEmail" type="email" />
          <br />
          <label htmlFor="userPassword1">Create Password: </label>
          <input id="userPassword1" name="userPassword1" type="password" />
          <br />
          <label htmlFor="userPassword2">Confirm Password: </label>
          <input id="userPassword2" name="userPassword2" type="password" />
          <br />
        </strong>
        <button type="submit">Confirm</button>
      </form>
      <br />
    </div>
  );
}
