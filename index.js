const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express();
const PORT   = 8000;

// Use our modules
server.use( bodyParser.json() ); // This solves getting the body of the request
server.use( cors() ); // Solves communication by other software

let userId = 0;

let users = [
]

let posts = [
]

server.post('/register', (request, response) => {
    const userFound = users.find(user => user.email === request.body.email )

    if (!userFound) {
        userId++;
        users.push( {"id": userId, ...request.body} );
        response.send({ message: 'User has been successfully registered!' });
        console.log(users)
    }
    else if (request.body.email === '' || request.body.username === '' || request.body.password === '' ) {
        response.send({ error: 'Cannot Create User' });
    }
    else {
        response.send({ error: 'Email already exists in the database' });
    }
});

server.post('/login', (request, response) => {
    const userFound = users.find(user => 
            user.username === request.body.username 
            && user.password === request.body.password
        )

    if (userFound) {
        response.send({ message: 'Successful Login' });
    }
    else {
        response.send({ error: 'Invalid credentials' });
    }
});

server.listen( PORT, () => { console.log(`Server is running on port ${PORT}`); })