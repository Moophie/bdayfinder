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
        let chatLink = document.querySelector("#chatLink");
        chatLink.href = `chat.html?birthday=${json.data.user.birthday}`;
    })
});

let logoutButton = document.querySelector('#logoutButton').addEventListener("click", (e) => {
    localStorage.removeItem("token");

    window.location.href = "login.html";
});
