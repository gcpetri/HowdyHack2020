// app.js

const server = require('server');

const { get, post } = server.router;

// Launch server
server({ port: 3000 }, [
    get('./', ctx => public)
]);

