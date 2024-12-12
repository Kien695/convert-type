import { taskRouter } from "./task.router";
import { userRouter } from "./user.router";
import { Express } from "express";
const mainV1Router = (app: Express): void => {
  const version = "/api/v1";
  app.use(version + "/task", taskRouter);
  app.use(version + "/user", userRouter);
};
export default mainV1Router;
