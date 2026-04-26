const express = require('express');
const cors = require('cors');
const path = require('path');
const commandRoutes = require('./routes/command.routes.js');

require('dotenv').config();

const app = express(); // Crear instancia de Express 

const allowedOrigins = [
  'http://localhost:3000',
  'https://cybervault2.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS bloqueado para origen: ${origin}`));
    }
  }
}));
app.use(express.json()); // Middleware para parsear JSON en el cuerpo de las solicitudes

// Servir el frontend estático
app.use(express.static(path.join(__dirname, '../../frontend')));

// Montar rutas
app.use('/api/v1/commands', commandRoutes);



// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
  console.log('404:', req.method, req.originalUrl);
  res.status(404).json({ 
    error: { code: 404, message: 'ruta no encontrada' }
  });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(' ERROR:', {
    message: err.message,
    status: err.status,
    url: req.originalUrl
  });

  // Determinar el código de estado y mensaje a enviar
  let status = err.status || 500;
  let message = err.message || 'Error interno del servidor';

  // Personalizar mensajes para errores comunes
  if (err.message === 'NOT_FOUND') {
    status = 404;
    message = 'Recurso no encontrado';
  } 

  // Validación de campos incompletos o inválidos
  else if (err.message === 'campos imcompletos' || 
           err.message.includes('requerido') || 
           err.message.includes('invalido')) {
    status = 400;  
    message = err.message;
  }

  res.status(status).json({
    error: { code: status, message }
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

module.exports = app;