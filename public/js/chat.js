const token = localStorage.getItem("token");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const chatroomBirthday = urlParams.get('birthday');

fetch("/users/getUsersByBirthday", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        "birthday": chatroomBirthday
    })
}).then(response => {
    return response.json();
}).then(json => {
    let birthdaySharersAmount = json.data.users.length;
    document.querySelector("#birthdaySharersAmount").innerHTML = birthdaySharersAmount;

    json.data.users.forEach(user => {
        let birthdaySharerItem = `<li>${user.firstname} ${user.lastname}</li>`
        document.querySelector("#birthdaySharers").insertAdjacentHTML('beforeend', birthdaySharerItem);
    })
})

let sendMessageButton = document.querySelector('#sendMessageButton').addEventListener("click", (e) => {
    let content = document.querySelector('#messageContent').value;

    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    let time_sent = date + ' ' + time;

    fetch("/chat", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "content": content,
            "time_sent": time_sent
        })
    }).then(response => {
        return response.json();
    }).then(json => {

    })
});