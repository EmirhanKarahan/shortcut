var express = require("express");
var router = express.Router();
var { getSalonServicesById } = require("../data/data-model");

router.get("/getSalonServicesById/:salonId", async function (req, res, next) {
  try {
    const salonServices = await getSalonServicesById(req.params.salonId);
    res.send({ salonServices });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
