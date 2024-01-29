const express = require('express');
const { createTask, getTaskId, updateTask, deleteTask, getAllTask } = require('../service/task.service');

const route = express.Router();


route.post('/', async (req, res) => {
    try {
        const data = await createTask(req.body);
        res.send(data);
    } catch (er) {
        res.send(er.message)
    }
})

route.get('/', async (req, res) => {
    try {
        const data = await getAllTask();
        res.send(data);
    } catch (error) {
        res.send(error.message);
    }
})

route.get('/:_id', async (req, res) => {
    try {
        const data = await getTaskId(req.params._id);
        res.send(data);
    } catch (er) {
        res.send(er.message)
    }
})

route.put('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const task = req.body;
        res.send(await updateTask(_id, task));
    } catch (error) {
        res.send(error.message);
    }

});


route.delete('/:_id', async (req, res) => {
    try {
        res.status(200).send(await deleteTask(req.params._id));
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = route;
