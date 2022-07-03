

const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Sincronizando todos los modelos a la vez
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console
  });
});