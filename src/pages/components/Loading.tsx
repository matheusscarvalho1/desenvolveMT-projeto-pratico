import { Spinner } from "../../components/ui/shadcn-io/spinner";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface LoadingProps {
  fullPage?: boolean;
  size?: number;
}

const Loading = ({ fullPage, size }: LoadingProps) => {
  const content = (
    <div className="flex flex-1 items-center justify-center">
      <Spinner variant="circle-filled" className="text-blue-500" size={size} />
    </div>
  );

  return fullPage ? (
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
  ) : (
    content
  );
};

export default Loading;
