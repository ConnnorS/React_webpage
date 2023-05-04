import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      <li
        onClick={() => {
          LogoutUser()
            .then(() => Navigate("/"))
            .then(() => window.location.reload());
        }}
      >
        Logout
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

  // get the login status
  useEffect(() => {
    const status = localStorage.getItem("loggedIn");
    if (status != null) setLoggedIn(status);
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
