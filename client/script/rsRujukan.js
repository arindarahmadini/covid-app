const getDataHospital = () => {

  const dataHospital = JSON.parse(localStorage.getItem("dataHospitals"))

  if (!dataHospital) {
    $("#list-rujukan").append(`
      <div class="text-center" style="margin-top: 200px;">
        <div class="spinner-border" style="width: 75px;height: 75px" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `)

    $.ajax({
      url: 'http://localhost:3000/dataHospital',
      method: "GET",
      headers: {
        token: localStorage.getItem("access_token")
      }
    })
    .done( data => {
      localStorage.setItem("dataHospitals", JSON.stringify(data))
      $("#list-rujukan").empty()
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
  } else {
    dataHospital.forEach( res => {
      const dataStringify = JSON.stringify(res)
      $("#list-rujukan").append(`
        <div class="card" onclick='localStorage.setItem("selectedRs", JSON.stringify(${dataStringify}))' style="margin-top: 10px; cursor: pointer;">
          <div class="card-body item-rs">
            ${res.name}
          </div>
        </div>
      `);
    })
  }
  
}

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
