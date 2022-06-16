const axios = require('axios');
const instance = axios.create();

const url = 'https://api.binance.com/sapi/v1/system/status';

instance.interceptors.request.use((config) => {
  config.headers['request-startTime'] = process.hrtime();
  return config;
});

instance.interceptors.response.use((response) => {
  const start = response.config.headers['request-startTime'];
  const end = process.hrtime(start);
  const milliseconds = Math.round(end[0] * 1000 + end[1] / 1000000);
  response.headers['request-duration'] = milliseconds;
  return response;
});

(async () => {
  let sum = 0;

  for (let i = 0; i < 10; i++) {
    try {
      const resp = await instance.get(url);
      sum += resp.headers['request-duration'];
    } catch (err) {
      console.error(err);
    }
  }

  console.log(`Number of total ms ${sum}`);
  console.log(`Avg number of ms ${sum / 10}`);
})();
