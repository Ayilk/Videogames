require('dotenv').config();
 // Esto es una clase que vamos a instanciar mas adelante
const { Sequelize } = require('sequelize');
//permite interactuar con el sistema de archivos de una manera modelada en funciones POSIX estándar.
const fs = require('fs');
//Para trabajar con rutas de archivos y directorios
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({//Variables con la sque se subirá a producción 
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
        { logging: false, native: false }
      );
// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Consoles, Developers, Videogames } = sequelize.models;

// Aquí vienen las relaciones
// Product.hasMany(Reviews);

Videogames.belongsToMany(Consoles, {through: "console_videogame"});
Consoles.belongsToMany(Videogames, {through: "console_videogame"});

Videogames.belongsToMany(Developers, {through: "dev_videogame"});
Developers.belongsToMany(Videogames, {through: "dev_videogame"});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};