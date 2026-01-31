const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  // Verificar si viene el token en headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Obtener token
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Guardar info del usuario (id)
      req.user = decoded.id;

      next(); // continuar
    } catch (error) {
      return res.status(401).json({ message: 'Token no válido' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, token faltante' });
  }
};

module.exports = protect;
