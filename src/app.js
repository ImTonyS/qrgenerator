const express = require('express');
const axios = require('axios');
const app = express();
const puerto = 3000;
require('dotenv').config();

const path = require('path');

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/', 'index.html'));
});

app.use(express.urlencoded({ extended: true }));

app.post('/enviar', (req, res) => {
    const url = req.body.url;
    console.log(url)
    let urlapi = `https://api.qr-code-generator.com/v1/create?access-token=${process.env.API_KEY}`;
    let data = {
      "frame_name": "no-frame",
      "qr_code_text": url,
      "image_format": "SVG",
      "qr_code_logo": "scan-me-square"
    }

  axios.post(urlapi, data)
  .then(response => {
    //Obtener el svg de la respuesta
    const qrContent = response.data;
    console.log(response.data)

    //Redirecciono al usuario a otro html
    res.redirect = `/descargar?qr=${encodeURIComponent(qrContent)}`;
  })
  .catch(error => {
    console.error('Error al obtener el QR: ', error);
    res.status(500).send('Error al obtener el QR');
  });
});

app.post('/descargar', (req, res) => {
  const qrContent = req.query.qr;

  //Crear el objeto blob se usa para representar datos binarios crudos
  const svgBlob = new Blob([qrContent], { type: 'image/svg+xml' });

  const qrURL = URL.createObjectURL(svgBlob);

  res.render('descargar', { qrURL });

})

app.listen(puerto, () => {
    console.log(`Servidor iniciado en puerto: ${puerto}`)
});
