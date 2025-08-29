import { useNavigate } from "react-router";

import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import type { PersonDTO } from "../../../interface/interface";

interface PersonCardProps {
  pessoa: PersonDTO;
}

const PersonCard = ({ pessoa }: PersonCardProps) => {
  const navigate = useNavigate();

  const handleDetails = (id: number) => {
    navigate(`/details/${id}`);
  };
  return (
    <div
      key={pessoa.id}
      className="overflow-hidden rounded-xl border border-gray-700 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="flex h-90 w-full items-center justify-center p-6">
        {pessoa.urlFoto ? (
          <img
            src={pessoa.urlFoto}
            alt={pessoa.nome}
            className="h-full w-full transform rounded-xl object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
        ) : (
          <div className="text-muted-foreground flex h-80 w-80 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-6 italic">
            Imagem não fornecida
          </div>
        )}
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
            <span className="text-muted-foreground text-md font-medium">
              Sexo: {pessoa.sexo[0] + pessoa.sexo.slice(1).toLowerCase()}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-muted-foreground text-md font-medium">
              Idade: {pessoa.idade} anos
            </span>
          </div>
          {pessoa.ultimaOcorrencia?.dtDesaparecimento && (
            <div className="flex items-center">
              <span className="text-muted-foreground text-md font-medium">
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
  );
};

export default PersonCard;
