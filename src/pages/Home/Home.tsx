import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod/v3";

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
import { api } from "../../lib/api";
import { handleError } from "../../lib/utils";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import InternalServerError from "../Error/internal-server-error";
import Board from "./components/Board";

const Home = () => {
  const [data, setData] = useState<PersonDTO[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newFilters = Object.fromEntries(
      Object.entries(values).filter(
        ([_, value]) => value !== null && value !== "" && value !== "TODOS",
      ),
    );

    //Faz a mesma coisa que o código acima
    // if (values.nome) newFilters.nome = values.nome;
    // if (values.faixaIdadeInicial)
    //   newFilters.faixaIdadeInicial = values.faixaIdadeInicial;
    // if (values.faixaIdadeFinal)
    //   newFilters.faixaIdadeFinal = values.faixaIdadeFinal;
    // if (values.sexo) newFilters.sexo = values.sexo;
    // if (values.status) newFilters.status = values.status;

    setFilters(newFilters);
    fetchData(0, newFilters);
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber === currentPage) return;
    fetchData(pageNumber, filters, true);
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
    isPagination: boolean = false,
  ) => {
    if (isPagination) setPaginationLoading(true);
    else setLoading(true);

    try {
      const requestParamsDefault = {
        porPagina: 10,
        status: "DESAPARECIDO",
        pagina: pageNumber,
        ...customFilters,
      };

      const response = await api.get("/pessoas/aberto/filtro", {
        params: requestParamsDefault,
      });

      setData(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
      setCurrentPage(response.data.number);
    } catch (error) {
      const message = handleError(error);
      setError(message);
      console.error("Detalhe técnico do erro:", error);
    } finally {
      if (isPagination) setPaginationLoading(false);
      else setLoading(false);
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
      {totalPages > 1 && (
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-muted-foreground text-sm">
              {paginationLoading ? (
                <span className="flex items-center gap-2">
                  <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                  Carregando...
                </span>
              ) : (
                `Mostrando ${Math.min(currentPage * 10 + 1, totalElements)}-${Math.min((currentPage + 1) * 10, totalElements)} de ${totalElements} resultados`
              )}
            </div>

            <Pagination>
              <PaginationContent className="flex items-center gap-6">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      if (!paginationLoading && currentPage > 0) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                    className={
                      currentPage === 0 || paginationLoading
                        ? "pointer-events-none opacity-50"
                        : "hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-200"
                    }
                  />
                </PaginationItem>

                {(() => {
                  const pages = [];
                  const maxVisiblePages = 6;
                  let startPage = Math.max(
                    0,
                    currentPage - Math.floor(maxVisiblePages / 2),
                  );
                  const endPage = Math.min(
                    totalPages - 1,
                    startPage + maxVisiblePages - 1,
                  );

                  if (endPage - startPage + 1 < maxVisiblePages) {
                    startPage = Math.max(0, endPage - maxVisiblePages + 1);
                  }

                  if (startPage > 0) {
                    pages.push(
                      <PaginationItem key={0}>
                        <PaginationLink
                          onClick={() =>
                            !paginationLoading && handlePageChange(0)
                          }
                          className={
                            paginationLoading
                              ? "pointer-events-none opacity-50"
                              : "hover:bg-accent hover:text-accent-foreground min-w-[2.5rem] cursor-pointer transition-colors duration-200"
                          }
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>,
                    );

                    if (startPage > 1) {
                      pages.push(
                        <PaginationItem key="ellipsis-start">
                          <PaginationEllipsis className="text-muted-foreground" />
                        </PaginationItem>,
                      );
                    }
                  }

                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={() =>
                            !paginationLoading && handlePageChange(i)
                          }
                          className={
                            paginationLoading
                              ? "pointer-events-none opacity-50"
                              : `min-w-[2.5rem] cursor-pointer transition-colors duration-200 ${
                                  currentPage === i
                                    ? "text-primary-foreground hover:bg-primary/90 rounded-3xl bg-black p-1 font-semibold"
                                    : "hover:text-accent-foreground rounded-3xl p-1 hover:bg-gray-300"
                                }`
                          }
                          isActive={currentPage === i}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>,
                    );
                  }

                  if (endPage < totalPages - 1) {
                    if (endPage < totalPages - 2) {
                      pages.push(
                        <PaginationItem key="ellipsis-end">
                          <PaginationEllipsis className="text-muted-foreground" />
                        </PaginationItem>,
                      );
                    }

                    pages.push(
                      <PaginationItem key={totalPages - 1}>
                        <PaginationLink
                          onClick={() =>
                            !paginationLoading &&
                            handlePageChange(totalPages - 1)
                          }
                          className={
                            paginationLoading
                              ? "pointer-events-none opacity-50"
                              : "hover:text-accent-foreground min-w-[2.5rem] cursor-pointer rounded-3xl p-1 transition-colors duration-200 hover:bg-gray-300"
                          }
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>,
                    );
                  }

                  return pages;
                })()}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      if (!paginationLoading && currentPage < totalPages - 1) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                    className={
                      currentPage >= totalPages - 1 || paginationLoading
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer transition-colors duration-200"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
