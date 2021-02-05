# COVID - APP

### base url : http://localhost:PORT/
### depedencies :
- axios
- bcryptjs
- cors
- dotenv
- express
- google-auth-library
- jsonwebtoken
- nodemon
- pg
- sequelize
- sequelize-cli



-----

## POST /login

### Request

_Request Body_
```
{
    "email": "<input email>",
    "password": "<input password>",
}
```

### Success Response
_Response (200 - OK)_
```
{
    "access_token": "<access_token>
    "province": "Jawa Barat",
    "name": "haloha",
    "email": "helshinky@mail.com"
}
```

### Error Response
_Response (400 - Bad Request)_
```
{
    "error": "Invalid email or password!"
}
```

_Response (500 - Internal Server Error)_
```
{
    "error": "Internal Server Error"
}
```

-----

## POST /register

### Request
_Request Body_
```
{
    "name": "<input name>",
    "email": "<input email>",
    "password": "<input password>",
    "province": "<input province>"
}
```

### Success Response
_Response (201 - Created)_

```
{
    "msg": "Register Success",
    "id": 4,
    "name": "haloha",
    "email": "halo@mail.com",
    "province": "Jawa Barat"
}
```

### Error Response
_Response (400 - Bad Request)_
```
{
    "error": [
        "Please enter your full name",
        "Please enter your email",
        "Invalid email format"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
    "error": "Internal Server Error"
}
```

-----

## POST /loginwithgoogle

### Request
_Request Body_
```
{
    "token": "<google_api_token>"
}
```

### Success Response
_Response (201 - Created)_

```
{
    "access_token": "<google_token>",
    "name": "haloha",
    "email": "halo@mail.com",
    "province": "Jawa Barat"
}
```

_Response (200 - OK)_

```
{
    "access_token": "<google_token>",
    "name": "haloha",
    "email": "halo@mail.com",
    "province": "Jawa Barat"
}
```

-----

## GET /datacovid/:provinsi

### Request
_Request Header_
```
{
    "token": "<access_token>"
}
```

### Success Response
_Response (200 - OK)_
```
{
    "FID": 12,
    "Kode_Provi": 32,
    "Provinsi": "Jawa Barat",
    "Kasus_Posi": 44182,
    "Kasus_Semb": 32901,
    "Kasus_Meni": 804
}
```

### Error Response
_Response (401 - Unauthorized)_
```
{
    "msg": "Invalid token"
}
```

_Response (500 - Internal Server Error)_
```
{
    "error": "Internal Server Error"
}
```

-----

## GET /dataHospital/:provinsi

### Request
_Request Header_
```
{
    "token": "<access_token>"
}
```

### Success Response
_Response (200 - OK)_
```
[
    {
        "name": "RS PARU DR. H. A. ROTINSULU",
        "address": "JL. BUKIT JARIAN NO. 40 BANDUNG",
        "region": "BANDUNG, JAWA BARAT",
        "phone": null,
        "province": "Jawa Barat",
        "latitude": -6.87742,
        "longtitude": 107.60652
    }
]
```

### Error Response
_Response (401 - Unauthorized)_
```
{
    "msg": "Invalid token"
}
```

_Response (404 - Not Found)_
```
{
    "error": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "error": "Internal Server Error"
}
```

-----

## PUT /updateuser

### Request
_Request Header_
```
{
    "token": "<access_token>"
}
```

### Success Response
_Response (200 - OK)_
```
{
    "msg": "Update Success"
}
```

### Error Response
_Response (400 - Bad Request)_
```
{
    "error": [
        "Please enter your full name",
    ]
}
```

_Response (401 - Unauthorized)_
```
{
    "msg": "Invalid token"
}
```

_Response (404 - Not Found)_
```
{
    "error": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "error": "Internal Server Error"
}
```
