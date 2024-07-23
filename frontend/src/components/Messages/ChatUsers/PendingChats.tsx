import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect } from "react";
import useMessageRequests from "@/hooks/messageRequest";
import { Check } from "lucide-react";
import { X } from "lucide-react";
const user = localStorage.getItem("user") || "{}";
const userId = JSON.parse(user).id;
const token = localStorage.getItem("token");
const PendingChats = () => {
  const {
    requests,
    fetchRequests,
  } = useMessageRequests(token as string);

  useEffect(() => {
    fetchRequests("pending", userId);
    console.log(requests);
  }, [userId]);
  return (
    <div>
      <div className="h-full font-spacegotesk">
        <div className="px-5">
          <Input placeholder="Search" className="border" />
        </div>
        <Separator className="mt-4 opacity-60" />
        <div className="px-5 mt-3">
          <h1>Pending Requests</h1>
        </div>
        <div className="h-full">
          <ScrollArea className="h-full ">
            {requests.map((request: any) => (
              <UserDetails request={request} />
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

interface UserDetailsProps {
  userId: string;
  receiverId: string;
  status: string;
  id: string;
  createdAt: string;
  receiver: {
    name: string;
    username: string;
    profilePic: string;
    verified: boolean;
  };
}

const UserDetails = ({ request }: { request: UserDetailsProps }) => {
  const {
    acceptRequest,
    rejectRequest,

  } = useMessageRequests(token as string);
  

  const handleAcceptRequest = () => {
    acceptRequest(request.receiverId, userId);
  };

  const handleRejectRequest = () => {
    rejectRequest(request.receiverId, userId);
  };

  return (
    <div className="flex gap-3 items-center w-full hover:bg-light-body my-3 rounded-lg px-2 hover:cursor-pointer">
      <div className="px-5 flex w-full py-3 ">
        <div className="m-2">
          <Avatar>
            <AvatarImage
              src={
                request?.receiver?.profilePic || "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>{request?.receiver?.name.at(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-between w-full">
          <div className="w-full">
            <h2 className="text-lg">{request?.receiver?.name}</h2>
            <div className="flex items-center justify-between w-full">
              <p className=" text-sm">@{request?.receiver?.username}</p>
              <div className="flex gap-2 w-full"></div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="p-2 border rounded-lg bg-button-clr" onClick={handleAcceptRequest}>  
              <Check className="w-5 h-5" color="white" />
            </div>
            <div className="p-2 border rounded-lg" onClick={handleRejectRequest}>
              <X className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PendingChats;
