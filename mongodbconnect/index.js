const express = require("express");
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const dbName = "unit6";
let db;
let collection;

(async function () {
  await client.connect();
  console.log("Connected successfully to server");
  db = client.db(dbName);
  collection = await db.collection("students");
})();

app.listen(3000, () => {
  console.log("Listening in 3000");
});

app.get("/api/students", async (req, res, next) => {
  const students = await collection.find({}).toArray();
  res.send(students);
});

app.get("/api/student/:id", async (req, res, next) => {
  const id = req.params.id;
  const student = await collection.find({ id: id }).toArray();
  res.send(student);
});

app.delete("/api/deleteStudent/:id", async (req, res, next) => {
  const id = req.params.id;
  await collection.findOneAndDelete({ id: id });
  const students = await collection.find({}).toArray();
  res.send(students);
});

app.post("/api/createStudent", async (req, res, next) => {
  const body = req.body;
  const students = await collection.find({}).toArray();
  const student = {
    id: students.length + 1,
    ...body,
  };
  await collection.insertOne(student);
  const updatedStudentsList = await collection.find({}).toArray();
  res.send(updatedStudentsList);
});

app.put("/api/updateStudent/:id", async (req, res, next) => {
  const body = req.body;
  const student = {
    id: req.params.id,
    ...body,
  };
  await collection.replaceOne({ id: req.params.id }, student);
  const updatedStudentsList = await collection.find({}).toArray();
  res.send(updatedStudentsList);
});
