/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('profile', table => {
    table.increments('id')
    table.string('profile_pic').notNullable()
    table.string('user_id').notNullable()
    table.string('availability').notNullable()
    table.string('info').notNullable()
    table.string('goals').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('profile')
};
