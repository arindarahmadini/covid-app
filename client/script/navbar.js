$(document).ready(() => {
  $("#home-nav").on("click", (e) => {
    e.preventDefault()
    $("#detail-hospital").hide()
    $("#register").hide()
    $("#home").show()
  })
  $("#rs-rujukan-nav").on("click", (e) => {
    e.preventDefault()
    $("#list-rujukan").empty()
    getDataHospital()
    $("#list-rujukan").show()
    $("#title-list-rujukan").show().html(`Daftar RS Rujukan Di Provinsi ${localStorage.getItem("province")}`)
    $("#main-detail-rujukan").hide();
    $("#detail-hospital").show()
    $("#home").hide()
    $("#register").hide()
  })
  $("#logout-nav").on("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    auth()
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

  })
  $("#edit-user-nav").on("click", (e) => {
    e.preventDefault()
    getProfile()
    $("#title-sign").text("Edit Profile")
    $("#register").show()
    $("#inputNama").show()
    $("#inputPassword").show()
    $("#inputProvinsi").show()
    $("#email-section-input").hide()
    $("#home").hide()
    $("#direct-login").hide()
    $("#detail-hospital").hide()
    dropdownProvinsi()
  })
})