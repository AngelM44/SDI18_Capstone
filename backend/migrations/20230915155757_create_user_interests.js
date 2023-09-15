/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_interests', table => {
    table.increments('id')
    table.string('user_id').notNullable()
    table.string('interest_id').notNullable()
    table.string('profile_id').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_interests')
};
