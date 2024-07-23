import { Skeleton } from "../ui/skeleton";

const ChatProfilesLoading = () => {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex gap-3 w-full h-full items-center p-4 ">
        <div>
          <Skeleton className=" rounded-full h-[40px] w-[40px]" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[80px] h-[20px]" />
          <Skeleton className="w-[120px] h-[20px]" />
        </div>
      </div>
      <div className="flex gap-3 w-full h-full items-center p-4 ">
        <div>
          <Skeleton className=" rounded-full h-[40px] w-[40px]" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[80px] h-[20px]" />
          <Skeleton className="w-[120px] h-[20px]" />
        </div>
      </div>
      <div className="flex gap-3 w-full h-full items-center p-4 ">
        <div>
          <Skeleton className=" rounded-full h-[40px] w-[40px]" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[80px] h-[20px]" />
          <Skeleton className="w-[120px] h-[20px]" />
        </div>
      </div>
    </div>
  );
};
export default ChatProfilesLoading;
