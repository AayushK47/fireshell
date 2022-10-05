/* eslint-disable no-undef */
const fs = require('fs');
const { firerun } = require('./firerun');

test('', () => {
    fs.writeFileSync('./test1.txt', 
`
//# query 1 ->

db
.collection("user")
.doc("n5yXhuyCD5hSLrpC6xli")
.get()

---

//# query 2 ->

db
.collection("test")
.add({
    name: "Aman Jaiswal", 
    alias: "Rajkumar"
})

---

//# query 3 ->

db
.collection("test1")
.get()
`);

  firerun('./test1.txt', './output1.txt');
  setTimeout(() => {
    const data = fs.readFileSync('./output1.txt', 'utf8');
    expect(data).toBe("\n//# query 1 ->\n{\n  \"data\": {\n    \"name\": \"Aayush Kurup\",\n    \"alias\": \"AayushK47\"\n  },\n  \"message\": \"Query execution successful\"\n}\n\n//# query 2 ->\n{\n  \"data\": \"Query execution successful.\",\n  \"message\": \"Query execution successful\"\n}\n\n//# query 3 ->\n{\n  \"data\": \"No documents found\",\n  \"message\": \"Query execution successful\"\n}\n");
    fs.unlinkSync('./output1.txt');
    fs.unlinkSync('./test1.txt');
  }, 10000);
})