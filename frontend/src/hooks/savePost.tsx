import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useSavePost() {
  const navigate = useNavigate();
  
  async function bookmarkBlog({ 
    id,
    isPost,
    isProject 
  } : {
    id : string
    isPost? : boolean
    isProject? : boolean
  }) {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/save/${id}`,
        { isPost, isProject },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (e) {
      return { error: "An error has occurred trying to bookmark the blog" };
    }
  }

  async function unbookmarkBlog({
    id,
    isPost,
    isProject,
  } : {
    id : string
    isPost? : boolean
    isProject? : boolean
  }) {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/v1/save/${id}`,
        { headers: { Authorization: `Bearer ${token}` },
        data: { isPost, isProject }}
      );
      return response.data;
    } catch (e) {
      return { error: "An error has occurred trying to unbookmark the blog" };
    }
  }

  async function checkIfBookmarkedProject(blogId : string) {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/save/project/${blogId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.bookmarked;
    } catch (e) {
      return false;
    }
  }

  async function checkIfBookmarkedOpenSource(blogId : string) {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/save/opensource/${blogId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.bookmarked;
    } catch (e) {
      return false;
    }
  }

  return {
    bookmarkBlog,
    unbookmarkBlog,
    checkIfBookmarkedProject,
    checkIfBookmarkedOpenSource,
  };
}
