exports.up = function (knex, Promise) {
  return knex.schema.createTable("members", function (table) {
    table.increments("id");
    table.text("name").notNullable();
    table.text("avatar_url").notNullable();
    table.text("email").notNullable();
    table.text("gender").notNullable();
    table.timestamp("birth").notNullable();
    table.text("blood").notNullable();
    table.integer("weight").notNullable();
    table.integer("height").notNullable();
    table.integer("instructor_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("members");
};
