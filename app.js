const express = require('express');
const app = express();
const port = 3000; // Puedes cambiar el puerto si lo deseas

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Lista de tareas (puedes usar un arreglo para almacenarlas en memoria)
let tasks = [
    { id: 1, descripcion: 'Tarea 1', finalizada: false },
    { id: 2, descripcion: 'Tarea 2', finalizada: true },
    { id: 3, descripcion: 'Tarea 3', finalizada: false },
  ];

// Endpoint para obtener todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Endpoint para crear una nueva tarea
app.post('/tasks', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).json(task);
});

// Endpoint para actualizar una tarea
app.put('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const updatedTask = req.body;

  // Buscar la tarea por ID y actualizarla
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i] = updatedTask;
      return res.json(updatedTask);
    }
  }

  res.status(404).json({ error: 'Tarea no encontrada' });
});

// Endpoint para eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;

  // Filtrar las tareas para eliminar la tarea con el ID dado
  tasks = tasks.filter((task) => task.id !== id);

  res.status(204).send();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});