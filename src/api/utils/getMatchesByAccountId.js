const axios = require("axios");

const getMatchInfosByMatchId = require("./getMatchInfosByMatchId");

const apiKey = process.env.API_KEY;

async function getMatchesByAccountId(puuid, indexStart) {
  if (puuid === "") {
    throw new Error();
  }

  if (typeof indexStart === "undefined") {
    indexStart = 0;
  }

  try {
    const response = await axios.get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`,
      {
        headers: {
          "X-Riot-Token": apiKey,
        },
      }
    );

    if (response) {
      const data = Promise.all(
        response.data.map(async (match) => {
          // championInfo: await getChampionInfosById(match.champion),
          const info = await getMatchInfosByMatchId(match);

          return info;
        })
      );

      return (await data).filter((x) => !!x);
    }
  } catch (e) {
    throw new Error(e.message);
  }
  throw new Error();
}
module.exports = getMatchesByAccountId;

//   const matches = await Request(options).then((repos) => {
//     const response = JSON.parse(repos);
//     return Promise.all(
//       response.matches.map(async (match) => ({
//         matchInfo: match,
//         // championInfo: await getChampionInfosById(match.champion),
//         matchInfoComplete: await getMatchInfosByMatchId(match.gameId),
//       }))
//     );
//   });

//   return {
//     startIndex: indexStart,
//     endIndex: indexEnd,
//     version: championFull.version,
//     matches,
//   };
// }

// async function getChampionInfosById(championId) {
//   const championFullKeys = championFull.keys;
//   let championName = "";

//   if (championFullKeys.hasOwnProperty(championId)) {
//     championName = championFullKeys[championId];
//   }
//   return championFull.data[championName];
// }
