const { assert } = require('chai');

const { getUserByEmail } = require('../helpers.js');

const testUsers = {
  "dm3": {
    user_id: "dm3",
    email: "1@1.com",
    //change to 'hash' later (ln 141)
    password: "1"
  },
  "Kakao": {
    user_id: "Kakao",
    email: "2@2.com",
    password: "2"
  }
};

const testUrlDatabase = {
  "b2xVn2": {longURL: "http://www.lighthouselabs.ca", user_id: "dm3"},
  "9sm5xK": {longURL: "http://www.google.com", user_id: "dm3"},
  "b6UTxQ": {longURL: "https://www.tsn.ca", user_id: "dm3"},
  "i3BoGr": {longURL: "https://www.google.ca", user_id: "dm3"}
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = getUserByEmail("user@example.com", users)
    const expectedOutput = "userRandomID";
    // Write your assert statement here
  });
});

describe('generateRandomString', function() {
  it('should return a randomised string length when run', function() {
    const generateString = generateRandomString();
    const expectedOutput = 8;
    assert.equal(generateString, expectedOutput);
  });
});

describe('emailChecker', function() {
  it('should return a user with valid email', function() {
    const user = emailChecker("1@1.com", users)
    const expectedOutput = "1@1.com";
    assert.equal(user, expectedOutput)
  });

  it('should return an error when email exists but passwor wasn\'t implemented', function() {
    const user = emailChecker("1@2.com", users)
    const expectedOutput = res.status(400).send(`400 Bad Request. ${email} is already registered. Please use it to log in.`);
    assert.equal(user, expectedOutput)
  });
});

describe('urlsForUser', function() {
  it('should return a list of URLS if signed in', function() {
    const testUrls = getUserByEmail("user@example.com", 'dm3')
    const expectedOutput = "Error 401. You are unauthorised to make changes here. Log in in order to do so.";
    assert.equal (testUrls, expectedOutput)
  });
});