const express = require("express");

const router = express.Router();

const summoner = require("./summoner");

router.use("/summoner", summoner);

module.exports = router;
