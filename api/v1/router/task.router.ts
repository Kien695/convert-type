import { Router, Request, Response } from "express";
const router: Router = Router();
import Task from "../../../models/task.model";

router.get("/", async (req: Request, res: Response) => {
  const task = await Task.find({
    deleted: false,
  });

  res.json(task);
});
router.get("/detail/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const task = await Task.findOne({
    _id: id,
    deleted: false,
  });

  res.json(task);
});
export const taskRouter: Router = router;
