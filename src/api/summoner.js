const express = require("express");

const client = require("./redis");

const getSummonerInfo = require("./utils/getSummonerInfo");
const getMatchesByAccountId = require("./utils/getMatchesByAccountId");

require("dotenv").config();

const router = express.Router();

//* *************************TODO***********************************
// Changer le championFull pour le CDN au lieu d'utiliser le fichier
// Aller chercher la version/patch sur l'api
// Changer toute les paths qui demande la version
// Ajouter un dropdown pour sélectionner la région et faire en sorte que le url change par rapport au choix sélectionner.
// ajouter le path dans l'objet au lieu de l'hard coder dans la balise img
// Refaire le UI au complet mais juste avec Flexbox
// Changer toute les paths pour les images avec le nouveau cdn http://ddragon.canisback.com/
// Utiliser ex: Braum_30.png pour mettre a coté de chaque player des teams

const SUMMONNER_NAME_REGEXP = /[a-zA-Z][a-zA-Z0-9._ ]{3,32}/;

router.get("/:summonerName", async (req, res) => {
  const { summonerName } = req.params;

  if (!SUMMONNER_NAME_REGEXP.test(summonerName)) {
    return res.sendStatus(404);
  }

  try {
    client.get(summonerName, async (err, summonerInfo) => {
      if (summonerInfo) {
        return res.status(200).send(JSON.parse(summonerInfo));
      }

      const currentSummoner = await getSummonerInfo(summonerName);
      const summonerMatches = await getMatchesByAccountId(
        currentSummoner.puuid,
        0
      );

      const data = {
        summoner: currentSummoner,
        matches: summonerMatches,
      };

      client.setex(summonerName, 300, JSON.stringify(data));

      return res.status(200).send(data);
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      return res.status(404).send(err.message);
    }

    return res.status(404);
  }

  return res.status(404);
});

module.exports = router;
