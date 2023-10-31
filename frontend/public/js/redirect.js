if (localStorage.getItem("first_open") == null) {
    localStorage.setItem("first_open", "true");
}

if (localStorage.getItem("logged_in") == null || localStorage.getItem("logged_in") == "false") {
    window.location.href = "login.html";
} else {
    window.location.href = "dashboard.html";
}
