//Terminal
//mysqld
//mysql -u root

const mysql = require("mysql2");

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Update with your MySQL username
  password: "password", // Update with your MySQL password
  database: "testdb", // Update with your database name
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL");

  // Create a new database
  connection.query("CREATE DATABASE IF NOT EXISTS testdb", (err, results) => {
    if (err) {
      console.error("Error creating database:", err.message);
      return;
    }
    console.log("Database created or already exists");

    // Use the new database
    connection.changeUser({ database: "testdb" }, (err) => {
      if (err) {
        console.error("Error changing database:", err.message);
        return;
      }

      // Create a new table
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL
        )
      `;
      connection.query(createTableQuery, (err, results) => {
        if (err) {
          console.error("Error creating table:", err.message);
          return;
        }
        console.log("Table created or already exists");

        // Insert data into the table
        const insertDataQuery = `
          INSERT INTO users (name, email)
          VALUES ('John Doe', 'john.doe@example.com'), ('Jane Smith', 'jane.smith@example.com')
        `;
        connection.query(insertDataQuery, (err, results) => {
          if (err) {
            console.error("Error inserting data:", err.message);
            return;
          }
          console.log("Data inserted");

          // Query data from the table
          const selectDataQuery = "SELECT * FROM users";
          connection.query(selectDataQuery, (err, results) => {
            if (err) {
              console.error("Error querying data:", err.message);
              return;
            }
            console.log("Data queried:", results);

            // Close the connection
            connection.end((err) => {
              if (err) {
                console.error("Error closing connection:", err.message);
                return;
              }
              console.log("Connection closed");
            });
          });
        });
      });
    });
  });
});
