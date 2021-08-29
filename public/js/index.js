let logoutButton = document.querySelector('#logoutButton').addEventListener("click", (e) => {
    localStorage.removeItem("token");

    window.location.href = "login.html";
});