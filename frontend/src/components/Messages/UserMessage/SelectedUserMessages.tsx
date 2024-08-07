import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useMessages from "@/hooks/messages";
import io from "socket.io-client";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const SockerURL = import.meta.env.VITE_SOCKET_URL;

const socket = io(SockerURL, {
  transports: ["websocket"],
  reconnection: true,
});

interface Message {
  id: string;
  sender: string;
  receiver?: string;
  content: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  username: string;
  profilePic: string;
  verified: boolean;
}

const SelectedUserMessages: React.FC = () => {
  const user = localStorage.getItem("user") || "{}";
  const userId = JSON.parse(user).id;
  const chatData = useSelector((state: any) => state.chat);
  const { receiverId, roomId } = chatData;
  const [receiver, setReceiver] = useState<User | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const userProfilePic = JSON.parse(user).profilePic;
  const { messages } = useMessages();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref to the last message

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom whenever messages change
  }, [messages]);

  useEffect(() => {
    // fetchMessages();
    const fetchReceiver = async () => {
      console.log("receiver called");
      const res = await axios.get(`${BACKEND_URL}/api/v1/user/${receiverId}`);
      setReceiver(res.data[0]);
    };
    fetchReceiver();
  }, []);

  const handleEnterKeyPress = (event : any) => {
    if (event.key === 'Enter') {
      // Call your function here
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    const message = {
      sender: userId,
      receiverId,
      roomId,
      content: newMessage,
    };
    socket.emit("send-message", message);
    setNewMessage("");
  };

  return (
    <div className="p-5 flex flex-col h-full">
      <div className="flex gap-3 px-8">
        <Avatar>
          <AvatarImage
            src={receiver?.profilePic || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>{receiver?.name?.at(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1>{receiver?.name}</h1>
          <p>@{receiver?.username}</p>
        </div>
      </div>
      <div className="border dark:border-slate-600 dark:bg-dark-box rounded-lg p-5 my-4 flex-grow overflow-y-auto">
        {messages?.map((message: any) => (
          <MessageBubble
            key={message.id}
            message={message}
            receiverProfile={receiver?.profilePic || ""}
            senderProfile={userProfilePic}
            isOwnMessage={message.sender === userId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2 h-[120px] md:h-[80px] items-center justify-center">
        <Input
          type="text"
          className="w-full h-full border rounded-lg p-3 dark:bg-dark-box"
          placeholder="Type a message..."
          value={newMessage}
          onKeyPress={handleEnterKeyPress}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          className="bg-blue-600 h-full w-[60px] text-white rounded-lg p-3 flex justify-center items-center "
          onClick={handleSendMessage}
        >
          <Send size={18} className="" />
        </Button>
      </div>
    </div>
  );
};

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  receiverProfile: string;
  senderProfile: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
  receiverProfile,
  senderProfile,
}) => {
  return (
    <div>
      {isOwnMessage ? (
        <div className="chat-message mt-3">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-s max-w-xs mx-2 order-1 items-end">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                  {message.content}
                </span>
                <div>
                  <span className="text-gray-400 text-xs">
                    {new Date(message.createdAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
            <img
              src={senderProfile || "https://github.com/shadcn.png"}
              alt="My profile"
              className="w-6 h-6 rounded-full order-2"
            />
          </div>
        </div>
      ) : (
        <div className="chat-message mt-3">
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-s max-w-xs mx-2 order-2 items-start">
              <div className="w-full">
                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                  {message.content}
                </span>
                <div className="w-full justify-end">
                  <span className="text-gray-400 text-xs">
                    {new Date(message.createdAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
            <img
              src={receiverProfile || "https://github.com/shadcn.png"}
              alt="My profile"
              className="w-6 h-6 rounded-full order-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedUserMessages;
