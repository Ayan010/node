const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen("3000", () => {
  console.log("Listening in port 3000");
});

app.get("/", (req, res, next) => {
  res.send("Hello");
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Update with your MySQL username
  password: "password", // Update with your MySQL password
  database: "testdb", // Update with your database name
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

const readRecords = () => {
  const query = "SELECT * FROM users";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getUserDetail = (id) => {
  const query = `SELECT * FROM users WHERE id = ${id}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const createRecord = (id, name, email) => {
  const query = `INSERT INTO users (id , name , email) VALUES (${id}, '${name}', '${email}' )`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const updateRecord = (id, name, email) => {
  const query = `UPDATE users SET name = '${name}', email = '${email}' WHERE id = ${id}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const deleteRecord = (id) => {
  const query = `DELETE FROM users WHERE id = ${id}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

app.get("/users", async (req, res, next) => {
  const results = await readRecords();
  res.send(results);
});

app.get("/user/:id", async (req, res, next) => {
  const results = await getUserDetail(parseInt(req.params.id));
  res.send(results);
});

app.post("/createUser", async (req, res, next) => {
  const payload = req.body;
  const results = await createRecord(payload.id, payload.name, payload.email);
  res.send(results);
});

app.put("/updateUser/:id", async (req, res, next) => {
  const payload = req.body;
  const id = parseInt(req.params.id);
  const results = await updateRecord(id, payload.name, payload.email);
  res.send(results);
});

app.delete("/deleteUser/:id", async (req, res, next) => {
  const results = await deleteRecord(parseInt(req.params.id));
  res.send(results);
});
