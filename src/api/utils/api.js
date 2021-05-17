const axios = require("axios");

const apiKey = process.env.API_KEY;

const api = axios.create({
  baseURL: "https://na1.api.riotgames.com/lol/",
  timeout: 20000,
  headers: {
    "X-Riot-Token": apiKey,
  },
});

module.exports = api;
