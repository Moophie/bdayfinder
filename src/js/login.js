let loginButton = document.querySelector('#loginButton').addEventListener("click", (e) => {
    let alert = document.querySelector('.alert');    
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;

    if(!username || !password){
        alert.classList.add("alert--error");
        alert.innerHTML = "Please fill in all the fields.";
        return alert.innerHTML;
    }

    fetch("/users/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status === "success") {
            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "chat.html?birthday=" + json.data.currentBirthday;
        } else {
            // Add error handling
        }
    })
});

let passwordInput = document.querySelector('#password').addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        document.querySelector('#loginButton').click();
    }
});