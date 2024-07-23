import { useState } from 'react';
import axios from 'axios';

const useMessageRequests = (jwtToken : string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requests, setRequests] = useState([]);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jwtToken}`,
  };

  const sendRequest = async (senderId : string, receiverId : string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${baseUrl}/api/v1/messages/send-request`, { senderId, receiverId }, { headers });
      return response.data;
    } catch (err : any) {
        console.log(err.response?.data?.message)
      setError(err.response?.data?.message || 'Failed to send request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const acceptRequest = async (senderId : string, receiverId : string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${baseUrl}/api/v1/messages/accept-request`, { senderId, receiverId }, { headers });
      return response.data;
    } catch (err : any) {
      setError(err.response?.data?.error || 'Failed to accept request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rejectRequest = async (senderId : string, receiverId : string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${baseUrl}/api/v1/messages/reject-request`, { senderId, receiverId }, { headers });
      return response.data;
    } catch (err : any) {
      setError(err.response?.data?.error || 'Failed to reject request');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async (status: string, userId:string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseUrl}/api/v1/messages/get-${status}-requests/${userId}`, { 
        headers,
      });

      setRequests(response.data);
    } catch (err : any) {
      setError(err.response?.data?.error || 'Failed to fetch requests');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const searchMessages = async (name:string, status:string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseUrl}/search-messages`, {
        headers,
        params: { name, status },
      });
      setRequests(response.data);
    } catch (err : any) {
      setError(err.response?.data?.error || 'Failed to search messages');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    requests,
    sendRequest,
    acceptRequest,
    rejectRequest,
    fetchRequests,
    searchMessages,
  };
};

export default useMessageRequests;
