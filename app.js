const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Simulamos una lista de 11 vendedores
let vendedores = [
    { id: 1, nombre: "Vendedor 1", citas: 0 },
    { id: 2, nombre: "Vendedor 2", citas: 0 },
    { id: 3, nombre: "Vendedor 3", citas: 0 },
    { id: 4, nombre: "Vendedor 4", citas: 0 },
    { id: 5, nombre: "Vendedor 5", citas: 0 },
    { id: 6, nombre: "Vendedor 6", citas: 0 },
    { id: 7, nombre: "Vendedor 7", citas: 0 },
    { id: 8, nombre: "Vendedor 8", citas: 0 },
    { id: 9, nombre: "Vendedor 9", citas: 0 },
    { id: 10, nombre: "Vendedor 10", citas: 0 },
    { id: 11, nombre: "Vendedor 11", citas: 0 }
];

// Ruta para recibir agendamientos
app.post('/agendar', (req, res) => {
    const { nombre, email, telefono, motivo, mensaje } = req.body;

    // Algoritmo Round Robin: seleccionar vendedor con menos citas
    vendedores.sort((a, b) => a.citas - b.citas);
    let vendedorAsignado = vendedores[0];
    vendedorAsignado.citas += 1;

    console.log(`Agendamiento recibido: ${nombre} asignado a ${vendedorAsignado.nombre}`);

    // Respuesta simulada
    res.json({
        success: true,
        mensaje: `¡Gracias ${nombre}! Tu cita fue asignada a ${vendedorAsignado.nombre}. Te contactaremos pronto.`
    });
});

// Servir el formulario estático
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
