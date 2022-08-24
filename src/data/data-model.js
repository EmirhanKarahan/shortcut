const db = require("./db-config");

module.exports = {
  findUserByCredentials,
  findUserById,
  createUser,
  createAppointment,
  getSalons,
  getHairdressersBySalonId,
  getSalonServicesById,
  getAppointmentsByHairdresserId,
  getAppointmentsBySalonId,
  getAppointmentsByUserId,
  getSalonBySalonId,
  getHairdresserById,
  getServicesByAppointmentId,
  deleteAppointmentById,
  checkIfUserHasSalon,
  createRequestedService,
  getUserById
};

async function createUser({
  firstName,
  lastName,
  phoneNumber,
  email,
  password,
}) {
  user = db("Users").insert(
    { firstName, lastName, phoneNumber, email, password },
    ["*"]
  );
  return user;
}

async function createAppointment({ customerId, salonId, hairdresserId, date }) {
  appointment = db("Appointments").insert(
    { customerId, salonId, hairdresserId, date },
    ["*"]
  );
  return appointment;
}

async function getUserById(id){
  user = db("Users").where({ id }).first();
  return user
}

async function createRequestedService({ appointmentId, serviceId }) {
  const service = db("RequestedServices").insert({ appointmentId, serviceId }, "*");
  return service;
}

async function findUserByCredentials(email, password) {
  user = db("Users").where({ email, password }).first();
  return user;
}

async function findUserById(id) {
  user = db("Users").where({ id }).first();
  return user;
}

async function checkIfUserHasSalon(id) {
  salonId = db("Users")
    .where({ "Users.id": id })
    .join("Salons", "Salons.ownerId", "Users.id")
    .select(["Salons.id as salonId"])
    .first();
  return salonId;
}

async function getSalons() {
  return db("Salons");
}

async function getHairdressersBySalonId(salonId) {
  return db("Hairdressers").where({ salonId });
}

async function getAppointmentsByHairdresserId(hairdresserId) {
  return db("Appointments").where({ hairdresserId });
}

async function getAppointmentsBySalonId(salonId) {
  return db("Appointments")
    .where({ "Appointments.salonId": salonId })
    .join("Salons", "Appointments.salonId", "Salons.id")
    .join("Hairdressers", "Hairdressers.id", "Appointments.hairdresserId")
    .select([
      "Appointments.*",
      "Salons.id as salonId",
      "Salons.name as salonName",
      "Hairdressers.firstName as hairdresserFirstName",
      "Hairdressers.lastName as hairdresserLastName",
    ]);
}

async function getAppointmentsByUserId(userId) {
  return db("Appointments")
    .where({ customerId: userId })
    .join("Salons", "Appointments.salonId", "Salons.id")
    .join("Hairdressers", "Appointments.hairdresserId", "Hairdressers.id")
    .select([
      "Appointments.*",
      "Salons.id as salonId",
      "Salons.name as salonName",
      "Hairdressers.firstName as hairdresserFirstName",
      "Hairdressers.lastName as hairdresserLastName",
    ]);
}

async function deleteAppointmentById(id) {
  return db("Appointments").where({ id }).del();
}

async function getSalonServicesById(salonId) {
  return db("SalonServices").where({ salonId });
}

async function getSalonBySalonId(id) {
  return db("Salons").where({ id }).first();
}

async function getHairdresserById(id) {
  return db("Hairdressers").where({ id }).first();
}

async function getServicesByAppointmentId(id) {
  return db("RequestedServices")
    .where({ appointmentId: id })
    .join("SalonServices", "RequestedServices.serviceId", "SalonServices.id");
}
