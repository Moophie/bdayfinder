let transferButton = document.querySelector('#transferButton').addEventListener("click", (e) => {
    let receiver = document.querySelector('#receiver').value;
    let amount = document.querySelector('#amount').value;
    let reason = document.querySelector('#reason').value;
    let comment = document.querySelector('#comment').value;

    let token = localStorage.getItem("token");

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