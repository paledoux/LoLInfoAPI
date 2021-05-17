const api = require("./api");
const getMatchInfosByMatchId = require("./getMatchInfosByMatchId");

async function getMatchesByAccountId(accoundId, indexStart, indexEnd) {
  if (accoundId === "") {
    throw new Error();
  }

  if (typeof indexStart === "undefined") {
    indexStart = 0;
  }
  if (typeof indexEnd === "undefined") {
    indexEnd = 5;
  }

  try {
    const response = await api.get(
      `match/v4/matchlists/by-account/${accoundId}?endIndex=${indexEnd}&beginIndex=${indexStart}`
    );

    if (response) {
      return Promise.all(
        response.data.matches.map(async (match) => ({
          matchInfo: match,
          // championInfo: await getChampionInfosById(match.champion),
          matchInfoComplete: await getMatchInfosByMatchId(match.gameId),
        }))
      );
    }
  } catch (e) {
    throw new Error();
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
