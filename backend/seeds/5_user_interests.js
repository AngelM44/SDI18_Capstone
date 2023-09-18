const faker = require('faker')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_interests').del()

  const interests = []

  for(let i = 1; i <= 20; i++){
    // Generate random interests from 1 to 4
    let numberOfEntries = faker.datatype.number({ min: 1, max: 4 });
    let entries = [];

    // Generate an array of unique random numbers from 1 to 20
    while (entries.length < numberOfEntries) {
      let randomNumber = faker.random.number({ min: 1, max: 20 });
      if (!entries.includes(randomNumber)) {
        entries.push(randomNumber);
      }
    }

    interests.push({
      user_id: i,
      interest_id: i,
      profile_id: i,
    })
  }

  await knex('user_interests').insert(interests);
};
