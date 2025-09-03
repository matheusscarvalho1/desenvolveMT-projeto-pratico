import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod/v3";

import jsonData from "../../../public/abitus-pessoas.json";
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
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import InternalServerError from "../Error/internal-server-error";
import Board from "./components/Board";

const Home = () => {
  const [data, setData] = useState<PersonDTO[]>([]);
  const [totalPages, setTotalPages] = useState<number>();
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
    status: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      faixaIdadeInicial: null,
      faixaIdadeFinal: null,
      sexo: "",
      status: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newFilters: FormFilter = {};

    if (values.nome) newFilters.nome = values.nome;
    if (values.faixaIdadeInicial)
      newFilters.faixaIdadeInicial = values.faixaIdadeInicial;
    if (values.faixaIdadeFinal)
      newFilters.faixaIdadeFinal = values.faixaIdadeFinal;
    if (values.sexo) newFilters.sexo = values.sexo;
    if (values.status) newFilters.status = values.status;

    setFilters(newFilters);

    fetchData(0, newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    form.reset();
    fetchData(0, {});
  };

  // Funções de paginação
  const handlePageClick = (page: number) => {
    fetchData(page, filters);
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      fetchData(currentPage - 1, filters);
    }
  };

  const handleNext = () => {
    if (totalPages && currentPage < totalPages - 1) {
      fetchData(currentPage + 1, filters);
    }
  };

  const fetchData = (page: number = 0, filters?: FormFilter) => {
    try {
      if (Array.isArray(jsonData.data.content)) {
        // Aqui podemos aplicar filtros simulando a API
        let result = [...jsonData.data.content];

        // Filtro por nome
        if (filters?.nome) {
          result = result.filter((p) =>
            p.nome.toLowerCase().includes(filters.nome!.toLowerCase()),
          );
        }

        // Filtro por faixa etária
        if (filters?.faixaIdadeInicial !== undefined) {
          result = result.filter((p) => p.idade >= filters.faixaIdadeInicial!);
        }
        if (filters?.faixaIdadeFinal !== undefined) {
          result = result.filter((p) => p.idade <= filters.faixaIdadeFinal!);
        }

        // Filtro por sexo
        if (filters?.sexo) {
          result = result.filter((p) => p.sexo === filters.sexo);
        }

        // Filtro por status (vivo/desaparecido)
        if (filters?.status) {
          if (filters.status === "DESAPARECIDO") {
            result = result.filter((p) => !p.vivo);
          } else if (filters.status === "LOCALIZADO") {
            result = result.filter((p) => p.vivo);
          }
        }

        setData(result);
        setTotalPages(Math.ceil(result.length / 200)); // ajusta conforme seu pageSize
        setCurrentPage(page);
      } else {
        throw new Error("JSON inválido");
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar dados");
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
                      className="bg-ba w-full cursor-pointer border-blue-200 bg-white"
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
                type="submit"
                onClick={handleClearFilters}
              >
                Limpar filtro
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Board data={data} />
      {totalPages && totalPages > 1 && (
        <Pagination className="p-6">
          <PaginationContent className="flex gap-6">
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious
                className={
                  currentPage === 0
                    ? "pointer-events-none opacity-50"
                    : undefined
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
      )}
      <Footer />
    </div>
  );
};

export default Home;
