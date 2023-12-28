const ioClient = require('socket.io-client');
const socket = ioClient('http://localhost:3400');

socket.on('postDeleted', () => {
  console.log('Evento postDeleted recebido do servidor Socket.IO');
  // Faça o que for necessário ao receber o evento
});
