import { Request, Response } from "express";
import Task from "../models/task.model";
//[get] api/v1/task/
export const index = async (req: Request, res: Response) => {
  //find
  const find = {
    deleted: false,
  };
  if (req.query.status) {
    find["status"] = req.query.status;
  }
  //end find
  //sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey.toLocaleString();
    sort[sortKey] = req.query.sortValue;
  }
  //end sort
  const task = await Task.find(find).sort(sort);

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
