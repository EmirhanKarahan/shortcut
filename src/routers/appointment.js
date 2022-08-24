var express = require("express");
var router = express.Router();
var {
  getAppointmentsByHairdresserId,
  getAppointmentsBySalonId,
  getAppointmentsByUserId,
  deleteAppointmentById,
  getSalonBySalonId,
  getHairdresserById,
  getServicesByAppointmentId,
  createAppointment,
  createRequestedService
} = require("../data/data-model");

router.post("/appointments", async function (req, res, next) {
  try {
    const appointment = await createAppointment(req.body);
    res.status(201).send({ appointment:appointment[0] });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/appointments/:id", async function (req, res, next) {
  try {
    const appointment = await deleteAppointmentById(req.params.id);
    res.send({ appointment });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get(
  "/getAppointmentsByHairdresserId/:hairdresserId",
  async function (req, res, next) {
    try {
      const appointments = await getAppointmentsByHairdresserId(
        req.params.hairdresserId
      );
      res.send({ appointments });
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.get(
  "/getAppointmentsBySalonId/:salonId",
  async function (req, res, next) {
    try {
      const appointments = await getAppointmentsBySalonId(req.params.salonId);
      res.send({ appointments });
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.get("/getAppointmentsByUserId/:userId", async function (req, res, next) {
  try {
    const appointments = await getAppointmentsByUserId(req.params.userId);
    res.send({ appointments });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get(
  "/getServicesByAppointmentId/:appointmentId",
  async function (req, res, next) {
    try {
      const services = await getServicesByAppointmentId(
        req.params.appointmentId
      );
      res.send({ services });
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.post("/createRequestedService", async function (req, res, next) {
  try {
    const requestedService = await createRequestedService(req.body);
    res.status(201).send({ requestedService:requestedService[0] });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
