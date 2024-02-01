const { Table, ObjectId } = require('../db')

async function createTaskDB(task) {
    await Table.create(task);
    const data = await Table.find();
    return data;
}

async function getAllTaskDB() {
    const data = await Table.find();
    return data;
}

async function getTaskIdDB(_id) {
    const data = await Table.find({ _id: new ObjectId(_id) });
    return data;
}



async function updateTaskDB(_id, task) {
    await Table.updateOne({ _id: new ObjectId(_id) }, { $set: task });
    const data = await Table.find({ _id: new ObjectId(_id) });
    return data;
}

async function deleteTaskDB(_id) {
    return await Table.deleteOne({ _id: new ObjectId(_id) });
}

module.exports = { createTaskDB, getAllTaskDB, getTaskIdDB, updateTaskDB, deleteTaskDB }