const faker = require('faker')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()

  const posts = []
  for (let i = 1; i <= 20; i++){
    posts.push({
      profile_id: faker.random.number({min:1, max:20}),
      date_created: faker.date.past(),
      body: faker.random.arrayElement([`After ${i} months of training, I got my mile down to 6 minutes!`, `I just hit my goal of losing ${i} pounds!`, `Excercising with friends is a lot of fun, I am starting to see my stamina and strength improving!`, `Just completed my very first ${i}K run today! Started with shorter distances, but today I pushed through and reached this milestone. Feeling accomplished and motivated to keep going!`, `Hard work pays off! Hit a new personal record today on the bench press: ${i} pounds! 🎉 Thanks to my workout buddies for the support and motivation. Onward and upward!`, " Can't believe it's been a whole year of practicing yoga regularly. Seeing the transformation in my flexibility and inner peace is incredible. Grateful for this journey!"]),
    })
  }

  await knex('posts').insert(posts);
};
