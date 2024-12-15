const { spawn } = require("child_process");

// Full path to the mysqld binary
const startCommand = "mysqld"; // Update this path as necessary

// Spawn the mysqld process
const mysqlProcess = spawn(startCommand, [], {
  detached: true,
  stdio: "ignore",
});

// Detach the process and let it run in the background
mysqlProcess.unref();

console.log("MySQL server started");
