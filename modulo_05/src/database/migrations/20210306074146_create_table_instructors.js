exports.up = function (knex, Promise) {
  return knex.schema.createTable("instructors", function (table) {
    table.increments("id");
    table.text("name");
    table.text("avatar_url");
    table.text("gender");
    table.text("services");
    table.text("birth");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("users");
};
