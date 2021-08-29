window.addEventListener('load', (event) => {
    let token = localStorage.getItem("token");

    fetch("/coins/leaderboard", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).then(json => {
        json.data.users.forEach(user => {
            let rankedUser = `<li>${user.coins} -- ${user.username}</li>`
            document.querySelector("#leaderboard").insertAdjacentHTML('beforeend', rankedUser);
        })
    })
});