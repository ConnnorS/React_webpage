import { useNavigate } from "react-router-dom";

// function to get information from the email and password bars
function GetEmailAndPassword() {
  // return the user's input as an object
  return {
    email: document.getElementById("userEmail").value,
    password: document.getElementById("userPassword").value,
  };
}

// function to login the user
function SignInUser() {
  const url = "http://sefdb02.qut.edu.au:3000/user/login";
  const data = GetEmailAndPassword();

  console.log("Attempting Login...");

  // log in the user and get the bearer token if successful
  return (
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, password: data.password }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("\tResponse OK");
          return response.json();
        } else {
          console.log("\tReponse Not OK");
          throw new Error(response.statusText);
        }
      })
      // add the relevant data to local storage
      .then((response) => {
        console.log("\tLogin Successful");
        console.log("Setting Local Storage...");

        localStorage.setItem("token", response.bearerToken.token);
        localStorage.setItem("refreshToken", response.refreshToken.token);
        const now = new Date();
        const tenMinutesFromNow = now.getTime() + response.bearerToken.expires_in * 1000;
        localStorage.setItem("expiresAt", tenMinutesFromNow);
        localStorage.setItem("email", data.email);
        localStorage.setItem("loggedIn", true);

        console.log("\tLocal Storage Set");
      })
      .catch(() => console.log("Login Unsuccessful"))
  );
}

export default function Login() {
  const Navigate = useNavigate();

  return (
    <div className="login">
      <h1>Login</h1>
      <br />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          SignInUser()
            .then(() => Navigate("/"))
            .then(() => window.location.reload());
        }}
      >
        <strong>
          <label htmlFor="userEmail">Your Email: </label>
          <input id="userEmail" name="userEmail" type="email" />
          <br />
          <label htmlFor="userPassword">Password: </label>
          <input type="password" id="userPassword" name="userPassword" />
          <br />
        </strong>
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
}
