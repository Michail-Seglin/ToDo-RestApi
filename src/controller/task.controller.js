const express = require('express');
const { createTask, getTaskId, updateTask, deleteTask, getAllTask } = require('../service/task.service');
const { buildResponse } = require('../helper/buildResponse')
const route = express.Router();


route.post('/', async (req, res) => {
    try {
        const data = await createTask(req.body);
        buildResponse(res, data, 200);
    } catch (er) {
        buildResponse(res, er.message, 404);
    }
})

route.get('/', async (req, res) => {
    try {
        const data = await getAllTask();
        buildResponse(res, data, 200);
    } catch (er) {
        buildResponse(res, er.message, 404);
    }
})

route.get('/:_id', async (req, res) => {
    try {
        const data = await getTaskId(req.params._id);
        buildResponse(res, data, 200);
    } catch (er) {
        buildResponse(res, er.message, 404);
    }
})

route.put('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const task = req.body;
        buildResponse(res, await updateTask(_id, task), 200);
    } catch (error) {
        buildResponse(res, er.message, 404);
    }

});


route.delete('/:_id', async (req, res) => {
    try {
        buildResponse(res, await deleteTask(req.params._id), 200);
    } catch (error) {
        buildResponse(res, er.message, 404);
    }
});

module.exports = route;
