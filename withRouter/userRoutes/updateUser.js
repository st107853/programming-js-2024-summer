const data = require('../sql-data');

module.exports = (req, res) => {
    const id = parseInt(req.url.split('/')[2]);
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        const parsedBody = new URLSearchParams(body);
        const updatedData = await data.getUserById(id);
        parsedBody.forEach((value, key) => {
            if (key === 'age' && value !== undefined) {
                updatedData[age] = parseInt(value);
            } else if (value !== undefined) {
                updatedData[key] = value;
            }
        });

        const updatedUser = await data.updateUser(id, updatedData);

        if (updatedUser) {
            res.writeHead(200);
            res.end(JSON.stringify(updatedUser));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({message: 'User not found'}));
        }
    });
};
