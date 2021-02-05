$(document).ready(() => {
  $("#home-nav").on("click", (e) => {
    e.preventDefault()
    $("#detail-hospital").hide()
    $("#home").show()
  })
  $("#rs-rujukan-nav").on("click", (e) => {
    e.preventDefault()
    $("#detail-hospital").show()
    $("#register").hide()
    $("#home").hide()
  })
  $("#logout-nav").on("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    auth()
  })
  $("#edit-user-nav").on("click", (e) => {
    e.preventDefault()
    getProfile()
    $("#title-sign").text("Edit Profile")
    $("#register").show()
    $("#inputNama").show()
    $("#inputPassword").show()
    $("#inputProvinsi").show()
    $("#email-section-input").show()
    $("#inputEmail").prop( "disabled", true );
    $("#home").hide()
    $("#direct-login").hide()
    $("#detail-hospital").hide()
    dropdownProvinsi()
  })
})