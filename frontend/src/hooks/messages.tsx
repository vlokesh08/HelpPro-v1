import { useState, useEffect } from 'react';
import axios from 'axios';
import { socket } from '@/socket/SocketInstance';
import { Message } from '@/types';

const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const SockerURL = import.meta.env.VITE_SOCKET_URL;

  const editMessage = async (id: string, content: string) => {
    try {
      const response = await axios.put(`${SockerURL}/${id}`, { content });
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg.id === id ? response.data : msg))
      );
    } catch (err: any) {
      setError(err);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`${SockerURL}/${id}`);
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = () => {
    socket.emit('load-messages');

    socket.on('receive-message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('load-messages', (messages: Message[]) => {
      setMessages(messages);
    });
  };

  useEffect(() => {
    fetchMessages();

    return () => {
      socket.off('receive-message');
      socket.off('load-messages');
    };
  }, []);

  return {
    messages,
    loading,
    error,
    editMessage,
    deleteMessage,
    fetchMessages,
    setMessages,
  };
};

export default useMessages;
