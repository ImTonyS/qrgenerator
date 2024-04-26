const express = require('express');
const app = express();
const puerto = 3000;

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/', 'index.html'));
});

app.use(express.urlencoded({ extended: true }));

app.post('/enviar', (req, res) => {
    const url = req.body.url;
    console.log(url);

    res.status(200).send('Formulario enviado existosamente');
});

app.listen(puerto, () => {
    console.log(`Servidor iniciado en puerto: ${puerto}`)
});


