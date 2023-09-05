import express, { Request, Response } from "express";
import UserModel from "../models/users";
import {
  createUser,
  findAndUpdate,
  findUser,
  deleteUser,
} from "../services/users.service";
const homeDetail = async (req: Request, resp: Response) => {
  //   let myData = await UserModel.find();
  const user = await createUser({ name: "ronak", dept: "comp" });

  //update
  // const user = await findAndUpdate(
  //   { name: "test" },
  //   { dept: "abc" },
  //   { new: true }
  // );

  //find
  // const user = await findUser({ name: "test" });
  resp.json({
    message: "Home Page New",
    myData: user,
  });
};

export { homeDetail };
