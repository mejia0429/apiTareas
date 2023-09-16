const express = require ('express');
const app = express();
const port = 3000;

app.use(express.json());


let tasks = [
    { id: "1", descripcion: 'Revisar correos', finalizada: false },
    { id: "2", descripcion: 'Gestionar pendientes administrativos', finalizada: true },
    { id: "3", descripcion: 'Ejecutar mantenimientos pendientes', finalizada: false },
    { id: "4", descripcion: 'Programar mantenimientos', finalizada: false },
];

// obtener tareas
app.get('/tasks', (req, res) => {
res.json(tasks);
});

// crear nueva tarea
app.post('/tasks', (req, res) => {
const task = req.body;
tasks.push(task);
res.status(201).json(task);
});

// actualizar tarea existente
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

// eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
const id = req.params.id;

// Filtrar tareas para eliminar por id
tasks = tasks.filter((task) => task.id !== id);

res.status(204).send();
});

app.listen(port, () => {
console.log(`Servidor iniciado en en http://localhost:${port}`);
});