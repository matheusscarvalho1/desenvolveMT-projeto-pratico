import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

import { Badge } from "../../components/ui/badge";
import { api } from "../../lib/api";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import InternalServerError from "../Error/internal-server-error";
import NotFound from "../Error/not-found-error";

interface PessoaDTO {
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

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PessoaDTO>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPessoaDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get<PessoaDTO>(`/pessoas/${id}`);
        console.log(response.data);
        setData(response.data);
      } catch {
        const errorMsg = "Não foi possível carregar os detalhes dessa pessoa";
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchPessoaDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!data?.id || Number(id) !== data.id) {
    return <NotFound />;
  }

  if (error) {
    <InternalServerError />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />

      <div className="container mx-auto flex-grow px-4 py-8">
        {/* Dados da Pessoa */}
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">{data.nome}</h1>

          <div className="space-y-4">
            <div className="flex gap-6">
              {data.urlFoto && (
                <div>
                  <img
                    src={data.urlFoto}
                    alt={data.nome}
                    className="mt-2 max-w-xs rounded"
                  />
                </div>
              )}
              <div className="flex flex-col space-y-1">
                {" "}
                <div>
                  <strong>Idade:</strong> {data.idade} anos
                </div>
                <div>
                  <span>
                    <strong>Sexo:</strong>{" "}
                    {data.sexo
                      ? data.sexo[0].toUpperCase() +
                        data.sexo.slice(1).toLowerCase()
                      : "Não informado"}
                  </span>
                </div>
                <div>
                  <strong>Status</strong>:{" "}
                  <Badge
                    variant="default"
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${data.vivo ? "bg-green-300 text-green-800" : "bg-red-300 text-red-800"}`}
                  >
                    {data.vivo ? "Localizada" : "Desaparecida"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Dados da última ocorrência */}
            {data.ultimaOcorrencia && (
              <div className="mt-6 border-t pt-4">
                <h2 className="mb-3 text-xl font-semibold">
                  Última Ocorrência
                </h2>

                {data.ultimaOcorrencia.dtDesaparecimento && (
                  <div>
                    <strong>Data do desaparecimento:</strong>{" "}
                    {new Date(
                      data.ultimaOcorrencia.dtDesaparecimento,
                    ).toLocaleDateString("pt-BR")}
                  </div>
                )}

                {data.ultimaOcorrencia.dataLocalizacao && (
                  <div>
                    <strong>Data da localização:</strong>{" "}
                    {new Date(
                      data.ultimaOcorrencia.dataLocalizacao,
                    ).toLocaleDateString("pt-BR")}
                  </div>
                )}

                {data.ultimaOcorrencia.vestimentasDesaparecido && (
                  <div>
                    <strong>Vestimentas:</strong>{" "}
                    {data.ultimaOcorrencia.vestimentasDesaparecido}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Details;
