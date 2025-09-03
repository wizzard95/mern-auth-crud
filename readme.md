primero incializar el proyecto con npm init -y,
asi creamos nuestro package json
===================================================

instalamos el framework express de nodejs para correr servidores:
 npm i express

===================================================
cambiar el package json e integrar el type=module para poder usar la sintaxis import de express sin tener que estar usando require: 
{
  "name": "mern-crud-auth",
  "version": "1.0.0",
  "description": "primero incializar el proyecto con npm init -y",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^5.1.0"
  }
}
===================================================
instalamos nodemon para no tener que estar apagando y prendiendo el servidor a cada rato cada vez que hacemos una actualizacion: npm i nodemon -D

luego modificar nuevamente el packagejson :
{
  "name": "mern-crud-auth",
  "version": "1.0.0",
  "description": "primero incializar el proyecto con npm init -y",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^5.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  }
}

=========================================================
MUY IMPORTANTE INSTALAR MONGODB LOCAL O EN LA NUBE CON MONGODB ATLAS: npm install mongodb
credenciales:
 pcdamian1, dGr12CEvlbw6Gjpn

 mongodb+srv://pcdamian1:dGr12CEvlbw6Gjpn@cluster0.rnrlcz7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
===================================================
instalamos un modulo que nos ayudara a ver las peticiones que nos llegaran al backend: morgan

npm i morgan
===================================================
instalamos mongoose para manejar mongodb y modelar los datos, es decir, que es lo que tiene que llegar o validar antes de que lleguen los datos:
npm i mongoose
===================================================
instalamos bycriptjs  : npm i bcriptjs y luego npm install para que se instale y actulice 
===================================================
npm i jsonwebtoken
===================================================
instalamos esta biblioteca para que nos transforme las cookies en objetos json
npm i cookie-parser 
===================================================
INSTALAMOS ZOD NPM PARA PODER VALIDAR LOS DATOS DESDE EL BACKEND
npm install zod

===================================================
para el frontend usamos vite
damian@pcdamian MINGW64 ~/desktop/mern-crud-auth
$ npm create vite

> mern-crud-auth@1.0.0 npx
> create-vite

│
◇  Project name:
│  client
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  JavaScript
│
◇  Scaffolding project in C:\Users\damian\Desktop\mern-crud-auth\client... 
│
└  Done. Now run:

  cd client
  npm install
  npm run dev

===========================================================
limpiamos los archivos: app.jsx, index.css y eliminamos app.css
======================================================
instalar react-router-dom para la navegacion 
npm i react-router-dom

