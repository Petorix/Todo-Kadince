// Imports
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const server = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

// Database setup
//  DB Info - make sure to change the whitelist entry for actual use
//  Username: kadinceUser
//  Password: kadince123
//  const MONGODB_URI = 'mongodb+srv://kadinceUser:kadince123@todo-kadince.jvj1g.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect('mongodb://localhost/todo_app', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (e) => console.log(`DB error: ${e}`));
db.once('open', () => console.log('DB connected.'));

server.use(express.json());
server.use(express.urlencoded({ encoded: false}));
server.use(morgan('tiny'));
server.use('/', routes);
server.listen(PORT, console.log(`Server is starting on port: ${PORT}`));