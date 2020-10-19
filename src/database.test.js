/* eslint-disable no-undef */
const { databaseQuery } = require('./database');

test('Should return a promise', () => {
    var  input = 'db.ref().once("value")';
    var output = databaseQuery(input);

    expect(output instanceof Promise).toBe(true);
});

test('Should return an Error', () => {
    var  input = 'db.ref().once()';
    var output = databaseQuery(input);

    expect(output instanceof Error).toBe(true);
});