exports.up = function (knex) {
  return knex.schema.alterTable("Appointments", (table) => {
    table.dropColumn("finishingDate");
    table.renameColumn("startingDate", "date");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("Appointments", (table) => {
    table.renameColumn("date", "startingDate");
    table.date("finishingDate").notNullable();
  });
};
