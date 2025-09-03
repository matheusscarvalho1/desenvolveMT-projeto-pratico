import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router";
import { vi } from "vitest";

import InternalServerError from "../internal-server-error";

vi.mock("../../components/Header.tsx", () => {
  return {
    default: () => <header>Header</header>,
  };
});

vi.mock("../../components/Footer", () => {
  return {
    default: () => <footer>Footer</footer>,
  };
});

test("Internal Server Error 500 - Mostra mensagem de erro e link para home", () => {
  render(
    <Router>
      <InternalServerError />
    </Router>,
  );

  expect(
    screen.getByText(/Ocorreu um erro interno no servidor/i),
  ).toBeInTheDocument();

  const homeLink = screen.getByRole("link", { name: /voltar para a home/i });
  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveAttribute("href", "/");

  expect(screen.getByText("500")).toBeInTheDocument();
});
