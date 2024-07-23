import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useMessageRequests from "@/hooks/messageRequest";
import { useEffect } from "react";
const user = localStorage.getItem("user") || "{}";
const userId = JSON.parse(user).id;
const token = localStorage.getItem("token");
import { useDispatch } from "react-redux";
import { setChatData } from "@/Redux/Slice/chatSlice";
import { socket } from "@/socket/SocketInstance";
import ChatProfilesLoading from "@/components/LoadingPages/ChatProfilesLoading";

const AcceptedChats = ( {clicked, setClicked} : any) => {
  const { requests, fetchRequests, loading } = useMessageRequests(token as string);

  useEffect(() => {
    fetchRequests("accepted", userId);
    console.log(requests);
  }, [userId]);

  if(loading) return <ChatProfilesLoading />;

  return (
    <div className="h-full font-spacegotesk">
      <div className="px-5">
        <Input placeholder="Search" className="border" />
      <Separator className="mt-4 opacity-60" />
      </div>
      <div className="h-full p-5">
        <ScrollArea className="h-full ">
          {requests.map((request: any) => (
            <UserDetails request={request} clicked={clicked} setClicked={setClicked} />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

interface UserDetailsProps {
  userId: string;
  receiverId: string;
  roomId: string;
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

const UserDetails = ({ request, clicked, setClicked }: { request: UserDetailsProps, clicked : any, setClicked:any }) => {
  const dispatch = useDispatch();

  const handleSaveUserDetails = () => {
    dispatch(
      setChatData({
        receiverId: request.receiverId,
        userId: request.userId,
        roomId: request.roomId,
        lastMessage: null,
        extraData: null,
      })
    );
    const roomId = request.roomId;
    const receiverId = request.receiverId;
    socket.emit("join-room", {receiverId,roomId});
    setClicked(!clicked);
  };


  return (
    <div className="flex gap-3 items-center w-full dark:hover:bg-dark-box hover:bg-light-body my-3 rounded-lg px-2 hover:cursor-pointer" onClick={handleSaveUserDetails}>
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
        </div>
      </div>
    </div>
  );
};

export default AcceptedChats;
