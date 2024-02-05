const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const route = require('./controller/task.controller')

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/task', route);
app.use((er, req, res, _next) => res.send(er.message))
module.exports = app;