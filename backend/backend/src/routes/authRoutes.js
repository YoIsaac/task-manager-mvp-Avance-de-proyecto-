// src/routes/authRoutes.js
// Rutas de autenticación (register y login)

const express = require('express');
const router = express.Router();

// Importamos el controlador
const {
  registerUser,
  loginUser
} = require('../controllers/authController');

// Registro de usuario
// POST /api/auth/register
router.post('/register', registerUser);

// Login de usuario
// POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;
