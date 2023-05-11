import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// function to refresh the token
function RefreshBearer() {
  const refreshToken = localStorage.getItem("refreshToken");
  const url = "http://sefdb02.qut.edu.au:3000/user/refresh";

  console.log("Attempting Token Refresh...");

  return (
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refreshToken }),
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
        console.log("Setting Local Storage...");

        localStorage.setItem("token", response.bearerToken.token);
        localStorage.setItem("refreshToken", response.refreshToken.token);
        const now = new Date();
        const tenMinutesFromNow = now.getTime() + response.bearerToken.expires_in * 1000;
        localStorage.setItem("expiresAt", tenMinutesFromNow);
        localStorage.setItem("loggedIn", true);

        console.log("\tLocal Storage Set");
      })
  );
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
      if (response.status === 200) {
        console.log("\tSuccessfuly logged out");
      } else {
        console.log("\tLogout Unsuccessful");
        throw new Error(response.statusText);
      }
    })
    .then(() => localStorage.clear());
}

// function returns the header component
export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const isMounted = useRef(false);
  const Navigate = useNavigate();

  // check if the user's refreshtoken can be refreshed
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    // check if the current time is past the expiry time
    const expiry = localStorage.getItem("expiresAt");
    const bearerExpired = Date.now() > expiry;
    // if expired, clear local storage and display login/register options
    if (bearerExpired) {
      console.log("Bearer expired or no bearer present...");
      console.log("\tClearing local storage");
      localStorage.clear();
      setLoggedIn(false);
    }
    // if not expired, refresh the bearer and display logout opion
    else {
      console.log("Bearer valid");
      RefreshBearer();
      setInterval(() => RefreshBearer(), 600 * 1000);
      setLoggedIn(true);
    }
  }, []);

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          {/* check if the user is logged in or not */}
          {loggedIn ? (
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
              <li id="helloMessage">Hello {localStorage.getItem("email")}</li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
