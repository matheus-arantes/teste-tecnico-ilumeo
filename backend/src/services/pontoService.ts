import prismaClient from "../prisma";

export interface PontoProps {
  userId: string;
}

export const createPonto = async ({ userId }: PontoProps) => {
  try {
    // Crie um novo registro de ponto no banco de dados usando o Prisma Client
    const novoPonto = await prismaClient.ponto.create({
      data: {
        userId: userId,
      },
    });

    return novoPonto;
  } catch (error) {
    console.error("Erro ao criar ponto:", error);
    throw error;
  }
};

export const getPontos = async ({ userId }: PontoProps) => {
  if (userId) {
    try {
      const pontos = await prismaClient.ponto.findMany({
        where: { userId: userId },
      });

      return pontos;
    } catch (error) {
      console.error("Erro ao criar ponto:", error);
      throw error;
    }
  }
};

export const updateTotalTime = async ({ userId }: PontoProps) => {
  try {
    // Encontrar o último ponto registrado pelo userId sem totalTime preenchido
    const ultimoPonto = await prismaClient.ponto.findFirst({
      where: {
        userId: userId,
        totalTime: null, // Somente procurar pontos sem totalTime preenchido
      },
      orderBy: { id: "desc" },
    });

    if (ultimoPonto && ultimoPonto.entrada) {
      // Verificar se ultimoPonto e entrada não são nulos
      // Obter a hora atual
      const horaAtual = new Date();

      // Calcular a diferença de tempo em milissegundos
      const diffMilissegundos =
        horaAtual.getTime() - new Date(ultimoPonto.entrada).getTime();

      // Criar um novo objeto Date com a diferença de tempo
      const novoTotalTime = new Date(diffMilissegundos);

      // Atualizar o totalTime no último ponto registrado
      await prismaClient.ponto.update({
        where: { id: ultimoPonto.id },
        data: { totalTime: novoTotalTime },
      });

      return novoTotalTime; // Retornar o novo totalTime completo
    }

    return null; // Retornar null se o último ponto não existir ou não tiver entrada
  } catch (error) {
    console.error("Erro ao atualizar o totalTime:", error);
    throw error;
  }
};

export async function findUltimaHoraEntrada(
  userId: string
): Promise<Date | null> {
  try {
    const ultimoPonto = await prismaClient.ponto.findFirst({
      where: {
        userId,
        totalTime: null,
      },
      orderBy: {
        entrada: "desc",
      },
    });

    if (ultimoPonto?.entrada) {
      return new Date(ultimoPonto.entrada); // Convertendo para Date
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao encontrar a última hora de entrada:", error);
    throw error;
  }
}
