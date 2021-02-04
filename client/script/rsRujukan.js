$(document).ready(() => {
  const selectedRs = JSON.parse(localStorage.getItem("selectedRs"))

  if (selectedRs) {
    $("#list-rujukan").hide();
    $("#main-detail-rujukan").show();
  } else {
    $("#list-rujukan").show();
    $("#main-detail-rujukan").hide();
  }

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

  // $(".item-rs").on("click", () => {
  //   console.log('test');
  //   setTimeout(() => {
  //     const selectedRs = JSON.parse(localStorage.getItem("selectedRs"))
  //     $("#detail-rujukan-name").html(selectedRs.name);
  //     $("#detail-rujukan-address").html(selectedRs.address);
  //     $("#detail-rujukan-phone").html(selectedRs.phone);
  //     $("#list-rujukan").hide();
  //     $("#main-detail-rujukan").show();
  //   }, 1000)
  // })

});

$(document).on("click", ".item-rs", () => {
  setTimeout(() => {
    const selectedRs = JSON.parse(localStorage.getItem("selectedRs"))
    $("#detail-rujukan-name").html(selectedRs.name);
    $("#detail-rujukan-address").html(selectedRs.address);
    $("#detail-rujukan-phone").html(selectedRs.phone);
    $("#list-rujukan").hide();
    $("#main-detail-rujukan").show();
    $("#map-canvas").attr("src", `https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=${selectedRs.latitude},${selectedRs.longtitude}&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;&output=embed`)
  }, 1000)
})
