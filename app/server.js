import express from "express";
import { errorHandler } from "./errorHandlers/errorHandler.js";
import router from "./routes/postRoute.js";
import { notFoundHandler } from "./errorHandlers/notFoundHandler.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(notFoundHandler);
app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
