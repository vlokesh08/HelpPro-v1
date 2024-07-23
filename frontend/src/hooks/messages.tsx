import { useState, useEffect } from 'react';
import axios from 'axios';
import { socket } from '@/socket/SocketInstance';
import { Message } from '@/types';
const useMessages = () => {
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const SockerURL = import.meta.env.VITE_SOCKET_URL;



  const editMessage = async (id : string, content:string) => {
    try {
      const response = await axios.put(`${SockerURL}/${id}`, { content });
      setMessages((prevMessages : any) =>
        prevMessages.map((msg: any) => (msg.id === id ? response.data : msg))
      );
    } catch (err:any) {
      setError(err);
    }
  };

  const deleteMessage = async (id:string) => {
    try {
      setLoading(true);
      await axios.delete(`${SockerURL}/${id}`);
      setMessages((prevMessages : any) => prevMessages.filter((msg:any) => msg.id !== id));
    } catch (err:any) {
      setError(err);
    }
    finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    socket.on("receive-message", (message: Message) => {
        console.log("Receive Message")
      setMessages((prevMessages : any) => [...prevMessages, message]);
    });

    socket.on("load-messages", (messages: Message[]) => {
        console.log("Loading Message", messages)
      setMessages(messages);
    });

};  

  useEffect(() => {
    
    fetchMessages();

    return () => {
      socket.off("receive-message");
      socket.off("load-messages");
    };
  }, []);

  return {
    messages,
    loading,
    error,
    fetchMessages,
    editMessage,
    deleteMessage,
    setMessages,
  };
};

export default useMessages;
