const express = require('express');
const router = express.Router();
const { generarToken } = require('../middleware/auth');

// POST /api/auth/login -> valida usuario/clave contra el .env y devuelve un token
router.post('/login', (req, res) => {
  const { usuario, clave } = req.body;

  const usuarioValido = process.env.ADMIN_USER;
  const claveValida = process.env.ADMIN_PASSWORD;

  if (!usuario || !clave) {
    return res.status(400).json({ success: false, message: 'Usuario y clave son requeridos.' });
  }

  if (usuario !== usuarioValido || clave !== claveValida) {
    return res.status(401).json({ success: false, message: 'Usuario o clave incorrectos.' });
  }

  const token = generarToken(usuario);
  res.status(200).json({ success: true, token });
});

module.exports = router;
