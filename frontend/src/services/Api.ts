import axios, { AxiosResponse } from "axios";
import { Ponto } from "../types/Ponto";
import { CreatePonto } from "../types/CreatePonto";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

export async function verificarCodigo(id: string): Promise<boolean> {
  try {
    const response = await api.post("/user", { id });
    const existeUsuario = response.status === 200 && response.data !== null;
    return existeUsuario;
  } catch (error) {
    console.error("Erro ao verificar o código do usuário:", error);
    return false;
  }
}

interface VerificaHoraEntradaResponse {
  ultimaHoraEntrada: string;
}

export async function verificaHoraEntrada(
  userId: string
): Promise<VerificaHoraEntradaResponse | null> {
  try {
    const { data } = await api.get(`/pontos/entrada`, {
      params: { id: userId },
    });
    return data; // Retorna a hora da entrada como um objeto com a chave ultimaHoraEntrada
  } catch (error) {
    console.error("Erro ao acessar hora de entrada do usuário:", error);
    return null; // Retorna null em caso de erro ou resposta vazia
  }
}

export async function getPontos(id: string): Promise<Ponto[]> {
  const response: AxiosResponse<Ponto[]> = await api.get(`/pontos`, {
    params: { id: id },
  });
  return response.data;
}

export async function createPonto(ponto: CreatePonto) {
  const { data } = await api.post("/pontos", ponto);
  return data;
}

export async function baterPontoSaida(userId: string): Promise<boolean> {
  try {
    const response = await api.patch(`/pontos`, { userId });
    return response.status === 200; // Retorna true se a atualização for bem-sucedida
  } catch (error) {
    console.error("Erro ao atualizar o totalTime:", error);
    return false; // Retorna false em caso de erro
  }
}
