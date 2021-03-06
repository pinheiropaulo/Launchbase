exports.up = function (knex, Promise) {
  return knex.schema.createTable("instructors", function (table) {
    table.increments("id");
    table.text("name").notNullable();
    table.text("avatar_url").notNullable();
    table.text("gender").notNullable();
    table.text("services").notNullable();
    table.text("birth").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("users");
};
