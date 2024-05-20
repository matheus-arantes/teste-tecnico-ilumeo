import express from "express";
import {
  findUserController,
  createUserController,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/", findUserController);

userRouter.get("/:id", findUserController);

export default userRouter;
