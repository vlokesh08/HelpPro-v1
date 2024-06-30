import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
const LoadingPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex h-screen justify-center py-12 bg-light-body dark:bg-dark-body">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[325px] w-[650px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[550px]" />
            <Skeleton className="h-4 w-[400px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoadingPage;
