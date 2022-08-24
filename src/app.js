const express = require("express");
const userRouter = require("./routers/user");
const salonServiceRouter = require("./routers/salonService");
const salonRouter = require("./routers/salon");
const hairdresserRouter = require("./routers/hairdresser");
const appointmentRouter = require("./routers/appointment");

const app = express();
app.use(express.json());

app.use(userRouter);
app.use(salonServiceRouter);
app.use(salonRouter);
app.use(hairdresserRouter);
app.use(appointmentRouter);

module.exports = app;
