const token = localStorage.getItem("token");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const chatroomBirthday = urlParams.get('birthday');

primus = Primus.connect(`/?chatroomBirthday=${chatroomBirthday}`, {
    reconnect: {
        max: Infinity,
        min: 500,
        retries: 10
    }
});

primus.on('data', (data) => {
    if (data.action === "sendMessage") {
        if (data.message.chatroom_birthday === chatroomBirthday) {
            appendMessage(data.message);
        }
    }
});


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
        let birthdaySharerItem = `<li class="list__item">${user.username}</li>`
        document.querySelector("#birthdaySharers").insertAdjacentHTML('beforeEnd', birthdaySharerItem);
    })
});

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

    chatRoomMessages.sort((a, b) => a.time_sent - b.time_sent);
    chatRoomMessages.forEach(message => {
        appendMessage(message);
    });
});

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
        let message = json.data.message;

        primus.write({
            "action": "sendMessage",
            "message": message
        });

        //appendMessage(message);
        document.querySelector('#messageContent').value = "";
    })
});

let appendMessage = (message) => {
    let date = new Date(parseInt(message.time_sent));
    let time_sent_datetime = date.getDate() +
        "/" + (date.getMonth() + 1) +
        "/" + date.getFullYear() +
        " " + date.getHours() +
        ":" + date.getMinutes();
    let messageItem = `<li class="chat__item"><h4 class="chat__sender">${message.sender}</h4><p class="chat__time">${time_sent_datetime}</p><p class="chat__content">${message.content}</p></li>`;
    document.querySelector("#chatMessages").insertAdjacentHTML('afterBegin', messageItem);
}

let messageInput = document.querySelector('#messageContent').addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        document.querySelector('#sendMessageButton').click();
    }
});