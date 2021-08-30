window.addEventListener('load', (event) => {
    let token = localStorage.getItem("token");

    fetch("/users/getUserFromToken", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "token": token
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        let currentUsername = document.querySelector("#currentUsername");
        currentUsername.innerHTML = json.data.user.username;
        currentBalance.innerHTML = json.data.user.coins;
    })
});

let logoutButton = document.querySelector('#logoutButton').addEventListener("click", (e) => {
    localStorage.removeItem("token");

    window.location.href = "login.html";
});