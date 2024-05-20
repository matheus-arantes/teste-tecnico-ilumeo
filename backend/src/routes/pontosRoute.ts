import express from "express";
import {
  baterPontoController,
  createPontoController,
  getPontosController,
  ultimaHoraEntradaController,
} from "../controllers/pontoController";

const pontoRouter = express.Router();

pontoRouter.post("/", createPontoController);

pontoRouter.get("/", getPontosController);

pontoRouter.get("/entrada", ultimaHoraEntradaController);

pontoRouter.patch("/", baterPontoController);

export default pontoRouter;
