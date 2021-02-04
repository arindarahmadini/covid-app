API Documentation

POST /LOGIN

Request : email , password |  response : access_token ( 200 )

POST /register

Request : email , name, password, province | response : { email,name,province } (201)

POST /signingoogle

Request : id_token google | response : access_token

<hr />

Header : access_token

GET /dataCovid

request : none | response :

```
https://api.kawalcorona.com/indonesia/jawa_tengah
```

```markup
[ {
"name": "dki",
		"positif": "514",
		"sembuh": "29",
		"meninggal": "48"
}
```

GET /dataHospital

request : none | response : 

https://dekontaminasi.com/api/id/covid19/hospitals ( filter by provinsi dari user )

```json
[
	{
			hospital_name : string,
			address : string,
			region : string,
			province : string,
			latitude : string,
			longtitude : string,
			phone : string,
	}
]
```

GET /updateUser

request : none || response : dataUser (200)

PUT /updateUser

request : email , name, province | response : dataUser ( 200 )

PATCH /updateUserProvince

request : province | response : dataUser ( 200 )

