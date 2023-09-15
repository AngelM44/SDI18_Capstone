import { faker } from '@faker-js/faker';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, first_name: faker.person.firstName()},
    {id: 2, last_name: faker.person.lastName()},
    {id: 3, dod_id: 'rowValue3'}
  ]);
};
