const crypto = require('crypto');

const SECRET = process.env.ADMIN_TOKEN_SECRET || 'clinica-salud-plena-secret-cambiar';
const EXPIRA_EN_MS = 1000 * 60 * 60 * 8; // 8 horas de sesión

// Genera un token firmado: base64(usuario|expiracion).firma
function generarToken(usuario) {
  const expira = Date.now() + EXPIRA_EN_MS;
  const payload = `${usuario}|${expira}`;
  const payloadB64 = Buffer.from(payload).toString('base64');
  const firma = crypto.createHmac('sha256', SECRET).update(payloadB64).digest('hex');
  return `${payloadB64}.${firma}`;
}

// Verifica el token: firma válida y no expirado
function verificarToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [payloadB64, firma] = token.split('.');
  const firmaEsperada = crypto.createHmac('sha256', SECRET).update(payloadB64).digest('hex');

  const firmaBuffer = Buffer.from(firma, 'hex');
  const esperadaBuffer = Buffer.from(firmaEsperada, 'hex');
  if (firmaBuffer.length !== esperadaBuffer.length || !crypto.timingSafeEqual(firmaBuffer, esperadaBuffer)) {
    return null;
  }

  const payload = Buffer.from(payloadB64, 'base64').toString('utf8');
  const [usuario, expira] = payload.split('|');
  if (Date.now() > Number(expira)) return null;

  return { usuario };
}

// Middleware que protege rutas: exige header "Authorization: Bearer <token>"
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const datos = verificarToken(token);

  if (!datos) {
    return res.status(401).json({ success: false, message: 'No autorizado. Inicia sesión para ver los registros.' });
  }

  req.usuarioAdmin = datos.usuario;
  next();
}

module.exports = { generarToken, verificarToken, requireAuth };
