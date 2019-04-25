const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const socketIO = require('socket.io');

const routes = require('./Routes');
const socket = require('./socket');

const app = express();
app.set('json spaces', 2);

const server = http.Server(app);
socket(socketIO(server));

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.use(routes);

module.exports = server;
