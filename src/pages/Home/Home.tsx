import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { PersonDTO } from "../../interface/interface";
import { api } from "../../lib/api";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import InternalServerError from "../Error/internal-server-error";
import Board from "./components/Board";

const Home = () => {
  const [data, setData] = useState<PersonDTO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (pageNumber: number = 0) => {
    setLoading(true);
    try {
      const response = await api.get("/pessoas/aberto/filtro", {
        params: { page: pageNumber, size: 10 },
      });

      setData(response.data.content);
      //setTotalPages(response.data.totalPages);

      console.log(response.data.content);
    } catch {
      setError("Erro na requisição de dados, statusCode: 500");
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading size={40} />;
  if (error) return <InternalServerError />;

  return (
    <div className="bg-neutral-100">
      <Header />
      <Board data={data} />
      <Footer />
    </div>
  );
};

export default Home;
