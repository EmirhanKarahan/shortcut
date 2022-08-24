exports.up = function (knex) {
  return knex.schema.alterTable("Users", (table) => {
    table.unique("email");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("Users", (table) => {
    table.dropUnique("email");
  });
};
