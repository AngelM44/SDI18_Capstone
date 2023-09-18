const faker = require('faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('profile').del()

  const profiles = []

  for (let i = 1; i <= 20; i++){
    profiles.push({
      id: i,
      profile_pic: `../frontend/public/profile_pics/profile-pic${i}.png`,
      user_id: i,
      availability: faker.random.arrayElement(["Days", "Afternoons", "Nights", "Weekends Only"]),
      info: faker.random.arrayElement(["I have always wanted to learn how to deadlift, looking for a gym partner to help me learn safely", "I enjoy weightlifting", "I need help preparing for the PT test.", "I enjoy running."]),
      goals: faker.random.arrayElement(["I want to gain 10 pounds of muslce", "I have always wanted abs and could use a gym partner who can help show me the way", "I want to lose 20 pounds for next summer", "I want to get 100 on my next PT test"])
    })
  }

  await knex('profile').insert(profiles);
};
