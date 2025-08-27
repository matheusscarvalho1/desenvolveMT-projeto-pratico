import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import Loading from "./pages/components/Loading";

const Home = lazy(() => import("./pages/Home/Home"));
const Details = lazy(() => import("./pages/Details/Details"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
