window.addEventListener('load', (e) => {
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
        let currentUsername = document.querySelector("#currentUsername");
        let currentBirthday = document.querySelector("#currentBirthday");
        currentUsername.innerHTML = json.data.user.username;
        let birthdayDate = new Date(json.data.user.birthday);
        let yourBirthday = `${birthdayDate.getDate()} ${birthdayDate.toLocaleString('en-us', { month: 'long' })}`;
        currentBirthday.innerHTML = yourBirthday;
        return birthdayDayMonth = (birthdayDate.getMonth() + 1) +
            "/" + birthdayDate.getDate();
    }).then(birthdayDayMonth => {
        let now = new Date();
        let currentYear = now.getFullYear();
        let countdownDate = new Date(`${birthdayDayMonth}/${currentYear}`).getTime();
        let x = setInterval(function () {
            now = new Date().getTime();
            let distance = countdownDate - now;
    
            if (distance < 0) {
                countdownDate = new Date(`${birthdayDayMonth}/${currentYear + 1}`).getTime();
                distance = countdownDate - now;
            }
    
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            document.querySelector("#countdown").innerHTML = days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ";
    
        }, 1000);
    })
});