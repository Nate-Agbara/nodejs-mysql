import { expect } from '@jest/globals';
import { createUser } from '../../src/controller/userController';
import knex from 'knex';


jest.mock('knex');

describe('userController tests', () => {

//   beforeAll(() => {
//     tracker = getTracker();
//   });

//   afterEach(() => {
//     tracker.reset();
//   });

  it('should add new user', async () => {

    // const spy = jest.spyOn(knex, 'insert');
    // spy.mockResolvedValue(GetContactsSuccessResponse);

    const newUser = { name: 'foo bar', email: 'test@test.com' };
  const result = createUser(newUser);
console.log(result);
    // const insertId = faker.datatype.number();
    // tracker.on.insert('users').response([insertId]);
    
    
    // const data = await createUser(newUser);

    // expect(data.id).toEqual(insertId);

    // const insertHistory = tracker.history.insert;
    expect(knex.insert).toBeCalledTimes(1);
    // expect(insertHistory).toHaveLength(1);
    // expect(insertHistory[0].method).toEqual('insert');
    // expect(insertHistory[0].bindings).toEqual([newUser.name, newUser.email]);
  });
});