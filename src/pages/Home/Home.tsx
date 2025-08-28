import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { api } from "../../lib/api";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import InternalServerError from "../Error/internal-server-error";

const Home = () => {
  interface Pessoa {
    id: number;
    idade: number;
    nome: string;
    sexo: string;
    ultimaOcorrencia?: {
      dtDesaparecimento?: string;
      dataLocalizacao?: string | null;
      encontradoVivo?: boolean;
      vestimentasDesaparecido?: string;
    };
    urlFoto?: string;
    vivo: boolean;
  }

  const navigate = useNavigate();
  const [data, setData] = useState<Pessoa[]>([]);
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

  const handleDetails = (id: number) => {
    navigate(`/details/${id}`);
  };
  if (loading) return <Loading fullPage size={40} />;
  if (error) return <InternalServerError />;

  return (
    <div>
      <Header />
      <div className="container mx-auto flex-1 px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Pessoas Desaparecidas
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((pessoa) => (
            <div
              key={pessoa.id}
              className="overflow-hidden rounded-xl border border-gray-700 shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="h-90 w-full p-6">
                <img
                  src={pessoa.urlFoto}
                  alt={pessoa.nome}
                  className="h-full w-full transform rounded-xl object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
              </div>
              <div className="space-y-2 p-5">
                <Badge
                  variant="default"
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${pessoa.vivo ? "bg-green-300 text-green-800" : "bg-red-300 text-red-800"}`}
                >
                  {pessoa.vivo ? "Localizada" : "Desaparecida"}
                </Badge>
                <h2 className="mb-2 truncate text-xl font-bold text-gray-800">
                  {pessoa.nome}
                </h2>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center">
                    <span className="text-muted-foreground text-sm font-medium">
                      Sexo:{" "}
                      {pessoa.sexo[0] + pessoa.sexo.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground text-sm font-medium">
                      Idade: {pessoa.idade} anos
                    </span>
                  </div>
                  {pessoa.ultimaOcorrencia?.dtDesaparecimento && (
                    <div className="flex items-center">
                      <span className="text-muted-foreground text-sm font-medium">
                        Desaparecido em:{" "}
                        {new Date(
                          pessoa.ultimaOcorrencia.dtDesaparecimento,
                        ).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  )}
                </div>
                <Button
                  variant="default"
                  className="mt-4 w-full cursor-pointer rounded-lg px-4 py-2 font-medium transition-colors duration-200"
                  onClick={() => handleDetails(pessoa.id)}
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
