const express = require('express');

const userRouter = require('./users/userRouter')

const server = express();

server.use(express.json());

server.use('/users', userRouter)

server.get('/', (req, res) => {
    res.status(200).json({mes: "HI, from the backend"});
});

module.exports = server;
