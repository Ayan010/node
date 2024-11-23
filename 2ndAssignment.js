var fs = require("fs");
const path = require("path");

async function readingDirectory(directory) {
  const fileNames = await fs.promises.readdir(directory);
  for (let file of fileNames) {
    const absolutePath = path.join(directory, file);
    console.log(absolutePath);
  }
}

readingDirectory("./folder")
  .then(() => {
    console.log("all done");
  })
  .catch((err) => {
    console.log(err);
  });
