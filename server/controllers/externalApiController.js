const axios = require('axios')
// apikey = 8fcf50414b509cf1b2eb3256968048fb
class externalApiController{

    static async getDataHospital(req,res,next){
        try{
            const prov = 'DKI Jakarta'
            let dataHospital = await axios({
                method: 'GET',
                url: 'https://dekontaminasi.com/api/id/covid19/hospitals'
            });
            let hospitals = dataHospital.data.filter(hospital => hospital.province == prov);
            for(let hospital of hospitals){
                let queryString = hospital.name.replace(/ +(?= )/g,'') // remove double-space
                if(!queryString.includes(hospital.province.toUpperCase())){
                    queryString += ' ' + hospital.province
                }
                let geoCodeReq = await axios({
                    method : 'GET',
                    url : 'https://geocode.search.hereapi.com/v1/geocode?apiKey=2kizGqqAPl8BcyDYpsfRfVazaDvgEhfIUPKmD6_bmtw&q='+queryString
                });
                hospital.latitude = 0
                hospital.longtitude = 0
                if(geoCodeReq.data.items.length > 0){
                    hospital.latitude = geoCodeReq.data.items[0].position.lat
                    hospital.longtitude = geoCodeReq.data.items[0].position.lng
                }
            }
            res.status(200).json(hospitals);
        }catch(err) {
            next(err);
        };
        
        
    }

}

module.exports = externalApiController