exports.up = function (knex) {
    return knex.schema
      .createTable("Appointments", (table) => {
        table.increments();
        table.integer("customerId").notNullable();
        table.integer("salonId").notNullable();
        table.integer("hairdresserId").notNullable();
        table.date("startingDate").notNullable();
        table.date("finishingDate").notNullable();
        table
          .foreign("customerId")
          .references("Users.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .foreign("salonId")
          .references("Salons.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .foreign("hairdresserId")
          .references("Hairdressers.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      })
      .createTable("RequestedServices", (table) => {
        table.increments();
        table.integer("appointmentId").notNullable();
        table.integer("serviceId").notNullable();
        table
          .foreign("appointmentId")
          .references("Appointments.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .foreign("serviceId")
          .references("SalonServices.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      });
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists("Appointments")
      .dropTableIfExists("RequestedServices");
  };