var express = require("express");
var router = express.Router();
var { getSalons, checkIfUserHasSalon } = require("../data/data-model");

router.get("/salons", async function (req, res, next) {
  try {
    const salons = await getSalons();
    res.status(201).send({ salons });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get(
  "/salons/checkIfUserHasSalon/:userId",
  async function (req, res, next) {
    try {
      const salonId = await checkIfUserHasSalon(req.params.userId);
      if (!salonId) throw error("User doesn't have a salon");
      res.status(200).send(salonId);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

module.exports = router;
