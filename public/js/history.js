let token = localStorage.getItem("token");

fetch("/coins/transfers", {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}).then(response => {
    return response.json();
}).then(json => {
    json.data.transfers.forEach(transfer => {
        let historyItem = `<li>${transfer.sender} sent ${transfer.receiver}: ${transfer.amount} coins.</li>`
        document.querySelector("#transferHistory").insertAdjacentHTML('beforeend', historyItem);
    })
})