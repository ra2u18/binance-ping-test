const net = require('net');

const options = {
  port: 9090,
};

const client = net.createConnection(options, () => {
  console.log('Connected');
});

client.on('data', (data) => {
  client.write(data.toString());
});

client.on('close', () => {
  console.log('Connection closed!');
});
