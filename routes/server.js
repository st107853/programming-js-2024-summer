const http = require('http');

//Importing the route handler
const routeHandler = require('./router');

//Creating an HTTP server
const server = http.createServer(routeHandler);

//Starting the server that runs on port 8080
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});