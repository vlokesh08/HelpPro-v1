
import { Skeleton } from "../ui/skeleton";

const HomeScreenLoading = () => {
  return (
    <div className="h-screen">
      <div className="flex h-screen justify-center bg-[#f5f7f7] w-full dark:bg-[#212c3c]">
        <div className=" m-[120px] flex flex-col gap-3">
            <Skeleton className="h-[150px] w-[450px] bg-slate-200" />
            <Skeleton className="h-[20px] w-[450px] bg-slate-200" />    
            <Skeleton className="h-[20px] w-[150px] bg-slate-200" />
            <Skeleton className="h-[20px] w-[320px] bg-slate-200" />
            <Skeleton className="h-[20px] w-[200px] bg-slate-200" />
            
        </div>
      </div>
    </div>
  );
};

export default HomeScreenLoading;
