import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "./App";

const buttonLogin = "confirmButtonLogin";
const inputLogin = "inputLogin";
const dashboardURL = "http://localhost:3000/dashboard/4SXXFMF";
const buttonBaterPonto = "buttonPonto";
const cardComponent = "cardPonto";
const userCode = "userCode";

describe("Testes FrontEnd:", () => {
  test("Testando a página principal de login:", async () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId(inputLogin);
    const button = getByTestId(buttonLogin);
    fireEvent.change(input, { target: { value: "4SXXFMF" } });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(() => {
      expect(window.location.href).toBe(dashboardURL);
    });
  });

  test("Testando a página de pontos:", async () => {
    const { getByTestId } = render(<App />);
    const buttonPonto = getByTestId(buttonBaterPonto);
    fireEvent.click(buttonPonto);
    fireEvent.click(buttonPonto);
    const cardPonto = getByTestId(cardComponent);
    expect(cardPonto).toBeInTheDocument();
    expect(buttonPonto).toBeInTheDocument();
    const codigoUsuario = getByTestId(userCode);
    expect(codigoUsuario).toBeInTheDocument();
  });
});
