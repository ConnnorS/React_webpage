import { Link } from "react-router-dom"

// navigation
function Navigation() {
    return (
        <nav><ul><h1>
            <li>
                <Link to = "/">Home</Link>
            </li>
            <li>
                <Link to = "/movies">Movies</Link>
            </li>
            <li>
                <Link to = "/register">Register</Link>
            </li>
            <li>
                <Link to = "/login">Login</Link>
            </li>
        </h1></ul></nav>
    )
}

// header
export default function Header() {
    return (
        <header>
            <Navigation/>
        </header>
    )
}