import { useState, ChangeEvent, FormEvent } from "react";
import { verificarCodigo } from "../services/Api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [codigoUsuario, setCodigoUsuario] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setCodigoUsuario(event.target.value);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    // Supondo que verificarCodigoUsuario é uma função que verifica se o código do usuário está no banco de dados
    const usuarioExiste = await verificarCodigo(codigoUsuario);

    if (usuarioExiste) {
      // Redirecionar para a página de dashboard com o ID do usuário
      navigate(`/dashboard/${codigoUsuario}`);
    } else {
      alert("Código de usuário inválido. Por favor, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-[#151F2B] flex items-center justify-center">
      <main className=" max-w-full max-h-full">
        <section className="flex flex-col w-[365px] h-[203px]">
          <h1 className="text-[#CFCFCF] font-montserrat pb-10 text-xl">
            Ponto
            <span className="text-[#CFCFCF] font-bold font-montserrat">
              {" "}
              Ilumeo
            </span>
          </h1>
          <form className="flex flex-col">
            <div className="relative">
              <label className="absolute top-0 left-0 text-[#CFCFCF] font-montserrat font-light mb-2 ml-2 pl-2 pt-2 text-sm">
                Código do usuário
              </label>
              <input
                data-testid="inputLogin"
                type="text"
                placeholder=" "
                className="bg-[#1E2733] w-[365px] h-16 rounded-sm mb-10 font-montserrat font-semibold text-white pl-3 pt-7 text-2xl focus:text-white focus:font-montserrat focus:pl-3 focus:pt-7"
                value={codigoUsuario}
                onChange={handleChange}
              />
            </div>
            <button
              data-testid="confirmButtonLogin"
              onClick={handleLogin}
              className="bg-[#FE8A00] font-montserrat font-bold rounded-sm h-12"
            >
              Confirmar
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
