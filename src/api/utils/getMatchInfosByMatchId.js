const axios = require("axios");

const apiKey = process.env.API_KEY;

async function getMatchInfosByMatchId(matchId) {
  try {
    const response = await axios.get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`,
      {
        headers: {
          "X-Riot-Token": apiKey,
        },
      }
    );

    if (response) {
      return response.data.info;
    }
    throw new Error();
  } catch (e) {
    return null;
    // throw new Error(e.message);
  }
}

module.exports = getMatchInfosByMatchId;
