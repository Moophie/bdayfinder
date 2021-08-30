let signupButton = document.querySelector('#signupButton').addEventListener("click", (e) => {
    let alert = document.querySelector('.alert');    
    let username = document.querySelector('#username').value;
    let email = document.querySelector('#email').value;
    let firstname = document.querySelector('#firstname').value;
    let lastname = document.querySelector('#lastname').value;
    let birthday = document.querySelector('#birthday').value;
    let password = document.querySelector('#password').value;

    if(!username || !email || !firstname || !lastname || !birthday || !password){
        alert.classList.add("alert--error");
        alert.innerHTML = "Please fill in all the fields.";
        return alert.innerHTML;
    }

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
            "birthday": birthday,
            "password": password,
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status === "success") {
            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "chat.html?birthday=" + json.data.currentBirthday;
        } else {
            alert.classList.add("alert--error");
            alert.innerHTML = "We couldn't log you in";
        }
    })

});

let passwordInput = document.querySelector('#password').addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        document.querySelector('#signupButton').click();
    }
});