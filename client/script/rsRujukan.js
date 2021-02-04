const getDataHospital = () => {
  $.ajax({
    url: 'http://localhost:3000/dataHospital',
    method: "GET",
    headers: {
      token: localStorage.getItem("access_token")
    }
  })
  .done( data => {
    data.forEach( res => {
      const dataStringify = JSON.stringify(res)
      $("#list-rujukan").append(`
        <div class="card" onclick='localStorage.setItem("selectedRs", JSON.stringify(${dataStringify}))' style="margin-top: 10px; cursor: pointer;">
          <div class="card-body item-rs">
            ${res.name}
          </div>
        </div>
      `);
    })
  })
  .fail( err => {
    console.log(err);
  })
}

$(document).ready(() => {
  const selectedRs = JSON.parse(localStorage.getItem("selectedRs"))

  if (selectedRs) {
    $("#list-rujukan").hide();
    $("#main-detail-rujukan").show();
  } else {
    $("#list-rujukan").show();
    $("#main-detail-rujukan").hide();
  }

});

$(document).on("click", ".item-rs", () => {
  setTimeout(() => {
    const selectedRs = JSON.parse(localStorage.getItem("selectedRs"))
    $("#detail-rujukan-name").html(selectedRs.name);
    $("#detail-rujukan-address").html(selectedRs.address);
    $("#detail-rujukan-phone").html(selectedRs.phone);
    $("#list-rujukan").hide();
    $("#title-list-rujukan").hide();
    $("#main-detail-rujukan").show();
    $("#map-canvas").attr("src", `https://www.google.com/maps/embed/v1/place?key=AIzaSyC4OuqQYjyRGEAt5_nX2ECwA_pr0u4qvyo
    &q=${selectedRs.latitude},${selectedRs.longtitude}`)
  }, 1000)
})
