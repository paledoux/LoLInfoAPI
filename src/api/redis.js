// eslint-disable-next-line import/prefer-default-export
const redis = require("redis");

const client = redis.createClient(6379);

client.on("error", (error) => {
  // eslint-disable-next-line no-console
  console.error(error);
});

module.exports = client;
