const Express = require('express');
const app = Express();

app.get('/', (req,res) => {
    res.send('Prueba Técnica Medical Minds')
})

app.listen(3001, () => {
    console.log("El servidor está escuchando en el puerto 3001")
})