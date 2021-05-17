const api = require("./api");

async function getMatchInfosByMatchId(matchId) {
  const id = parseInt(matchId, 10);
  if (id === 0) {
    throw new Error();
  }

  try {
    const response = await api.get(`match/v4/matches/${id}`);

    if (response) {
      return response.data;
    }
  } catch (e) {
    throw new Error();
  }
  throw new Error();
}

module.exports = getMatchInfosByMatchId;
