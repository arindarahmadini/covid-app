const baseUrl = `http://localhost:3000`;

function auth() {
    if (localStorage.getItem("access_token")) {
        $("#register").hide()
        $("#login").hide()
        $(".g-signin2").hide()
        $("#home").show()
        $("#home-nav").show()
        $("#edit-user-nav").show()
        $("#rs-rujukan-nav").show()
        $("#logout-nav").show()
        getDataCovid()
    } else {
        $(".g-signin2").show()
        $("#detail-hospital").hide()
        $("#home-nav").hide()
        $("#rs-rujukan-nav").hide()
        $("#logout-nav").hide()
        $("#edit-user-nav").hide()
        $("#login").show()
        $("#register").hide()
        $("#home").hide()
    }
}

function login() {
    const email = $("#loginEmail").val();
    const password = $("#loginPassword").val();
    $.ajax({
        url: `${baseUrl}/login`,
        method: "POST",
        data: {
            email,
            password,
        },
    })
        .done((response) => {
            localStorage.setItem("email", response.email)
            localStorage.setItem("access_token", response.access_token);
            localStorage.setItem("province", response.province)
            localStorage.setItem("name", response.name)
            auth();
        })
        .fail((xhr, text) => {
            swal("Login failed", "Invalid Email or Password", "error");
            console.log(xhr, text);
        })
        .always((_) => {
            $("#form-login").trigger("reset");
        });
}

function register() {
    const name = $("#inputNama").val()
    const email = $("#inputEmail").val()
    const province = $("#provinsi-dropdown").val()
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
        .done((response) => {
            auth();
        })
        .fail((xhr) => {
            swal("Something Wrong", xhr.responseJSON.error[0], "error");
            console.log(xhr, text);
        })
        .always(_ => {
            $("#form-register").trigger("reset")
        })
}

function getProfile() {
    $("#inputNama").val(localStorage.getItem("name"))
    $("#inputProvinsi").val(localStorage.getItem("province"))
    $("#inputEmail").val(localStorage.getItem("email"))
    $("#inputPassword").val("")
}

function update() {
    const name = $("#inputNama").val()
    const province = $("#provinsi-dropdown").val()
    const password = $("#inputPassword").val()
    localStorage.setItem("province", province)
    localStorage.setItem("name", name)
    console.log($("#provinsi-dropdown").val())
    $.ajax({
        url: `${baseUrl}/updateuser`,
        method: "PUT",
        data: {
            name,
            province,
            password
        },
        headers: {
            token: localStorage.getItem("access_token")
        }
    })
        .done(response => {
            localStorage.removeItem("dataHospitals")
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text)
        })
        .always(_ => {
            $("#form-register").trigger("reset")
        })
}

function updateProvince() {
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

function dropdownProvinsi() {
    let dropdown = $('#provinsi-dropdown')

    dropdown.empty()

    dropdown.append('<option selected="true" disabled>Pilih Provinsi</option>');
    dropdown.prop('selectedIndex', 0)

    const url = 'https://my-json-server.typicode.com/iqballbayhaqi/data-provinsi-indonesia/page1'


    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            if (entry.province === localStorage.getItem("province")) {
                dropdown.append($('<option selected></option>').attr('value', entry.province).text(entry.province));
            } else {
                dropdown.append($('<option></option>').attr('value', entry.province).text(entry.province));
            }
        })
    });
}

function getDataCovid(){
    const format = (num) => {
        const n = String(num),
            p = n.indexOf(".");
        return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) =>
            p < 0 || i < p ? `${m}.` : m
        );
    };

    $.ajax({
        url: `${baseUrl}/datacovid/${localStorage.getItem("province")}`,
        method: "GET",
        headers: {
            token: localStorage.getItem("access_token")
        },
    })
        .done((data) => {
            $("#provinsi-name").html(format(data.Provinsi));
            $("#positif").html(format(data.Kasus_Posi));
            $("#sembuh").html(format(data.Kasus_Semb));
            $("#meninggal").html(format(data.Kasus_Meni));
            $("#total-kasus").html(
                format(data.Kasus_Meni + data.Kasus_Semb + data.Kasus_Posi)
            );
        })
        .fail((err) => {
            console.log(err, "err");
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
        $("#email-section-input").show()
        $("#title-sign").text("Register")
        $("#direct-login").show()
        $("#login").hide()
        dropdownProvinsi()
    })
    $('#form-register').on("submit", (e) => {
        e.preventDefault()
        if (localStorage.getItem("access_token")) {
            update()
            getDataCovid()
        } else {
            register()
        }

    });
});

function onSignIn(googleUser) {
    const token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: `${baseUrl}/loginWithGoogle`,
        method: "POST",
        data: {
            token,
        },
    })
        .done((response) => {
            console.log(response)
            localStorage.setItem("access_token", response.access_token);
            localStorage.setItem("province", response.province)
            localStorage.setItem("name", response.name)
            auth();
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })
        .always((_) => {
            $("#form-login").trigger("reset");
        });
}