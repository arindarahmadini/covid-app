$(document).ready(() => {
  const dataDummy = [
    {
      name: "RS UMUM DAERAH  DR. ZAINOEL ABIDIN",
      address: "JL. TGK DAUD BEUREUEH, NO. 108 B. ACEH",
      region: "KOTA BANDA ACEH, ACEH",
      phone: "(0651) 34565",
      province: "Aceh",
    },
    {
      name: "RS UMUM DAERAH CUT MEUTIA KAB. ACEH UTARA",
      address: "JL. BANDA ACEH-MEDAN KM.6 BUKET RATA LHOKSEUMAWE",
      region: "KOTA LHOKSEUMAWE, ACEH",
      phone: "(0645) 46334",
      province: "Aceh",
    },
    {
      name: "RSUP SANGLAH",
      address: "JL. DIPONEGORO DENPASAR BALI",
      region: "KOTA DENPASAR, BALI",
      phone: "(0361) 227912",
      province: "Bali",
    },
    {
      name: "RS UMUM DAERAH KAB. BULELENG",
      address: "JL. NGURAH RAI 30 SINGARAJA",
      region: "BULELENG, BALI",
      phone: "(0362) 22046",
      province: "Bali",
    },
    {
      name: "RS UMUM DAERAH SANJIWANI GIANYAR",
      address: "JL. CIUNG WENARA NO.2 GIANYAR",
      region: "GIANYAR, BALI",
      phone: "(0361) 943049",
      province: "Bali",
    },
  ];

  dataDummy.forEach( res => {
    const dataStringify = JSON.stringify(res)
    $("#list-rujukan").append(`
      <div class="card" onclick='localStorage.setItem("selectedRs", JSON.stringify(${dataStringify}))' style="margin-top: 10px; cursor: pointer;">
        <div class="card-body item-rs">
          ${res.name}
        </div>
      </div>
    `);
  })

  $(".item-rs").on("click", () => {
    setTimeout(() => {
      const selectedRs = JSON.parse(localStorage.getItem("selectedRs"))
      console.log(selectedRs);
      $("#detail-rujukan-name").html(selectedRs.name);
      $("#detail-rujukan-address").html(selectedRs.address);
      $("#detail-rujukan-phone").html(selectedRs.phone);
      $("#list-rujukan").hide();
      $("#main-detail-rujukan").show();
    }, 1000)
  })

  const selectedRs = JSON.parse(localStorage.getItem("selectedRs"))

  if (selectedRs) {
    $("#list-rujukan").hide();
    $("#main-detail-rujukan").show();
  } else {
    $("#list-rujukan").show();
    $("#main-detail-rujukan").hide();
  }
});
