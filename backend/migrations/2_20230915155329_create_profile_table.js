/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('profile', table => {
    table.increments('id').primary()
    table.string('profile_pic').notNullable()
    table.integer('user_id').notNullable()
    table.foreign('user_id').references('id').inTable('users')
    table.string('availability').notNullable()
    table.string('info').notNullable()
    table.string('goals').notNullable()
    table.specificType('interests', 'integer[]')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('profile')
};
