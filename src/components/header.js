import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// function to refresh the token
function RefreshBearer() {
  const refreshToken = localStorage.getItem("refreshToken");
  const url = "http://sefdb02.qut.edu.au:3000/user/refresh";

  console.log("Attempting Token Refresh...");

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: refreshToken }),
  })
    .then((response) => {
      if (response.status == 200) {
        console.log("\tResponse OK");
        return response.json();
      } else {
        console.log("\tReponse Not OK");
        throw new Error(response.statusText);
      }
    })
    .then((response) => {
      console.log("Setting Local Storage...");

      localStorage.setItem("token", response.bearerToken.token);
      localStorage.setItem("refreshToken", response.refreshToken.token);
      const now = new Date();
      const tenMinutesFromNow = now.getTime() + 10 * 60000;
      localStorage.setItem("expiresAt", tenMinutesFromNow);
      localStorage.setItem("loggedIn", true);

      console.log("\tLocal Storage Set");
    });
}

// function to logout the user
function LogoutUser() {
  const url = "http://sefdb02.qut.edu.au:3000/user/logout";
  const refreshToken = localStorage.getItem("refreshToken");

  console.log("Attempting Logout...");

  // log out the user
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: refreshToken }),
  })
    .then((response) => {
      if (response.status == 200) {
        console.log("\tSuccessfuly logged out");
      } else {
        console.log("\tLogout Unsuccessful");
        throw new Error(response.statusText);
      }
    })
    .then(() => localStorage.clear());
}

// returns register and sign in options
function LoggedOff() {
  return (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );
}

// returns logout button
function LoggedOn() {
  const Navigate = useNavigate();
  const email = localStorage.getItem("email");

  return (
    <>
      <li>
        <Link
          onClick={() => {
            LogoutUser()
              .then(() => Navigate("/"))
              .then(() => window.location.reload());
          }}
        >
          Logout
        </Link>
      </li>
      <li id="helloMessage">Hello {email}</li>
    </>
  );
}

// returns home and movies navigation
function Navigation() {
  return (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/movies">Movies</Link>
      </li>
    </>
  );
}

// function that returns the header
export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const isMounted = useRef(false);

  // check if the user's refreshtoken can be refreshed
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    // check if the current time is past the expiry time
    const expiry = localStorage.getItem("expiresAt");
    const bearerExpired = Date.now() > expiry;

    if (bearerExpired) {
      console.log("Bearer expired or no bearer present...");
      localStorage.clear();
      setLoggedIn(false);
    } else {
      console.log("Bearer valid");
      RefreshBearer();
      setInterval(() => RefreshBearer(), 600 * 1000);
      setLoggedIn(true);
    }
  }, []);

  // check whether the user is logged in to determine
  // what header to render
  if (!loggedIn) {
    return (
      <header className="header">
        <nav>
          <ul>
            <Navigation />
            <LoggedOff />
          </ul>
        </nav>
      </header>
    );
  } else {
    return (
      <header className="header">
        <nav>
          <ul>
            <Navigation />
            <LoggedOn />
          </ul>
        </nav>
      </header>
    );
  }
}
