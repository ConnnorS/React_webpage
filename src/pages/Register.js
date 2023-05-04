import { useState } from "react";

// function to get information from the email and password bars
function GetEmailAndPassword() {
  // return the user's input as an object
  return {
    email: document.getElementById("userEmail").value,
    password: document.getElementById("userPassword1").value,
    passwordConfirm: document.getElementById("userPassword2").value,
  };
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
    if (response.status == 200) {
      console.log("Response OK");
      return "User Created!";
    } else {
      console.log("Response Not OK");
      throw new Error(response.statusText);
    }
  });
}

export default function Register() {
  const [registerStatus, setRegisterStatus] = useState("");

  return (
    <div className="register">
      <h1>Register</h1>
      <br />
      <form>
        <strong>
          <label htmlFor="userEmail">Your Email: </label>
          <input id="userEmail" name="userEmail" type="text" />
          <br />
          <label htmlFor="userPassword1">Create Password: </label>
          <input id="userPassword1" name="userPassword1" type="password" />
          <br />
          <label htmlFor="userPassword2">Confirm Password: </label>
          <input id="userPassword2" name="userPassword2" type="password" />
          <br />
        </strong>
      </form>
      <button
        id="confirm"
        onClick={() =>
          CreateUser().then((response) => setRegisterStatus(response))
        }
      >
        Confirm!
      </button>
      <p>{registerStatus}</p>
      <br />
    </div>
  );
}
