var express = require("express");
var router = express.Router();
var { getHairdressersBySalonId } = require("../data/data-model");

router.get("/getHairdressersBySalonId/:salonId", async function (req, res, next) {
  try {
    const hairdressers = await getHairdressersBySalonId(req.params.salonId);
    res.send({ hairdressers });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;