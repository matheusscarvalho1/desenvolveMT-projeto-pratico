import { Spinner } from "../../components/ui/shadcn-io/spinner";
import Footer from "./Footer";
import Header from "./Header";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <Spinner variant="ellipsis" className="text-blue-500" size={40} />
      </div>
      <Footer />
    </div>
  );
};

export default Loading;
