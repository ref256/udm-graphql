import 'cross-fetch/polyfill';
import prisma from '../src/prisma';
import getClient from './utils/getClient';
import seedDatabase, { userOne } from './utils/seedDatabase';
import { createUser, getUsers, login, getProfile } from './utils/userOperations';

const client = getClient();

beforeEach(seedDatabase);

// test('Should create a new user', async () => {
//   const variables = {
//     data: {
//       name: 'Andrew',
//       email: 'andrew@example.com',
//       password: 'pass1234'
//     }
//   };

//   const response = await client.mutate({ mutation: createUser, variables });
//   const userExists = await prisma.exists.User({ id: response.data.createUser.user.id });

//   expect(userExists).toBe(true);
// });

// test('Should expose public author profiles', async () => {
//   const response = await client.query({ query: getUsers });

//   expect(response.data.users.length).toBe(2);
//   expect(response.data.users[0].email).toBe(null);
// });

// test('Should not login with bad credentials', async () => {
//   const variables = {
//     data: {
//       email: 'jen@example.com',
//       password: 'pppp111'
//     }
//   };

//   await expect(
//     client.mutate({ mutation: login, variables })
//   ).rejects.toThrow();
// });

// test('Should not signup user with short password', async () => {
//   const variables = {
//     data: {
//       name: 'Saraha',
//       email: 'saraha@example.com',
//       password: 'pass123'
//     }
//   };

//   await expect(
//     client.mutate({ mutation: createUser, variables })
//   ).rejects.toThrow();
// });

// test('Should fetch user profile', async () => {
//   const client = getClient(userOne.jwt);
//   const { data } = await client.query({ query: getProfile });

//   expect(data.me.id).toBe(userOne.user.id);
//   expect(data.me.name).toBe(userOne.user.name);
//   expect(data.me.email).toBe(userOne.user.email);
// });
