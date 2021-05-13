/* eslint-disable no-undef */
const { setConfigCallback, resetCallback } = require('./callbacks');
const fs = require('fs');

afterEach(() => {
    setConfigCallback('https://fireshell-test.firebaseio.com/', '/home/aayushk47/fireshell/fb.json', {}, ['database']);
});

test('Test for setConfigCallback function with firestore config', () => {
    setConfigCallback('/home/aayushk47/fireshell/fb.json', 'firestore', {}, undefined);
    setTimeout(() => expect(fs.readdirSync(__dirname + '/../')).toContain('config.json'), 10000)
});

test('Test for setConfigCallback function with database config', () => {
    setConfigCallback('/home/aayushk47/fireshell/fb.json', 'database', {}, ['https://fireshell-test.firebaseio.com/']);
    expect(fs.readdirSync(__dirname + '/../')).toContain('config.json');
});

test('Test for resetCallback', () => {
    resetCallback()
    setTimeout(() => expect(fs.readdirSync(__dirname + '/../')).not.toContain('config.json'), 10000);
});