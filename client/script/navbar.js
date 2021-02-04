$(document).ready(() => {
  $("#home-nav").on("click", (e) => {
    e.preventDefault()
    $("#detail-hospital").hide()
    $("#home").show()
  })
  $("#rs-rujukan-nav").on("click", (e) => {
    e.preventDefault()
    $("#detail-hospital").show()
    $("#home").hide()
    generateData()
  })
  $("#logout-nav").on("click", (e) => {
    e.preventDefault()
    localStorage.clear()
    auth()
  })
})