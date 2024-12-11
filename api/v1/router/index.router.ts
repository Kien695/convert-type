import { taskRouter } from "./task.router";
import { Express } from "express";
const mainV1Router = (app: Express): void => {
  const version = "/api/v1";
  app.use(version + "/task", taskRouter);
};
export default mainV1Router;
