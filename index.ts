import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as database from "./config/database";
import mainV1Router from "./api/v1/router/index.router";
dotenv.config();
database.connect();
const app: Express = express();
const port: string | number = process.env.PORT || 3000;
// const corsOptions = {
//   origin: "http://example.com",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mainV1Router(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// console.log("ok123");
