import { Request, Response } from "express";
import { findUser, createUser } from "../services/userService";

interface Params {
  id: string;
}

async function findUserController(req: Request<Params>, res: Response) {
  try {
    const userId = req.body.id; // Acessando o ID do usuário a partir dos parâmetros da rota

    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não fornecido" });
    }

    const user = await findUser({ id: userId }); // Passando o ID do usuário para a função findUser

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao encontrar usuário:", error);
    return res.status(500).json({ error: "Erro ao encontrar usuário" });
  }
}

async function createUserController(req: Request, res: Response) {
  try {
    // Supondo que você queira passar algum critério para criar o usuário, como o ID
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID do usuário não fornecido" });
    }

    const newUser = await createUser({ id });

    return res.status(201).json(newUser); // 201 indica que o usuário foi criado com sucesso
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
}

export { findUserController, createUserController };
