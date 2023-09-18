const faker = require('faker')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('interests').del()

  let interests = []

  for(let i = 1; i <= 20; i++){
    interests.push({
      name: faker.random.arrayElement(["Weightlifting", "Swimming", "Basketball", "Soccer", "Crossfit", "Surfing", "Snowboarding", "Skiing"]),
      skill_level: faker.random.arrayElement(["Beginner", "Intermidiate", "Advanced"]),
      category: faker.random.arrayElement(["Cardio", "Weightlifting"]),
    })
  }

  await knex('interests').insert(interests);
};
