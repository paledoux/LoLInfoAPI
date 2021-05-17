const api = require("./api");

async function getSummonerInfo(summonerName) {
  try {
    const response = await api.get(
      `summoner/v4/summoners/by-name/${summonerName}`
    );

    if (response) {
      return {
        id: response.data.id,
        name: response.data.name,
        profileIcon: response.data.profileIconId,
        level: response.data.summonerLevel,
        accountId: response.data.accountId,
      };
    }

    throw new Error();
  } catch (e) {
    throw new Error();
  }
}
module.exports = getSummonerInfo;
