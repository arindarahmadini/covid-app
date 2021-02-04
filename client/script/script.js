const baseUrl = `http://localhost:3000`;

function auth() {
  if (localStorage.getItem("access_token")) {
    $("#register").hide();
    $("#login").hide();
    $("#home-container").show();
    $("#home-nav").show();
    $("#rs-rujukan-nav").show();
    $("#logout-nav").show();
  } else {
    $("#home-nav").hide();
    $("#rs-rujukan-nav").hide();
    $("#logout-nav").hide();
    $("#login").show();
    $("#register").hide();
    $("#home-container").hide();
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
      localStorage.setItem("access_token", response.access_token);
      auth();
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    })
    .always((_) => {
      $("#form-login").trigger("reset");
    });
}

function register() {
  const name = $("#inputNama").val();
  const email = $("#inputEmail").val();
  const province = $("#inputProvinsi").val();
  const password = $("#inputPassword").val();
  $.ajax({
    url: `${baseUrl}/register`,
    method: "POST",
    data: {
      email,
      password,
      province,
      password,
    },
  })
    .done((response) => {
      auth();
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    });
}

$(document).ready(() => {
  auth();
  $("#form-login").on("submit", (e) => {
    e.preventDefault();
    login();
  });
  $("#link-register").on("click", (e) => {
    e.preventDefault();
    $("#register").show();
    $("#login").hide();
  });
  $("#form-register").on("submit", (e) => {
    e.preventDefault();
    register();
  });

  const format = (num) => {
    const n = String(num),
      p = n.indexOf(".");
    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) =>
      p < 0 || i < p ? `${m}.` : m
    );
  };

  $.ajax({
    url: `${baseUrl}/datacovid`,
    method: "GET",
    headers: {
      token: localStorage.getItem("access_token"),
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
});
