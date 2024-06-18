const http = require('http');
const { URL } = require('url');

//Массив для хранения пользователей
let data = [];

//Индивидуальный индекс
let index = 0;

//Функция для обработки запросов
const requestHandler = (req, res) => {
    const baseUrl = `http://${req.headers.host}/`;
    const parsedUrl = new URL(req.url, baseUrl);
    const path = parsedUrl.pathname;
    const method = req.method;

    //Заголовок ответа
    res.setHeader('Content-Type', 'application/json')

    if (path.startsWith('/user/') && method === 'GET'){
        res.writeHead(200);
        res.end(JSON.stringify({message: 'It works!'}));
    } else {
        res.writeHead(404);
        console.log(path, method);
        res.end(JSON.stringify({message: 'It stil works!'}));
    }
};

const server = http.createServer(requestHandler);

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});