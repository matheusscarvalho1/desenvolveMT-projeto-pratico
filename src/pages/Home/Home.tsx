import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod/v3";

// Importar dados locais temporariamente
import jsonData from "../../abitus-pessoas.json";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import type { FormFilter, PersonDTO } from "../../interface/interface";
import { handleError } from "../../lib/utils";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import InternalServerError from "../Error/internal-server-error";
import Board from "./components/Board";

// Extrair o array de pessoas da estrutura do JSON
const pessoasData = jsonData.data.content;

const Home = () => {
  const [data, setData] = useState<PersonDTO[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FormFilter>({});

  const formSchema = z.object({
    nome: z.string().optional(),
    faixaIdadeInicial: z.coerce
      .number()
      .int()
      .nonnegative()
      .optional()
      .nullable(),
    faixaIdadeFinal: z.coerce
      .number()
      .int()
      .nonnegative()
      .optional()
      .nullable(),
    sexo: z.string().optional(),
    status: z.enum(["DESAPARECIDO", "LOCALIZADO"]).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      faixaIdadeInicial: null,
      faixaIdadeFinal: null,
      sexo: "",
      status: "DESAPARECIDO",
    },
  });

  // Função para determinar o status baseado na data de localização
  const getStatus = (pessoa: any) => {
    return pessoa.ultimaOcorrencia?.dataLocalizacao
      ? "LOCALIZADO"
      : "DESAPARECIDO";
  };
  const validateAndTransformPerson = (person: any): PersonDTO => {
    return {
      id: person.id || 0,
      nome: person.nome || "",
      idade: person.idade || 0,
      sexo: person.sexo || "",
      vivo: person.vivo || false,
      urlFoto: person.urlFoto || null,
      ultimaOcorrencia: {
        dtDesaparecimento: person.ultimaOcorrencia?.dtDesaparecimento || "",
        dataLocalizacao: person.ultimaOcorrencia?.dataLocalizacao || null,
        encontradoVivo: person.ultimaOcorrencia?.encontradoVivo || false,
        localDesaparecimentoConcat:
          person.ultimaOcorrencia?.localDesaparecimentoConcat || "",
        ocorrenciaEntrevDesapDTO: {
          informacao:
            person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao ||
            null,
          vestimentasDesaparecido:
            person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO
              ?.vestimentasDesaparecido || null,
          ...person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO,
        },
        listaCartaz: person.ultimaOcorrencia?.listaCartaz || null,
        ocoId: person.ultimaOcorrencia?.ocoId || 0,
        ...person.ultimaOcorrencia,
      },
      ...person,
    };
  };

  // Função para filtrar dados localmente (substituição temporária da API)
  const filterLocalData = (
    filters: FormFilter,
    pageNumber: number = 0,
    pageSize: number = 10,
  ) => {
    let filteredData = pessoasData.map(validateAndTransformPerson);

    // Aplicar filtros
    if (filters.nome) {
      filteredData = filteredData.filter((person) =>
        person.nome.toLowerCase().includes(filters.nome!.toLowerCase()),
      );
    }

    if (
      filters.faixaIdadeInicial !== undefined &&
      filters.faixaIdadeInicial !== null
    ) {
      filteredData = filteredData.filter(
        (person) => person.idade >= filters.faixaIdadeInicial!,
      );
    }

    if (
      filters.faixaIdadeFinal !== undefined &&
      filters.faixaIdadeFinal !== null
    ) {
      filteredData = filteredData.filter(
        (person) => person.idade <= filters.faixaIdadeFinal!,
      );
    }

    if (filters.sexo) {
      filteredData = filteredData.filter(
        (person) => person.sexo === filters.sexo,
      );
    }

    if (filters.status) {
      filteredData = filteredData.filter((person) => {
        const personStatus = getStatus(person);
        return personStatus === filters.status;
      });
    }

    // Calcular paginação
    const totalElements = filteredData.length;
    const totalPages = Math.ceil(totalElements / pageSize);
    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      content: paginatedData,
      totalElements,
      totalPages,
      number: pageNumber,
      size: pageSize,
    };
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newFilters = Object.fromEntries(
      Object.entries(values).filter(
        ([_, value]) => value !== null && value !== "" && value !== "TODOS",
      ),
    );

    setFilters(newFilters);
    fetchData(0, newFilters);
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      fetchData(newPage, filters);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      fetchData(newPage, filters);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    fetchData(page, filters);
  };

  const handleClearFilters = () => {
    setFilters({});
    setCurrentPage(0);
    form.reset();
    fetchData(0, {});
  };

  const fetchData = async (
    pageNumber: number = 0,
    customFilters?: FormFilter,
  ) => {
    try {
      // Aqui você usa seus dados locais ou API
      const response = filterLocalData(customFilters || {}, pageNumber, 10);

      console.log(response);
      setData(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
      //setCurrentPage(response.number); // mantém a página atual
    } catch (error) {
      const message = handleError(error);
      setError(message);
      console.error("Detalhe técnico do erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <InternalServerError />;

  return (
    <div className="bg-neutral-100">
      <Header />
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Pessoas Desaparecidas
          </h1>
          <p className="text-muted-foreground mt-2">
            Utilize os filtros abaixo para buscar pessoas desaparecidas
          </p>
          {totalElements > 0 && (
            <div className="text-muted-foreground mt-4 flex items-center gap-2 text-sm">
              <span>Total de registros encontrados: {totalElements}</span>
              {totalPages > 1 && (
                <span>
                  • Página {currentPage + 1} de {totalPages}
                </span>
              )}
            </div>
          )}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 items-center space-y-6 px-6 md:grid-cols-3 md:gap-6 md:space-y-0 lg:grid-cols-5 xl:grid-cols-6"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full cursor-pointer border-blue-200 bg-white"
                      placeholder="Insira o nome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="faixaIdadeInicial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idade Inicial</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Insira a idade para compor a faixa etária"
                      className="w-full cursor-pointer border-blue-200 bg-white"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? null : Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="faixaIdadeFinal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idade Final</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Insira a idade para compor a faixa etária"
                      className="w-full cursor-pointer border-blue-200 bg-white"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? null : Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sexo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexo</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full cursor-pointer border-blue-200 bg-white hover:bg-blue-100">
                        <SelectValue placeholder="Selecione o sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FEMININO">Feminino</SelectItem>
                        <SelectItem value="MASCULINO">Masculino</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full cursor-pointer border-blue-200 bg-white hover:bg-blue-100">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DESAPARECIDO">
                          Desaparecido(a)
                        </SelectItem>
                        <SelectItem value="LOCALIZADO">
                          Localizado(a)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-2 md:mt-4 md:flex md:items-center lg:mt-0 xl:mt-4">
              <Button className="cursor-pointer" size="lg" type="submit">
                <MagnifyingGlassIcon />
                Filtrar
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer"
                type="button"
                onClick={handleClearFilters}
              >
                Limpar filtros
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Board data={data} />
      <div></div>
      <Pagination className="p-6">
        <PaginationContent className="flex gap-6">
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              className={
                currentPage === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={handlePrevious}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i)
            .filter(
              (i) =>
                i === 0 ||
                i === totalPages - 1 ||
                (i >= currentPage - 2 && i <= currentPage + 2),
            )
            .map((i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  className={`cursor-pointer rounded px-3 py-1 ${
                    currentPage === i
                      ? "bg-gray-800 font-bold text-gray-100"
                      : ""
                  }`}
                  onClick={() => handlePageClick(i)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              className={
                currentPage === totalPages - 1
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={handleNext}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Footer />
    </div>
  );
};

export default Home;
