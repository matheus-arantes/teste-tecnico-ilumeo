import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createPonto,
  getPontos,
  verificaHoraEntrada,
  baterPontoSaida,
} from "../services/Api";
import { Ponto } from "../types/Ponto";
import { CreatePonto } from "../types/CreatePonto";
import CardPonto from "../components/cardPonto";

export default function Dashboard() {
  const { codigoUsuario } = useParams<{ codigoUsuario: string }>();
  const [horaEntrada, setHoraEntrada] = useState<Date | null>(null);
  const [horaTotal, setHoraTotal] = useState<Date | null>(null);
  const [pontos, setPontos] = useState<Ponto[]>([]);

  useEffect(() => {
    (async () => {
      await carregarPontos();
      await verificarEntrada();
    })();
  }, [codigoUsuario]);

  const carregarPontos = async () => {
    if (codigoUsuario) {
      try {
        const allpontos = await getPontos(codigoUsuario);
        setPontos(allpontos);
      } catch (error) {
        console.error("Erro ao carregar pontos:", error);
      }
    }
  };

  const calcularHorasTrabalhadas = (entrada: Date): Date => {
    // Obter a hora atual
    const horaAtual = new Date();

    // Calcular a diferença de tempo em milissegundos
    const diffMilissegundos = horaAtual.getTime() - entrada.getTime();

    // Calcular horas e minutos
    const horas = Math.floor(diffMilissegundos / (1000 * 60 * 60));
    const minutos = Math.floor(
      (diffMilissegundos % (1000 * 60 * 60)) / (1000 * 60)
    );

    // Criar uma nova data com as horas e minutos calculados
    const dataHorasTrabalhadas = new Date();
    dataHorasTrabalhadas.setHours(horas, minutos, 0, 0); // Definir horas e minutos na nova data

    return dataHorasTrabalhadas;
  };

  const verificarEntrada = async () => {
    if (codigoUsuario) {
      const resposta = await verificaHoraEntrada(codigoUsuario);
      const isEntrada = resposta && resposta.ultimaHoraEntrada;
      if (isEntrada) {
        const formattedDate = new Date(isEntrada);
        setHoraEntrada(formattedDate);
        const horasTotais = calcularHorasTrabalhadas(formattedDate);
        setHoraTotal(horasTotais);
      }
    }
  };

  const baterPonto = async () => {
    if (codigoUsuario) {
      if (!horaEntrada) {
        const pontoEntrada: CreatePonto = { userId: codigoUsuario };
        await createPonto(pontoEntrada);
        setHoraEntrada(new Date()); // Atualiza estado para refletir a nova entrada
      } else {
        await baterPontoSaida(codigoUsuario);
        setHoraEntrada(null); // Resetar estado para permitir uma nova entrada
        setHoraTotal(null); // Resetar horas totais após bater ponto de saída
      }
      await carregarPontos(); // Recarregar pontos após bater ponto
    }
  };

  const hora = horaTotal ? horaTotal.getHours() : 0;
  const minutos = horaTotal ? horaTotal.getMinutes() : 0;

  return (
    <div className="min-h-screen bg-[#151F2B] flex justify-center pt-32">
      <main className=" max-w-full max-h-full">
        <div>
          <section className="flex flex-row w-[365px] justify-between">
            <h2 className="font-montserrat text-[#F5F5F5] font-bold text-xs">
              Relógio de ponto
            </h2>
            <div className="flex flex-col">
              <span
                data-testid="userCode"
                className="font-montserrat text-[#F5F5F5] font-bold text-xs"
              >
                #{codigoUsuario}
              </span>
              <p className="font-montserrat text-[#CFCFCFB0] font-light text-right text-xs">
                Usuário
              </p>
            </div>
          </section>
          {horaTotal instanceof Date ? (
            <section>
              <span className="font-montserrat text-[#F5F5F5] font-bold text-2xl">
                {horaTotal.getHours()}h {horaTotal.getMinutes()}m
              </span>
              <p className="font-montserrat text-[#F5F5F5] font-bold text-xs pb-5">
                Horas de hoje
              </p>
            </section>
          ) : (
            <section>
              <span className="font-montserrat text-[#F5F5F5] font-bold text-2xl">
                0h 00m
              </span>
              <p className="font-montserrat text-[#F5F5F5] font-bold text-xs pb-5">
                Horas de hoje
              </p>
            </section>
          )}
          {!horaEntrada ? (
            <button
              data-testid="buttonPonto"
              className="bg-[#FE8A00] hover:bg-[#fe8c00de] w-[365px] font-montserrat font-bold rounded h-12 text-base"
              onClick={baterPonto}
            >
              Hora de entrada
            </button>
          ) : (
            <button
              data-testid="buttonPonto"
              className="bg-[#FE8A00] hover:bg-[#fe8c00de] w-[365px] font-montserrat font-bold rounded h-12 text-base"
              onClick={baterPonto}
            >
              Hora de saída
            </button>
          )}
        </div>
        <div className="pt-3 mb-1">
          <span className="font-montserrat font-bold text-xs text-[#F5F5F5]">
            Dias anteriores
          </span>
        </div>
        <div data-testid="cardPonto">
          {pontos ? (
            pontos
              .filter((ponto) => ponto.totalTime !== null)
              .map((ponto) => (
                <CardPonto
                  key={ponto.id}
                  date={ponto.entrada}
                  totalTime={ponto.totalTime}
                />
              ))
          ) : (
            <p className="text-center text-silver">Carregando...</p>
          )}
        </div>
      </main>
    </div>
  );
}
