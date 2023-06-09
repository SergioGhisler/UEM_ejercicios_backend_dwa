const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

require('./database');

const PORT = 3000;

app.use(express.json());

const tareasSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descripcion: String,    
    status: { type:String, default: 'to-do' },
});

const Tarea = mongoose.model('Tarea', tareasSchema);

app.post('/tareas', async (req, res) => {
    try {
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.status(201).send(tarea);
    } catch(error) {
        res.status(400).send({error: error.message});
    }
});

app.get('/tareas', async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.send(tareas);
    } catch(error) {
        res.status(500).send({error: error.message});
    }
});

app.delete('/tareas/:id', async (req, res) => {
    try {
        const tarea = await Tarea.findByIdAndDelete(req.params.id);
        if (!tarea) {
            return res.status(404).send({error: 'Tarea no encontrada'});
        }
        res.send(tarea);
    } catch(error) {
        res.status(500).send({error: error.message});
    }
});

app.put('/tareas/:id', async (req, res) => {
    try{
        const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body);
        if (!tarea) {
            return res.status(404).send({error: 'Tarea no encontrada'});
        }

        res.send(tarea);
    }catch(error){
        res.status(500).send({error: error.message});
    }
});

app.get('/tarea_por_estado', async (req, res) => {
    try {
        const filtroEstado = req.query.estado || req.cookies.ultimoEstado || null;
        const filtro = filtroEstado ? {status: filtroEstado} : {};
        if (filtroEstado) {
            res.cookie('ultimoEstado', filtroEstado);
        }
        const tareas = await Tarea.find(filtro);
        res.send(tareas);
    } catch(error) {
        res.status(500).send({error: error.message});
    }
    });
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
}
);