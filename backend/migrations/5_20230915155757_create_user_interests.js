/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_interests', table => {
    table.increments('id').primary()
    table.integer('user_id')
    table.foreign('user_id').references('users.id')
    table.integer('interest_id').notNullable().unique()
    table.integer('profile_id')
    table.foreign('profile_id').references('profile.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return(
    knex.schema
      .alterTable('user_interests', table => {
        table.dropForeign('profile_id'),
        table.dropForeign('user_id')})
    )
    return knex.schema.dropTableIfExists('user_interests')
};
