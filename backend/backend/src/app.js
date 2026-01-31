// ========================================
// app.js
// Backend Task Manager - MVP
// ========================================

const express = require('express');
const app = express();

// Middleware para leer JSON
app.use(express.json());

// ============================
// Datos en memoria
// ============================
let tasks = [];
let nextId = 1;

// ============================
// GET - Listar tareas
// ============================
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// ============================
// POST - Crear tarea
// ============================
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'El título es obligatorio' });
  }

  const newTask = {
    id: nextId++,
    title
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ============================
// PUT - Actualizar tarea
// ============================
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  task.title = title || task.title;
  res.json(task);
});

// ============================
// DELETE - Eliminar tarea
// ============================
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  tasks.splice(index, 1);
  res.json({ message: 'Eliminada' });
});

// ============================
// Servidor
// ============================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
