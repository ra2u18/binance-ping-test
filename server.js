const net = require('net');

const server = net.createServer((conn) => {
  console.log('new client');

  setInterval(() => {
    conn.write(process.hrtime.bigint().toString());
  }, 1000);

  conn.on('data', (data) => {
    const millis = parseFloat((process.hrtime.bigint() - BigInt(data)) / BigInt(1e3)) / 1000;
    console.log(`Round trip time: ${millis} ms`);
  });

  conn.on('end', () => {
    console.log('client left');
  });
});

server.listen(9090);
