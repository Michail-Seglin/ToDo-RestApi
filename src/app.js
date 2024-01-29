const express = require('express');
const route = require('./controller/task.controller')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use('/task', route);
app.use((er, req, res, _next) => res.send(er.message))
module.exports = app;