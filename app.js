const express = require ('express');
const app = express();
const port = 3000;

app.use(express.json());


let tareas = [
    { id: "1", descripcion: 'Revisar correos', finalizada: false },
    { id: "2", descripcion: 'Gestionar pendientes administrativos', finalizada: true },
    { id: "3", descripcion: 'Ejecutar mantenimientos pendientes', finalizada: false },
    { id: "4", descripcion: 'Programar mantenimientos', finalizada: false },
];

// obtener tareas
app.get('/tareas', (req, res) => {
res.json(tareas);
});

// crear nueva tarea
app.post('/tareas', (req, res) => {
const tarea = req.body;
tareas.push(tarea);
res.status(201).json(tarea);
});

// actualizar tarea existente
app.put('/tareas/:id', (req, res) => {
const id = req.params.id;
const actualizaTarea = req.body;

// Buscar la tarea por ID y actualizarla
for (let i = 0; i < tareas.length; i++) {
if (tareas[i].id === id) {
  tareas[i] = actualizaTarea;
  return res.json(actualizaTarea);
}
}

res.status(404).json({ error: 'Tarea no encontrada' });
});

// eliminar una tarea
app.delete('/tareas/:id', (req, res) => {
const id = req.params.id;

// Filtrar tareas para eliminar por id
tareas = tareas.filter((tarea) => tarea.id !== id);

res.status(204).send();
});

app.listen(port, () => {
console.log(`Servidor iniciado en  http://localhost:${port}`);
});