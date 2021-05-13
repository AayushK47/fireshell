/* eslint-disable no-undef */
const { processQuery } = require('./query');

test('should execute and show output - database read query', done => {
    processQuery('db.ref().once("value")', 'database').then(data => {
        expect(data).toEqual({
            "posts": {
                "android-arch-3": {
                    "author": "Doug",
                    "metrics": {
                        "likes": 18721,
                        "shares": 77182,
                        "views": 200000
                    },
                    "title": "Using Android Architecture Components with Firebase Realtime Database (Part 3)"
                },
                "node js": {
                    "author": "Aayush Kurup",
                    "metrics": {
                        "likes": 12123,
                        "shares": 9881,
                        "views": 1299812
                    },
                    "title": "An Introduction to Node js"
                },
                "pytorch": {
                    "author": "Aayush Kurup",
                    "metrics": {
                        "likes": 12123,
                        "shares": 9881,
                        "views": 1299812
                    },
                    "title": "An Introduction to the most popular deep learning library - Pytorch"
                },
                "ts-functions": {
                    "author": "Doug",
                    "metrics": {
                        "likes": 12000,
                        "shares": 7861,
                        "views": 1200000
                    },
                    "title": "Why you should use TypeScript for writing Cloud Functions"
                }
            }
        });
        done();
    });
});

test('should execute and return that the query was executed successfully - database write query', done => {
    processQuery('db.ref().child("posts").child("node js").set({ "author": "Aayush Kurup", "metrics": { "likes": 12123, "shares": 9881, "views": 1299812 }, "title": "An Introduction to Node js"})', 'database').then(data => {
        expect(data).toBe("Query execution successful.");
        done();
    });
});

test('should return an error - database error', () => {
    var output = processQuery('db.ref().once()', 'database');
    expect(output instanceof Error).toBe(true);
});



test('should run and return the correct output - firestore reading collection query', done => {
    processQuery('db.collection("user").get()', 'firestore').then(data => {
        expect(data).toEqual({
            PCoDMxmnzzaC1rNe9t4s: { name: 'Yash Kurup', alias: 'AshYash' },      
            TBbQK6unzMflkDZDEyBM: { name: 'Vishnu Devarshi Nair', alias: 'DKT' },
            jABMk75FEu0tiCIEaIcw: { name: 'Aman Jaiswal', alias: 'Rajkumar' },   
            n5yXhuyCD5hSLrpC6xli: { name: 'Aayush Kurup', alias: 'AayushK47' }   
        });
        done();
    });
});

test('should run and return the correct output - firestore reading a doc query', done => {
    processQuery('db.collection("user").doc("n5yXhuyCD5hSLrpC6xli").get()', 'firestore').then(data => {
        expect(data).toEqual({
            "name": "Aayush Kurup",
            "alias": "AayushK47"
        });
        done();
    });
})

test('should return an error - firestore error', () => {
    var output = processQuery('db.ref().once()', 'firestore')
    expect(output instanceof Error).toBe(true);
});

test('should execute and return that the query was executed successfully - firestore write query', done => {
    processQuery('db.collection("test").add({name: "Aman Jaiswal", alias: "Rajkumar"})', 'firestore').then(data => {
        expect(data).toBe("Query execution successful.");
        done();
    });
});

test('should run and return the correct output - firestore overwriting query', done => {
    processQuery('db.collection("user").doc("n5yXhuyCD5hSLrpC6xli").set({ "name": "Aayush Kurup", "alias": "AayushK47" })', 'firestore').then(data => {
        expect(data).toEqual("Query execution successful.");
        done();
    });
});

test('should run and return the correct output - firestore reading empty collection', done => {
    processQuery('db.collection("test1").get()', 'firestore').then(data => {
        expect(data).toEqual("No documents found");
        done();
    });
});