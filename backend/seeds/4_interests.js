const faker = require('faker')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('interests').del()

  let interests = [
  {
    name: 'Weightlifting',
    skill_level: 'beginner',
    category: 'Strength Training'
  },
  {
    name: 'Crossfit',
    skill_level: 'beginner',
    category: 'Cardiovascular and Strength Training'
  },
  {
    name: 'Running',
    skill_level: 'intermediate',
    category: 'Cardiovascualar Training'
  },
  {
    name: 'Yoga',
    skill_level: 'advanced',
    category: 'Flexibility and Endurance'
  },
  {
    name: 'High-Intensity Interval Training',
    skill_level: 'intermediate',
    category: 'Cardiovascular and Endurance'
  },
  {
    name: 'Olympic Lifting',
    skill_level: 'advanced',
    category: 'Strength Training and Endurance'
  },
  {
    name: 'Swimming',
    skill_level: 'intermediate',
    category: 'Cardiovascular and Endurance'
  },
  {
    name: 'Dance Classes',
    skill_level: 'advanced',
    category: 'Cardiovascular and Endurance'
  },
  {
    name: 'Squats',
    skill_level: 'beginner',
    category: 'Strength Training'
  },
  {
    name: 'Deadlift',
    skill_level: 'advanced',
    category: 'Strength Training'
  }
]

  await knex('interests').insert(interests);
};
