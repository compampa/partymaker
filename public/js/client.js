/* const chat = document.getElementById('chat');
const btn = document.querySelector('#sendBtn');

const socket = new WebSocket('ws://localhost:3030');

socket.onopen = function () {
  console.log('Соединение установлено.');
};

socket.onmessage = function (event) {
  // console.log("Получены данные " + event.data);
  chat.innerHTML += `<div class="message">${event.data}</div>`;
};

socket.onerror = function (error) {
  alert(`Ошибка ${error.message}`);
};

function send() {
  const text = document.getElementById('text').value;
  const name = 'Tapac'; // вытащить имя из куков или из сессии
  // socket.send(JSON.stringify({text, name}));
  socket.send(text);
}

btn.addEventListener('click', send);

 */

// в script.js
// console.log('hello');
const $chat = document.getElementById('chatik');
const $form = document.forms.chat;
const socket = new WebSocket('ws://localhost:3001');

// const herokuUrl = location.origin.replace('http', 'ws');
// const socket = new WebSocket(window.location.origin.replace('http', 'ws')) // before deploy
// это настройки для deploy вместо строчки socket

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData($form));
  // 14) собираем инфу с инпута
  // парсим
  const jsonData = JSON.stringify({
    type: 'NEW_MESSAGE',
    payload: data,
  });

  socket.send(jsonData);
  // отправляем на Бэк
  $form.reset();
});

socket.onopen = function () {
  // 7) как только открылось соединение
  // отправляем тип события CHAT_CONNECT на back
  // на 55 и 71 строчку
  socket.send(
    JSON.stringify({
      type: 'CHAT_CONNECT',
    }),
  );
  socket.onmessage = function (message) {
    // 10) прослушиваем событие message
    // 17) прослушиваем
    const parsed = JSON.parse(message.data);
    // 11) и 18) парсим ответ с back и смотрим тип и от этого толкаем в case
    console.log('message on front', parsed);
    switch (parsed.type) {
      case 'NEW_MESSAGE':
        // 19) вытаскиваем данные
        const { name, message: memberMsg } = parsed.payload;
        // 20) выводим сообщение в чат
        const memberMessageStr = `<p><b>${name}:</b> ${memberMsg}</p>`;
        $chat.insertAdjacentHTML('beforeend', memberMessageStr);
        break;

      case 'CHAT_CONNECT':
        const { name: newMember, id: memberId } = parsed.payload;
        // 12) вытаскиваем данные
        const messageStr = `<p>${newMember} joined the chat</p>`;
        $chat.insertAdjacentHTML('beforeend', messageStr);
        // 13) приветствуем пользователя
        console.log(newMember);
        break;
      default:
        break;
    }
  };
};

// socket.send()
