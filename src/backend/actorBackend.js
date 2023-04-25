export function GetActorInfo(actorID) {
    const url = `http://sefdb02.qut.edu.au:3000/people/${actorID}`;
    const token = localStorage.getItem("token");

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(result => result.json());
}