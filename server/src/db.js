const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/toDo');

const Table = mongoose.model('tasks', {
    title: String,
    description: String
});

const ObjectId = mongoose.Types.ObjectId;

module.exports = { Table, ObjectId };