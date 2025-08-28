import { Spinner } from "../../components/ui/shadcn-io/spinner";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface LoadingProps {
  size?: number;
}

const Loading = ({ size }: LoadingProps) => {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <Spinner
          variant="circle-filled"
          className="text-blue-500"
          size={size}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Loading;
