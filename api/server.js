const express = require('express');
const helmet = require('helmet');

const cors = require('cors');
const session = require('express-session');
const sessionConfig = require('../data/sessionConfig');

const userRouter = require('./users/userRouter')

const server = express();

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/users', userRouter)

server.get('/', (req, res) => {
    res.status(200).json({mes: "HI, from the backend"});
});

module.exports = server;
