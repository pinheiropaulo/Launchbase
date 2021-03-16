exports.up = function (knex, Promise) {
  return knex.schema.createTable("members", function (table) {
    table.increments("id");
    table.text("name");
    table.text("avatar_url");
    table.text("email");
    table.text("gender");
    table.timestamp("birth");
    table.text("blood");
    table.integer("weight");
    table.integer("height");
    table.integer("instructor_id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("members");
};
