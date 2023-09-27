/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('posts', table => {
    table.increments('id')
    table.integer('profile_id', 255).notNullable()
    table.foreign('profile_id').references('profile.id')
    table.timestamp('date_created').notNullable()
    table.string('body').notNullable()
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return(
  knex.schema
    .alterTable('posts', table => {table.dropForeign('profile_id')})
    .dropTableIfExists('posts')
  )
};
