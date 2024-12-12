import { taskRouter } from "./task.router";
import { userRouter } from "./user.router";
import { Express } from "express";
import * as authMiddleware from "../middleware/auth.middleware";
const mainV1Router = (app: Express): void => {
  const version = "/api/v1";
  app.use(version + "/task", authMiddleware.requireAuth, taskRouter);
  app.use(version + "/user", userRouter);
};
export default mainV1Router;
