const http = require("http");
const url = require("url");

const server = http.createServer((req, resp) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log(pathname);
  console.log(query);

  if (pathname === "/") {
    resp.end("Hello Node JS !!!!");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on port 3000");
});
