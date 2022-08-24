exports.up = function (knex) {
    return knex.schema.alterTable("Appointments", (table) => {
      table.timestamp("date").alter();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable("Appointments", (table) => {
        table.date("date").alter();
    });
  };
  