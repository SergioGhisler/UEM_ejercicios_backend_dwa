const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/tasks')
.then(() => console.log('La conexion ha sido exitosa'))
.catch((err) => console.log(err))

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type:String, default: 'to-do' },

})

const Task = mongoose.model('Task', taskSchema);

app.use(express.json());

// Añadir una tarea
app.post('/tasks', async (req, res) => {
    try {
      const task = new Task(req.body);
      await task.save();
      res.status(201).send(task);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
  
  // Obtener la lista de todas las tareas
  app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.send(tasks);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.get('/tasks_by_status', async (req, res) => {
    try {
      console.log(req.query)
      const statusFilter = req.query.status || req.cookies.lastStatusFilter || null;
      console.log(statusFilter)
      const filter = statusFilter ? { status: statusFilter } : {};
  
      if (statusFilter) {
        res.cookie('lastStatusFilter', statusFilter, { maxAge: 24 * 60 * 60 * 1000 }); // Duración de 1 día
      }
  
      const tasks = await Task.find(filter);
      res.send(tasks);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
  
  // Actualizar una tarea
  app.put('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) {
        return res.status(404).send({ error: 'Task not found' });
      }
      res.send(task);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
  
  // Eliminar una tarea
  app.delete('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).send({ error: 'Task not found' });
      }
      res.send(task);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
  

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
