import { Request, Response } from "express";
import Task from "../models/task.model";
//[get] api/v1/task/
export const index = async (req: Request, res: Response) => {
  const find = {
    deleted: false,
  };
  if (req.query.status) {
    find["status"] = req.query.status;
  }
  const task = await Task.find(find);

  res.json(task);
};
//[get] api/v1/task/detail/:id
export const detail = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const task = await Task.findOne({
    _id: id,
    deleted: false,
  });

  res.json(task);
};
