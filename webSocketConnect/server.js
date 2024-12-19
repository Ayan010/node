const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log(`Received: ${message}`);
    // Broadcast the message to all connected clients
    server.clients.forEach((client) => {
      console.log("client ==> ", client);
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
