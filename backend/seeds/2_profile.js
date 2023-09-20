const faker = require('faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('profile').del()

  const profiles = []
  const makeRandomArray = () => {
    const howManyInterests = Math.floor(Math.random() * 4)
    const insertInterests = []
    for (let i = 0; i < howManyInterests; i++){
      const interests = Math.floor(Math.random() * (10) + 1)
      insertInterests.push(interests)
    }
    return insertInterests
  }

  for (let i = 1; i <= 20; i++){
    profiles.push({
      profile_pic: `../profile_pics/profile-pic${i}.png`,
      user_id: i,
      availability: faker.random.arrayElement(["Days", "Afternoons", "Nights", "Weekends Only"]),
      info: faker.random.arrayElement(["I have always wanted to learn how to deadlift, looking for a gym partner to help me learn safely", "I enjoy weightlifting", "I need help preparing for the PT test.", "I enjoy running."]),
      goals: faker.random.arrayElement(["I want to gain 10 pounds of muslce", "I have always wanted abs and could use a gym partner who can help show me the way", "I want to lose 20 pounds for next summer", "I want to get 100 on my next PT test"]),
      interests: makeRandomArray(),
    })
  }

  await knex('profile').insert(profiles);
};
