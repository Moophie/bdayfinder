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

fetch("/chat/getMessagesByChatroom", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        "chatroomBirthday": chatroomBirthday
    })
}).then(response => {
    return response.json();
}).then(json => {
    chatRoomMessages = [];
    json.data.messages.forEach(message => {
        chatRoomMessages.push(message);
    })

    chatRoomMessages.sort((a, b) => b.time_sent - a.time_sent);
    chatRoomMessages.forEach(message => {
        let date = new Date(parseInt(message.time_sent));
        let time_sent_datetime = date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + date.getMinutes();
        let messageItem = `<li><h4>${message.sender} - ${time_sent_datetime}</h4><p>${message.content}</p></li>`;
        document.querySelector("#chatMessages").insertAdjacentHTML('beforeend', messageItem);
    });
})

let sendMessageButton = document.querySelector('#sendMessageButton').addEventListener("click", (e) => {
    let content = document.querySelector('#messageContent').value;
    let time_sent = Date.now();

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