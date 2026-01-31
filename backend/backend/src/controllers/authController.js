// src/controllers/authController.js
// Controlador de autenticación (Register & Login)

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @desc    Registrar usuario
 * @route   POST /api/auth/register
 * @access  Público
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validaciones básicas
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      userId: user._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

/**
 * @desc    Login de usuario
 * @route   POST /api/auth/login
 * @access  Público
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login exitoso',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

module.exports = {
  registerUser,
  loginUser
};
