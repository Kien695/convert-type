import { Router } from "express";
const router: Router = Router();

import * as controller from "../controller/user.controller";
router.post("/register", controller.register);

export const userRouter: Router = router;
