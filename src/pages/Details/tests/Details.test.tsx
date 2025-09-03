import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { vi } from "vitest";

import type { PersonDTO } from "../../../interface/interface";
import * as apiModule from "../../../lib/api";
import Details from "../Details";

vi.mock("../components/Loading", () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock("../components/Header", () => ({
  default: () => <header>Header</header>,
}));

vi.mock("../components/Footer", () => ({
  default: () => <footer>Footer</footer>,
}));

vi.mock("../Details/components/DetailsCard", () => ({
  default: ({ data }: { data: PersonDTO }) => <div>DetailsCard {data.id}</div>,
}));

vi.mock("../Error/not-found-error", () => ({
  default: () => <div>NotFound Mock</div>,
}));

vi.mock("../Error/internal-server-error", () => ({
  default: () => <div>InternalServerError Mock</div>,
}));

test("exibe Loading enquanto busca os dados", async () => {
  vi.spyOn(apiModule.api, "get").mockImplementation(
    () => new Promise(() => {}),
  );

  render(
    <MemoryRouter initialEntries={["/details/123"]}>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(await screen.findByTestId("spinner")).toBeInTheDocument();
});

test("renderiza DetailsCard quando a API retorna dados", async () => {
  vi.spyOn(apiModule.api, "get").mockResolvedValue({
    data: { id: 123, name: "Matheus" },
  });

  render(
    <MemoryRouter initialEntries={["/details/123"]}>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(await screen.findByText("DetailsCard 123")).toBeInTheDocument();
});

test("exibe NotFound se id não bater com dados", async () => {
  vi.spyOn(apiModule.api, "get").mockResolvedValue({ data: { id: 999 } });

  render(
    <MemoryRouter initialEntries={["/details/123"]}>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(await screen.findByText("NotFound Mock")).toBeInTheDocument();
});

test("exibe InternalServerError se a API falhar", async () => {
  vi.spyOn(apiModule.api, "get").mockRejectedValue(new Error("Falha"));

  render(
    <MemoryRouter initialEntries={["/details/123"]}>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(
    await screen.findByText("InternalServerError Mock"),
  ).toBeInTheDocument();
});
