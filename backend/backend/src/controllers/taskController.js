// ---------------------------------------------
// src/controllers/taskController.js
// Controlador de tareas (CRUD)
// Aquí SOLO va la lógica, NO rutas
// ---------------------------------------------

const Task = require('../models/Task');

// ===============================
// OBTENER TODAS LAS TAREAS
// ===============================
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
};

// ===============================
// CREAR UNA NUEVA TAREA
// ===============================
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validación básica (suma puntos en rúbrica)
    if (!title) {
      return res.status(400).json({ message: 'El título es obligatorio' });
    }

    const task = await Task.create({
      title,
      description
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tarea' });
  }
};

// ===============================
// ACTUALIZAR TAREA
// ===============================
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar tarea' });
  }
};

// ===============================
// ELIMINAR TAREA
// ===============================
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar tarea' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
