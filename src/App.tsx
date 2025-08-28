import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";

import Loading from "./pages/components/Loading";
import NotFound from "./pages/Error/not-found-error";

const Home = lazy(() => import("./pages/Home/Home"));
const Details = lazy(() => import("./pages/Details/Details"));

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" richColors gap={20} offset={90} />
      <Suspense fallback={<Loading size={40} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
