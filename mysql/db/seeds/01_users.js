/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, name: 'name one', email: 'test1@sample.com'},
    {id: 2, name: 'name two', email: 'test2@sample.com'},
    {id: 3, name: 'name three', email: 'test3@sample.com'}
  ]);
};
