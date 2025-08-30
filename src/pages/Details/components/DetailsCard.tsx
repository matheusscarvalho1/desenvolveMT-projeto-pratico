import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import type {
  OcorrenciaInfoDTO,
  PersonDTO,
} from "../../../interface/interface";
import { api } from "../../../lib/api";
import Loading from "../../components/Loading";
import NotFound from "../../Error/not-found-error";
import DialogDetailsCard from "./DialogDetailsCard";

interface DetailsProps {
  data: PersonDTO;
}

const DetailsCard = ({ data }: DetailsProps) => {
  const [ocorrenciaResource, setOcorrenciaResource] = useState<
    OcorrenciaInfoDTO[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  const sortOcorrencias = (data: OcorrenciaInfoDTO[]) => {
    return [...data].sort(
      (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime(),
    );
  };
  const fetchData = async (ocorrenciaId: number) => {
    if (!ocorrenciaId) return;
    setLoading(true);
    try {
      const response = await api.get(
        `/ocorrencias/informacoes-desaparecido?ocorrenciaId=${ocorrenciaId}`,
      );

      const sortedData = sortOcorrencias(response.data);

      setOcorrenciaResource(sortedData);
      // console.log("response: ", response);
      console.log("response.data:", response.data);
    } catch {
      setError("Erro na requisição de dados, statusCode: 500");
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data.ultimaOcorrencia) {
      fetchData(data.ultimaOcorrencia.ocoId);
    } else {
      setLoading(false);
    }
  }, []);

  const navigate = useNavigate();
  const handleHomePage = () => {
    navigate("/");
  };
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  if (!data.ultimaOcorrencia) {
    return <NotFound />;
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <div className="flex flex-grow justify-center px-4 py-6">
          <div className="container rounded-lg bg-white p-6 shadow">
            <h1 className="mb-6 text-2xl font-bold text-gray-800">
              <strong>{data.nome}</strong>
            </h1>
            <div className="space-y-4">
              <div className="flex flex-col justify-center gap-6 sm:flex sm:flex-row md:justify-start">
                {data.urlFoto ? (
                  <div className="flex md:justify-start">
                    <img
                      src={data.urlFoto}
                      alt={data.nome}
                      className="max-w-full rounded-2xl md:max-w-xs"
                    />
                  </div>
                ) : (
                  <div className="text-muted-foreground flex h-60 w-60 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-6 italic">
                    Imagem não fornecida
                  </div>
                )}
                <div className="flex flex-col space-y-3">
                  <div className="text-md">
                    <strong className="font-semibold">Idade</strong>:{" "}
                    {data.idade} anos
                  </div>
                  <div className="text-md">
                    <strong className="font-semibold">Sexo</strong>:{" "}
                    {data.sexo
                      ? data.sexo[0].toUpperCase() +
                        data.sexo.slice(1).toLowerCase()
                      : "Não informado"}
                  </div>
                  <div className="text-md">
                    <strong className="font-semibold">Status</strong>:{" "}
                    <Badge
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        data.vivo
                          ? "bg-green-300 text-green-800"
                          : "bg-red-300 text-red-800"
                      }`}
                    >
                      {data.vivo
                        ? data.sexo === "FEMININO"
                          ? "Localizada"
                          : "Localizado"
                        : data.sexo === "FEMININO"
                          ? "Desaparecida"
                          : "Desaparecido"}
                    </Badge>
                  </div>
                </div>
                <div className="max-h-89 space-y-2 overflow-y-auto rounded-md border bg-gray-50 p-2">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Últimas informações
                  </h2>
                  {ocorrenciaResource?.length > 0 ? (
                    ocorrenciaResource.map((item: OcorrenciaInfoDTO) => (
                      <div
                        key={item.id}
                        className="rounded-md border-b border-gray-200 pb-2"
                      >
                        <p>
                          <strong>Data: </strong>
                          {new Date(item.data).toLocaleDateString("pt-BR")}
                        </p>
                        <p>
                          <strong>Informação:</strong> {item.informacao}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">
                      Até então nenhuma informação adicional...
                    </p>
                  )}
                </div>
              </div>

              {data.ultimaOcorrencia && (
                <div className="mt-6 space-y-3 border-t pt-4">
                  <h2 className="mb-3 text-xl font-semibold">
                    Última Ocorrência
                  </h2>

                  {data.ultimaOcorrencia.dtDesaparecimento && (
                    <div>
                      <strong className="text-md font-semibold">
                        Data do desaparecimento:
                      </strong>{" "}
                      {new Date(
                        data.ultimaOcorrencia.dtDesaparecimento,
                      ).toLocaleDateString("pt-BR")}
                    </div>
                  )}

                  {data.ultimaOcorrencia.dataLocalizacao && (
                    <div>
                      <strong className="text-md font-semibold">
                        Data da localização:
                      </strong>{" "}
                      {new Date(
                        data.ultimaOcorrencia.dataLocalizacao,
                      ).toLocaleDateString("pt-BR")}
                    </div>
                  )}

                  {data.ultimaOcorrencia.localDesaparecimentoConcat && (
                    <div>
                      <strong className="text-md font-semibold">
                        Local do desaparecimento:
                      </strong>{" "}
                      {data.ultimaOcorrencia.localDesaparecimentoConcat}
                    </div>
                  )}

                  {data.ultimaOcorrencia.ocoId !== undefined && (
                    <div>
                      <strong className="text-md font-semibold">
                        ID da ocorrência:
                      </strong>{" "}
                      {data.ultimaOcorrencia.ocoId}
                    </div>
                  )}

                  {data.ultimaOcorrencia.encontradoVivo !== undefined && (
                    <div>
                      <strong className="text-md font-semibold">
                        Situação:
                      </strong>{" "}
                      {data.ultimaOcorrencia.encontradoVivo
                        ? "Localizado vivo"
                        : "Sem informações"}
                    </div>
                  )}

                  {data.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                    ?.vestimentasDesaparecido && (
                    <div>
                      <strong className="text-md font-semibold">
                        Vestimentas:
                      </strong>{" "}
                      {
                        data.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                          .vestimentasDesaparecido
                      }
                    </div>
                  )}

                  {data.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                    ?.informacao && (
                    <div>
                      <strong className="text-md font-semibold">
                        Informações da entrevista:
                      </strong>{" "}
                      {
                        data.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                          .informacao
                      }
                    </div>
                  )}

                  {data.ultimaOcorrencia.listaCartaz?.length > 0 && (
                    <div>
                      <strong className="text-md font-semibold">
                        Lista de cartaz:
                      </strong>
                      <ul className="ml-5 list-disc">
                        {data.ultimaOcorrencia.listaCartaz.map(
                          (cartaz, idx) => (
                            <li key={idx}>
                              <a
                                href={cartaz.urlCartaz}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                {cartaz.tipoCartaz.replaceAll("_", " ")}
                              </a>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-col gap-4 md:flex-row md:justify-around">
              <Button
                className="cursor-pointer"
                variant="secondary"
                size="lg"
                onClick={handleHomePage}
              >
                Voltar para a página inicial
              </Button>
              <DialogDetailsCard
                isOpen={dialogOpen}
                onOpenChange={setDialogOpen}
                ocoId={data.ultimaOcorrencia.ocoId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsCard;
