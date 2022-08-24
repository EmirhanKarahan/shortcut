exports.up = function (knex) {
  return knex.schema
    .createTable("Salons", (table) => {
      table.increments();
      table.integer("ownerId").notNullable();
      table.string("name", 100).notNullable();
      table.string("mail").notNullable();
      table.string("phoneNumber").notNullable();
      table.string("latitude").notNullable();
      table.string("longitude").notNullable();
      table
        .foreign("ownerId")
        .references("Users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("Hairdressers", (table) => {
      table.increments();
      table.integer("salonId").notNullable();
      table.string("firstName").notNullable();
      table.string("lastName").notNullable();
      table.string("imageUrl");
      table
        .foreign("salonId")
        .references("Salons.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("SalonServices", (table) => {
      table.increments();
      table.integer("salonId").notNullable();
      table.string("serviceName").notNullable();
      table.integer("duration").notNullable();
      table.float("price").notNullable();
      table
        .foreign("salonId")
        .references("Salons.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("Salons")
    .dropTableIfExists("Hairdressers")
    .dropTableIfExists("SalonServices");
};
