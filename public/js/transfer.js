const token = localStorage.getItem("token");
let allUsers = [];

fetch("/users/getAllUsers", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
    return response.json();
}).then(json => {
    json.data.users.forEach(user => {
        allUsers.push(user.username)
    })
})

document.querySelector('#receiver').addEventListener("keyup", (e) => {
    document.querySelector('#suggestions').innerHTML = "";
    let receiverInput = document.querySelector('#receiver').value;
    let filteredUsers = allUsers.filter(username => username.includes(receiverInput));
    filteredUsers.forEach(user => {
        let suggestedUser = `<li>${user}</li>`
        document.querySelector("#suggestions").insertAdjacentHTML('beforeend', suggestedUser);
    })
});

let transferButton = document.querySelector('#transferButton').addEventListener("click", (e) => {
    let receiver = document.querySelector('#receiver').value;
    let amount = document.querySelector('#amount').value;
    let reason = document.querySelector('#reason').value;
    let comment = document.querySelector('#comment').value;

    fetch("/coins/transfers", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "receiver": receiver,
            "amount": amount,
            "reason": reason,
            "comment": comment
        })
    }).then(response => {
        return response.json();
    }).then(json => {
    })
});