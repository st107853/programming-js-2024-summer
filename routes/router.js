const { URL } = require('url');

//Importing the route handler
const userRoutes = require('./userRoutes/userRoutes');

//The function for processing requests
const routeHandler = (req, res) => {
    const baseUrl = `http://${req.headers.host}/`;
    const parsedUrl = new URL(req.url, baseUrl);
    const path = parsedUrl.pathname;

    if (path.startsWith('/users')) {
        userRoutes(req, res);
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.writeHeader(404);
        res.end(JSON.stringify({message: 'Route not found.'}));
    }
};

module.exports = routeHandler;