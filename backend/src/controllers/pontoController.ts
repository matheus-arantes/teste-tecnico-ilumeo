import { Request, Response } from "express";
import {
  createPonto,
  getPontos,
  updateTotalTime,
  findUltimaHoraEntrada,
} from "../services/pontoService";

async function createPontoController(req: Request, res: Response) {
  if (req.body) {
    try {
      // Chamar a função createPonto para criar um novo ponto
      const novoPonto = await createPonto(req.body);

      // Responder ao cliente com o novo ponto criado
      return res.status(201).json({ ponto: novoPonto });
    } catch (error) {
      // Lidar com erros, se houver algum
      console.error("Erro ao criar ponto:", error);
      return res.status(500).json({ error: "Erro ao criar ponto" });
    }
  }
}

async function getPontosController(req: Request, res: Response) {
  const userId = req.query.id; // Capturando o ID do usuário da query string

  if (typeof userId === "string") {
    try {
      const pontos = await getPontos({ userId: userId });
      return res.status(200).json(pontos);
    } catch (error) {
      console.error("Erro ao obter pontos:", error);
      return res.status(500).json({ error: "Erro ao obter pontos" });
    }
  } else {
    return res.status(400).json({ error: "ID do usuário não fornecido" });
  }
}

async function baterPontoController(req: Request, res: Response) {
  const { userId } = req.body;
  if (userId) {
    try {
      // Chamar a função updateTotalTime para atualizar o totalTime
      const sucesso = await updateTotalTime({ userId });

      if (sucesso) {
        return res
          .status(200)
          .json({ message: "Total time atualizado com sucesso" });
      } else {
        return res
          .status(404)
          .json({ error: "Último ponto não encontrado ou sem entrada" });
      }
    } catch (error) {
      // Lidar com erros, se houver algum
      console.error("Erro ao atualizar o totalTime:", error);
      return res.status(500).json({ error: "Erro ao atualizar o totalTime" });
    }
  }
}

export async function ultimaHoraEntradaController(req: Request, res: Response) {
  const userId = req.query.id;
  if (typeof userId === "string") {
    try {
      const ultimaHoraEntrada = await findUltimaHoraEntrada(userId);
      if (ultimaHoraEntrada !== null) {
        return res.status(200).json({ ultimaHoraEntrada });
      } else {
        return res
          .status(404)
          .json({ error: "Última hora de entrada não encontrada" });
      }
    } catch (error) {
      console.error("Erro ao encontrar a última hora de entrada:", error);
      return res
        .status(500)
        .json({ error: "Erro ao encontrar a última hora de entrada" });
    }
  }
}

export { createPontoController, getPontosController, baterPontoController };
