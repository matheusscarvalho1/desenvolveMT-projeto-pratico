import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router";
import { vi } from "vitest";

import NotFound from "../not-found-error";

// Mock básico dos componentes
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

test("Not Found 404 - Mostra mensagem de erro e link para home", () => {
  render(
    <Router>
      <NotFound />
    </Router>,
  );

  expect(screen.getByText(/página não encontrada/i)).toBeInTheDocument();

  const homeLink = screen.getByRole("link", { name: /voltar para a home/i });
  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveAttribute("href", "/");

  expect(screen.getByText("404")).toBeInTheDocument();
});
