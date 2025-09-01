import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

import type { PersonDTO } from "../../interface/interface";
import { api } from "../../lib/api";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import InternalServerError from "../Error/internal-server-error";
import NotFound from "../Error/not-found-error";
import DetailsCard from "./components/DetailsCard";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PersonDTO>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPessoaDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get<PersonDTO>(`/pessoas/${id}`);
        setData(response.data);
      } catch (error: unknown) {
        let errorMsg = "Não foi possível carregar os detalhes dessa pessoa";

        if (error instanceof AxiosError) {
          errorMsg = error.response?.data?.message || errorMsg;
        } else if (error instanceof Error) {
          errorMsg = error.message;
        }

        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchPessoaDetails();
  }, [id]);

  if (loading) return <Loading />;
  if (!data?.id || Number(id) !== data.id) return <NotFound />;
  if (error) return <InternalServerError />;

  return (
    <>
      <Header />
      <DetailsCard data={data} />
      <Footer />
    </>
  );
};

export default Details;
