import { useNavigate } from "react-router-dom";

// function to get information from the email and password bars
function GetEmailAndPassword() {
  // return the user's input as an object
  return {
    email: document.getElementById("userEmail").value,
    password: document.getElementById("userPassword").value,
  };
}

// function to refresh the token
function RefreshBearer() {
  const refreshToken = localStorage.getItem("refreshToken");
  const url = "http://sefdb02.qut.edu.au:3000/user/refresh";

  console.log(`Sending ${refreshToken}`);

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: refreshToken }),
  })
  .then((response) => {
    if (response.status == 200) {
      console.log("Response OK");
      return response.json();
    }
    else {
      console.log("Reponse Not OK");
      throw new Error(response.statusText);
    }
    })
    .then((response) => {
      console.log("Result OK");
      console.log(response);

      localStorage.setItem("token", response.bearerToken.token);
      localStorage.setItem("refreshToken", response.refreshToken.token);

      return "Token Refreshed";
    })
    .catch(() => {
      return "Error in token Refresh";
    });
}

// function to login the user
function SignInUser() {
  const url = "http://sefdb02.qut.edu.au:3000/user/login";
  const data = GetEmailAndPassword();

  console.log("Attempting Login");

  // log in the user and get the bearer token if successful
  return (
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, password: data.password }),
    })
      // check if the response is ok
      .then((response) => {
        if (response.status == 200) {
          console.log("Response OK");
          return response.json();
        }
        else {
          console.log("Reponse Not OK");
          throw new Error(response.statusText);
        }
      })
      // get the bearer token and its expiry
      .then((response) => {
        console.log("Login Successful");
        localStorage.setItem("token", response.bearerToken.token);
        localStorage.setItem("refreshToken", response.refreshToken.token);
        localStorage.setItem("loggedIn", true);
        // call the refresh token function every 10 minutes
        setInterval(RefreshBearer, response.bearerToken.expires_in * 1000);
      })
      // return an error if something went wrong
      .catch(() => console.log("Login Unsuccessful"))
  );
}

export default function Login() {
  const Navigate = useNavigate();

  return (
    <div className="login">
      <h1>Login</h1>
      <br />
      <form>
        <strong>
          <label htmlFor="userEmail">Your Email: </label>
          <input id="userEmail" name="userEmail" type="text" />
          <br />
          <label htmlFor="userPassword">Password: </label>
          <input type="password" id="userPassword" name="userPassword" />
          <br />
        </strong>
      </form>
      <button
        type="submit"
        onClick={() => {
          SignInUser()
            .then(() => Navigate("/"))
            .then(() => window.location.reload());
        }}
      >
        Confirm!
      </button>
    </div>
  );
}
