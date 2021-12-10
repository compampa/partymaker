const { createServer } = require('http');
// достать фунцию createServer из библиотеки http
const WebSocket = require('ws');
// подключаем WebSocket из библиотеки
const { app, sessionParser } = require('./app');
// подключаем app sessionParser

const PORT = process.env.PORT ?? 3001;

const server = createServer(app);
// создаем сервер. вызываем метод createServer с настройками app
const wss = new WebSocket.Server({ clientTracking: false, noServer: true });
// создаем экземпляр WebSocket
const map = new Map();
// чтобы запоминать кто подключен к сессии

server.on('upgrade', (request, socket, head) => {
// 1) слушаем сервер. это первый момент рукопожатия
  console.log('Parsing session from request...');

  sessionParser(request, {}, () => {
    // 2) вызываем метод sessionParser
    // проверяем авторизован ли пользователь
    // если нет, то разрываем соединение
    if (!request.session.userid) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    console.log('Session is parsed!');

    // switch from http to ws
    wss.handleUpgrade(request, socket, head, (ws) => {
      // 3) в нашем соединении переключаем протокол с http на ws
      wss.emit('connection', ws, request);
      // 4) мы создаем событие connection(или по другому назвать) и передаем что то
    });
  });
});

wss.on('connection', (ws, request) => {
// .on типо evenListner
// 5) когда произойдет событие connection вызывается все ниже
// и слушаем события дальше
  const { userid, name } = request.session;
  map.set(userid, ws);
  // устанавливаем в структуру map
  // id в качестве ключа, в качестве значения наше соединение
  ws.on('message', async (message) => {
    // 6) прослушиваем событие message
    // Here we can now use session parameters.
    //

    const parsed = JSON.parse(message);
    // 8) и 15) распарсим объект с front
    // проверяем какой тип и выполняем case
    switch (parsed.type) {
      case 'NEW_MESSAGE':
        console.log('message on back', parsed);
        map.forEach((client) => {
          // проходим по всем пользователям в нашем соединении
          if (client.readyState === WebSocket.OPEN) {
            // 16) если клиент готов, отправляем тип события и
            // данные пользователя
            client.send(
              JSON.stringify({
                type: parsed.type,
                payload: { name: name, message: parsed.payload.text },
              }),
            );
          }
        });
        break;
      case 'CHAT_CONNECT':
        map.forEach((client) => {
          // проходим по всем пользователям в нашем соединении
          if (client.readyState === WebSocket.OPEN) {
            // 9) если клиент готов, отправляем тип события и
            // данные пользователя
            client.send(
              JSON.stringify({
                type: parsed.type,
                payload: { name: name, id: userid },
              }),
            );
          }
        });
        break;

      default:
        break;
    }
  });

  ws.on('close', () => {
    map.delete(userid);
  });
});

server.listen(PORT, () => console.log('Закрутилась шарманка'));
