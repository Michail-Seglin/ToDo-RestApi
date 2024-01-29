const { createTaskDB, getTaskIdDB, getAllTaskDB, updateTaskDB, deleteTaskDB } = require('../repository/task.repository');

async function createTask(task) {
    const data = await createTaskDB(task);
    return data;
}

async function getTaskId(_id) {
    return await getTaskIdDB(_id);
}

async function getAllTask() {
    return await getAllTaskDB();
}

async function updateTask(_id, task) {
    const data = await updateTaskDB(_id, task);
    return data;
}

async function deleteTask(_id) {
    return await deleteTaskDB(_id);
}


module.exports = { createTask, getTaskId, getAllTask, updateTask, deleteTask }