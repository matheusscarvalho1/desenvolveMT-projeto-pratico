import { useEffect, useState } from "react";
import { useParams } from "react-router";

import jsonData from "../../../public/abitus-pessoas.json";
import type { PersonDTO } from "../../interface/interface";
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
    try {
      setLoading(true);
      const pessoa = jsonData.data.content.find(
        (item) => item.id === Number(id),
      );
      setData(pessoa);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <InternalServerError />;
  if (!data?.id || Number(id) !== data.id) return <NotFound />;

  return (
    <>
      <Header />
      <DetailsCard data={data} />
      <Footer />
    </>
  );
};

export default Details;
