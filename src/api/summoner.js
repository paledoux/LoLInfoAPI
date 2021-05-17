const express = require("express");

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
    // eslint-disable-next-line no-use-before-define
    const currentSummoner = await getSummonerInfo(summonerName);
    const summonerMatches = await getMatchesByAccountId(
      currentSummoner.accountId,
      0,
      10
    );

    return res.send({
      sunmmoner: currentSummoner,
      matches: summonerMatches,
    });
  } catch (err) {
    return res.sendStatus(404);
  }
});

module.exports = router;
