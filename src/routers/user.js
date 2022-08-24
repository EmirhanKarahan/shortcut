var express = require("express");
var router = express.Router();
var {
  findUserByCredentials,
  createUser,
  getUserById,
} = require("../data/data-model");

router.post("/users", async function (req, res, next) {
  try {
    const user = await createUser(req.body);
    if (!user) throw error();
    res.status(201).send({ user:user[0] });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res, next) => {
  try {
    const user = await findUserByCredentials(req.body.email, req.body.password);
    if (!user) {
      throw error("User is not exist");
    }
    res.send({ user });
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/users/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      throw error("User is not exist");
    }
    res.status(400).send({ user });
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
