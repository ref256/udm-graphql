import { getFirstName, isValidPassword } from '../src/utils/user';

test('Should return first name when given full name', () => {
  const firstName = getFirstName('Andrew Mead');

  expect(firstName).toBe('Andrew');
});

test('Should return first name when given first name', () => {
  const firstName = getFirstName('Jess');

  expect(firstName).toBe('Jess');
});

test('Should reject password which is shorter than 8 characters', () => {
  const isValid = isValidPassword('pass123');

  expect(isValid).toBe(false);
});

test('Should reject password that contains word password', () => {
  const isValid = isValidPassword('AbcPassword222');

  expect(isValid).toBe(false);
});

test('Should correctly validate a valid password', () => {
  const isValid = isValidPassword('mysuperpass');

  expect(isValid).toBe(true);
});
