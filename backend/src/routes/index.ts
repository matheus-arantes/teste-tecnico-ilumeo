import express from "express";
import pontoRouter from "./pontosRoute";
import userRouter from "./userRoutes";

const router = express.Router();

router.use("/pontos", pontoRouter);

router.use("/user", userRouter);

export default router;
