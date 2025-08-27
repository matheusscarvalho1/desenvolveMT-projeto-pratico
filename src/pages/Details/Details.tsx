import Footer from "../components/Footer";
import Header from "../components/Header";

const Details = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex flex-grow items-center justify-center p-8">
        <div className="rounded-xl bg-white p-10 shadow-lg">
          <h1 className="text-center text-3xl font-semibold text-gray-800">
            Details Page
          </h1>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Details;
