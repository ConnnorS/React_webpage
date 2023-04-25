// function to get information from the email and password bars
function GetEmailAndPassword() {
    // return the user's input as an object
    return {email: document.getElementById("userEmail").value,
            password: document.getElementById("userPassword").value}
}

// function to login the user
function SignIn() {
    const url = "http://sefdb02.qut.edu.au:3000/user/login";
    const data = GetEmailAndPassword();

    fetch(url, {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: data.email, password: data.password})})
        .then(response => { 
            switch(response.status) {
                case 200:
                    console.log("Successful login");
                    return response.json();

                case 400:
                    throw new Error("Invalid log in request");

                case 401:
                    throw new Error("Incorrect email or password");

                case 429:
                    throw new Error("Too many requests");
        }
        })
        .then(response => localStorage.setItem("token", response.bearerToken.token));
}

export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <br/>
            <form><strong>
            <label htmlFor = "userEmail">Your Email: </label>
                <input id = "userEmail" name = "userEmail" type = "text"/>
                <br/>
                <label htmlFor = "userPassword">Password: </label>
                <input id = "userPassword" name = "userPassword" type = "text"/>
                <br/>
                <button onClick = {() => SignIn()}>Confirm!</button>
            </strong></form>

        </div>
    )
}