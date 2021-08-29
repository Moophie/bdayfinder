let signupButton = document.querySelector('#signupButton').addEventListener("click", (e) => {
    let username = document.querySelector('#username').value;
    let email = document.querySelector('#email').value;
    let firstname = document.querySelector('#firstname').value;
    let lastname = document.querySelector('#lastname').value;
    let password = document.querySelector('#password').value;

    fetch("/users/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "email": email,
            "firstname": firstname,
            "lastname": lastname,
            "password": password,
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status === "success") {
            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "index.html";
        } else {
            // Add error handling
        }
    })
});