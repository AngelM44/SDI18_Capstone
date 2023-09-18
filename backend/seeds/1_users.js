const faker = require('faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  const users = []

  for (let i = 1; i<= 20; i++){
    users.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      dod_id: faker.datatype.number({ min: 1000000000, max: 2147483647 }),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      location: 'Peterson Space Force Base',
    })
  }

  await knex('users').insert(users)
};
