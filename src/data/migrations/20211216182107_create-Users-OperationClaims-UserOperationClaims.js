exports.up = function (knex) {
    return knex.schema
      .createTable("Users", (table) => {
        table.increments();
        table.string("firstName", 100).notNullable();
        table.string("lastName", 100).notNullable();
        table.string("email").notNullable();
        table.string("phoneNumber", 15).notNullable();
        table.string("password").notNullable();
      })
      .createTable("OperationClaims", (table) => {
        table.increments(); // primary key, auto increment, not-nullable
        table.string("name", 100).notNullable(); // table.string("property", MAX_SIZE)
      })
      .createTable("UserOperationClaims", (table) => {
        table.increments();
        table.integer("userId").unsigned().notNullable();
        table.integer("operationClaimId").unsigned().notNullable();
        table
          .foreign("userId")
          .references("Users.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .foreign("operationClaimId")
          .references("OperationClaims.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
      });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("Users").dropTableIfExists("OperationClaims").dropTableIfExists("UserOperationClaims");
  };