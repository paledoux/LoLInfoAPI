const axios = require("axios");

const apiKey = process.env.API_KEY;

async function getSummonerInfo(summonerName) {
  try {
    const response = await axios.get(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
      {
        headers: {
          "X-Riot-Token": apiKey,
        },
      }
    );

    if (response) {
      return {
        id: response.data.id,
        name: response.data.name,
        profileIcon: response.data.profileIconId,
        level: response.data.summonerLevel,
        accountId: response.data.accountId,
        puuid: response.data.puuid,
      };
    }

    throw new Error();
  } catch (e) {
    throw new Error(e.message);
  }
}
module.exports = getSummonerInfo;
