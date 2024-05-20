import prismaClient from "../prisma";

export interface UserProps {
  id: string;
}

export const createUser = async ({ id }: UserProps) => {
  if (id) {
    try {
      const newUser = await prismaClient.user.create({
        data: {
          id: id,
        },
      });

      return newUser;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  }
};

export const findUser = async ({ id }: UserProps) => {
  if (id) {
    try {
      const user = await prismaClient.user.findUnique({
        where: { id: id },
      });

      return user;
    } catch (error) {
      console.error("Erro ao encontrar usuário:", error);
      throw error;
    }
  }
};
