const axios = require('axios')
// apikey = 8fcf50414b509cf1b2eb3256968048fb
class externalApiController{

    static getDataHospital(req,res,next){
        const prov = 'Aceh'
        axios({
            method: 'GET',
            url: 'https://dekontaminasi.com/api/id/covid19/hospitals'
        }).then(dataHospital => {
            let hospitals = dataHospital.data.filter(hospital => hospital.province == prov);
            hospitals.forEach(hospital => {
                axios({
                    method : 'GET',
                    url : 'http://api.positionstack.com/v1/forward?access_key=8fcf50414b509cf1b2eb3256968048fb&limit=1&country=ID&query='+hospital.name
                }).then(data => {
                    console.log(hospital.name,data.data);
                })
            })
            res.status(200).json(hospitals);
        }).catch((err) => {
            next(err)
        })
    }

}

module.exports = externalApiController