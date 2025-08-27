import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-grow items-center justify-center">
        <h1 className="text-center text-3xl font-semibold text-gray-800">
          Home Page
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
