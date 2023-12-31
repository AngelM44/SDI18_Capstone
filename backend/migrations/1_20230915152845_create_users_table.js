/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('first_name', 255).notNullable()
      table.string('last_name', 255).notNullable()
      table.string('dod_id', 10).notNullable()
      table.string('username', 255).notNullable()
      table.string('password', 225).notNullable()
      table.string('email', 255).notNullable()
      table.string('location', 255).notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
}
