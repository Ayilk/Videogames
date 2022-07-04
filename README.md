# VIDEOGAMES APP

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
PORT = 3001
API_KEY = dd55f148aeae4f76919d0d8b5b516dc5
BASE_URL = https://api.rawg.io/api
CONSOLE_URL = /platforms?key=
DEV_URL = /developers?key= 
GAMES_URL = /games?key= 
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que creen desde psql una base de datos llamada `videogames`

El contenido de `client` fue creado usando: Create React App.


## Para levantar el servidor

Dentro del archivo, ubicarse en el fichero `api` y ejecutar `npm start`

## Para levantar la aplicación

Dentro del archivo, ubicarse en el fichero `client` y ejecutar `npm start`

> Recuerde hacer `npm install` en cada fichero

## Estos son los ENDPOINTS disponibles :
<br/>

__Videogames__
  - GET, POST http://localhost:3001/videogames
  - GET http://localhost:3001/videogames?name={input}
  - GET, PUT, DELETE http://localhost:3001/videogames/:id

__Developers__
  - GET http://localhost:3001/developers  

__Consoles__
  - GET http://localhost:3001/consoles

  
<br/>

> NOTA: Por optimizar tiempo de respuesta a las peticiones a la base de datos