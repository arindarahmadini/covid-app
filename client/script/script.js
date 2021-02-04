const baseUrl = `http://localhost:3000`

function auth() {
    if (localStorage.getItem("access_token")) {
        $("#register").hide()
        $("#login").hide()
        $("#home").show()
        $("#home-nav").show()
        $("#edit-user-nav").show()
        $("#rs-rujukan-nav").show()
        $("#logout-nav").show()
        $("#updateProvinsi").hide()
    } else {
        $("#home-nav").hide()
        $("#rs-rujukan-nav").hide()
        $("#logout-nav").hide()
        $("#edit-user-nav").hide()
        $("#login").show()
        $("#register").hide()
        $("#home").hide()
        $("#updateProvinsi").hide()
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
            name,
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

function getProfile(){
    $.ajax({
        url: `${baseUrl}/updateuser`, //liat urlnya lagi
        method: "GET",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(response => {
            $("#inputNama").val(response.data.name)
            $("#inputProvinsi").val(response.data.province)
            $("#inputPassword").val(response.data.password)
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
}

function update(){
    const name = $("#inputNama").val()
    const province = $("#inputProvinsi").val()
    const password = $("#inputPassword").val()
    $.ajax({
        url: `${baseUrl}/updateuser`,
        method: "PUT",
        data: {
            email,
            name,
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

function updateProvince(){
    const province = $("#updateProvinsi").val()
    $.ajax({
        url: `${baseUrl}/updateuser`,
        method: "PATCH",
        data: {
            province
        }
    })
        .done(response => {
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
}

function dropdownProvinsi(){
    let dropdown = $('#provinsi-dropdown')

    dropdown.empty()

    dropdown.append('<option selected="true" disabled>Pilih Provinsi</option>');
    dropdown.prop('selectedIndex', 0)

    const url = 'https://my-json-server.typicode.com/iqballbayhaqi/data-provinsi-indonesia/page1'

    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            dropdown.append($('<option></option>').attr('value', entry.province).text(entry.province));
        })
    });
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
        $("#title-sign").text("Edit Profile")
        $("#login").hide()
        dropdownProvinsi()
    })
    $('#form-register').on("submit", (e) => {
        e.preventDefault()
        if (localStorage.getItem("access_token")){
            update()
        } else {
            register()
        }
    })
})