const baseUrl = `http://localhost:3000`

function auth() {
    if (localStorage.getItem("access_token")) {
        $("#register").hide()
        $("#login").hide()
        $("#home").show()
        $("#home-nav").show()
        $("#rs-rujukan-nav").show()
        $("#logout-nav").show()
    } else {
        $("#home-nav").hide()
        $("#rs-rujukan-nav").hide()
        $("#logout-nav").hide()
        $("#login").show()
        $("#register").hide()
        $("#home").hide()
    }
}

function login() {
    const email = $("#loginEmail").val()
    const password = $("#loginPassword").val()
    $.ajax({
        url: `${baseUrl}/login`,
        method: "POST",
        data: {
            email,
            password
        }
    })
        .done((response) => {
            localStorage.setItem("access_token", response.access_token)
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
        .always(_ => {
            $("#form-login").trigger("reset")
        })
}

function register() {
    const name = $("#inputNama").val()
    const email = $("#inputEmail").val()
    const province = $("#inputProvinsi").val()
    const password = $("#inputPassword").val()
    $.ajax({
        url: `${baseUrl}/register`,
        method: "POST",
        data: {
            email,
            password,
            province,
            password
        }
    })
        .done(response => {
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
}

$(document).ready(() => {
    auth()
    $('#form-login').on("submit", (e) => {
        e.preventDefault()
        login()
    })
    $("#link-register").on("click", (e) => {
        e.preventDefault()
        $("#register").show()
        $("#login").hide()
    })
    $('#form-register').on("submit", (e) => {
        e.preventDefault()
        register()
    })
})