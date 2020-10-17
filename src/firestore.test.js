/* eslint-disable no-undef */
const { firestoreQuery } = require('./firestore');

test('Should return a promise', () => {
    var  input = 'db.collection("user").get()';
    var output = firestoreQuery(input);

    expect(output instanceof Promise).toBe(true);
});

test('Should return an Error', () => {
    var  input = 'db.collections("user").get()';
    var output = firestoreQuery(input);

    expect(output instanceof Error).toBe(true);
});