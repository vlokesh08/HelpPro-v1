import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatUsers from "./ChatUsers/ChatUsers";
import { useEffect, useState } from "react";
import UserNotSelected from "./UserMessage/SelectedUserMessages";
import SelectedUserMessages from "./UserMessage/UserNotSelected";
import { socket } from "@/socket/SocketInstance";

const ChatPageUi = () => {
  const user  = localStorage.getItem("user") || "{}";
  const userId = JSON.parse(user).id;
  useEffect(() => {
    socket.emit("authenticate", userId);
  },[]);
    const [clicked, setClicked] = useState(true);
  return (
    <div className="w-full h-[calc(100vh-58px)] dark:text-white dark:bg-dark-body">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        <ResizablePanel minSize={25} maxSize={25}>
            <ChatUsers clicked={clicked} setClicked={setClicked} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={75} maxSize={75}>
            {
                clicked ? (
                    <SelectedUserMessages />
                ) : (
                    <UserNotSelected />
                )
            }
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ChatPageUi;
