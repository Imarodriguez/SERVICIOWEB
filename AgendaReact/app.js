const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// Middleware para parsear JSON en las solicitudes POST
app.use(express.json());

// Ruta para listar contactos
app.get('/contactos', async (req, res) => {
  try {
    const response = await fetch('http://www.raydelto.org/agenda.php');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al obtener los contactos:', error);
    res.status(500).json({ error: 'Error al obtener los contactos' });
  }
});

// Ruta para almacenar un nuevo contacto
app.post('/contactos', async (req, res) => {
  try {
    const newContact = req.body;
    const response = await fetch('http://www.raydelto.org/agenda.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error al agregar el contacto:', error);
    res.status(500).json({ error: 'Error al agregar el contacto' });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
