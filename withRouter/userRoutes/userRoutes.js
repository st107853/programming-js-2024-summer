const { URL } = require('url');

//Importing the functions for processing requests
const createUser = require('./createUser');
const deleteUser = require('./deleteUser');
const getUser = require('./getUser');
const listUsers = require('./listUser');
const updateUser = require('./updateUser');

//The function for processing requests
const userRoutes = (req, res) => {
    const baseUrl = `http://${req.headers.host}/`;
    const parsedUrl = new URL(req.url, baseUrl);
    const method = req.method;
    const path = parsedUrl.pathname;

    res.setHeader('Content-Type', 'application/json');

    if (path === '/users') {
        switch (method) {
            case 'GET':
                listUsers(req, res);
                break;
            case 'POST':
                createUser(req, res);
                break;
            default:
                res.writeHead(404);
                res.end(JSON.stringify({message: 'Unknown method'}))
        }

    } else {
        switch (method) {
            case 'GET':
                getUser(req, res);
                break;
            case 'PUT':
                updateUser(req, res);
                break;
            case 'DELETE':
                deleteUser(req, res);
                break;
            default:
                res.writeHead(404);
                res.end(JSON.stringify({message: 'Unknown method'}))
        }
    }
};

module.exports = userRoutes;
