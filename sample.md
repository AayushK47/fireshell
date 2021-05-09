# How to prepare the input file for firerun command

You just need to follow these rules:-

- Each query should start with -> **//# /< name of the query > ->**
- Queries must be separated with the delimiter -> **---**

Here is a sample:-

```
//# query 1 ->

db
.collection('user')
.get()

---

//# query 2 ->

db
.collection('user')
.get()

---

//# query 3 ->

db
.collection('user')
.get()
```