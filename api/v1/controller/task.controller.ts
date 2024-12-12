import { Request, Response } from "express";
import Task from "../models/task.model";
import paginationHelper from "../../../helpers/pagination";
import searchHelpers from "../../../helpers/search";
//[get] api/v1/task/
export const index = async (req: Request, res: Response) => {
  interface Find {
    deleted: boolean;
    title?: RegExp;
  }
  //find
  const find: Find = {
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
  //pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 2,
  };
  const countTask = await Task.countDocuments(find);
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countTask
  );
  //end pagination
  //search
  const objectSearch = searchHelpers(req.query);
  if (req.query.keyword) {
    find.title = objectSearch.regex;
  }
  //end search
  const task = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

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
//[patch] api/v1/task/change-status/:id
export const changeStatus = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const status: string = req.body.status;
    await Task.updateOne({ _id: id }, { status: status });
    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Cập nhật thất bại",
    });
  }
};
//[patch] api/v1/task/change-multi
export const changeMulti = async (req: Request, res: Response) => {
  try {
    const ids: string[] = req.body.ids;
    const key: string = req.body.key;
    const value: string = req.body.value;
    enum Key {
      STATUS = "status",
      DELETE = "delete",
    }
    switch (key) {
      case Key.STATUS:
        await Task.updateMany({ _id: { $in: ids } }, { status: value });
        res.json({
          code: 200,
          message: "Cập nhật thành công",
        });
        break;
      case Key.DELETE:
        await Task.updateMany(
          { _id: { $in: ids } },
          {
            deleted: true,
            deletedAt: Date.now(),
          }
        );
        res.json({
          code: 200,
          message: "Xóa thành công",
        });
        break;
      default:
        res.json({
          code: 400,
          message: "Cập nhật thất bại",
        });
        break;
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Cập nhật thất bại",
    });
  }
};
//[post] api/v1/task/create
export const create = async (req: Request, res: Response) => {
  try {
    const product = new Task(req.body);
    const data = await product.save();
    res.json({
      code: 200,
      message: "Tạo thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Tạo thất bật",
    });
  }
};
//[patch] api/v1/task/edit
export const edit = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await Task.updateOne({ _id: id }, req.body);
    res.json({
      code: 200,
      message: "Chỉnh sửa thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Chỉnh sửa thất bại",
    });
  }
};
//[patch] api/v1/task/delete/id
export const deteteTask = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await Task.updateOne(
      { _id: id },
      {
        deleted: true,
        deletedAt: Date.now(),
      }
    );
    res.json({
      code: 200,
      message: "Xóa thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Fail",
    });
  }
};
