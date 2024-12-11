import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import mainV1Router from "./api/v1/router/index.router";
dotenv.config();
database.connect();
const app: Express = express();
const port: string | number = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mainV1Router(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// console.log("ok123");
