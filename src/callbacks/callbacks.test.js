/* eslint-disable no-undef */
const { setConfigCallback, resetCallback } = require('./callbacks');
const fs = require('fs');

test('Test for setConfigCallback function with firestore config', () => {
    setConfigCallback('/home/aayushk47/fireshell/fb.json', 'firestore', {}, undefined);
    expect(fs.readdirSync(__dirname + '/../')).toContain('config.json');
});

test('Test for setConfigCallback function with database config', () => {
    setConfigCallback('/home/aayushk47/fireshell/fb.json', 'database', {}, ['https://fireshell-test.firebaseio.com/']);
    expect(fs.readdirSync(__dirname + '/../')).toContain('config.json');
});

test('Test for resetCallback', () => {
    resetCallback()
    expect(fs.readdirSync(__dirname + '/../')).not.toContain('config.json');
});