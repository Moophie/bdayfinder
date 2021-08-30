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
