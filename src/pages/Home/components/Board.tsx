import type { PersonDTO } from "../../../interface/interface";
import PersonCard from "./PersonCard";

interface BoardProps {
  data: PersonDTO[];
}

const Board = ({ data }: BoardProps) => {
  return (
    <div className="container mx-auto flex-1 px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Pessoas Desaparecidas
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-6 rounded-xl bg-gray-100 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((pessoa) => (
          <PersonCard key={pessoa.id} pessoa={pessoa} />
        ))}
      </div>
    </div>
  );
};

export default Board;
