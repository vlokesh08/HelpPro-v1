import axios from "axios";
import { useEffect, useState } from "react";
import MiniPosts from "../LoadingPages/MiniPosts";
const SavedPosts = ( {userId } : {userId : string}) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(false);
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        async function fetchSavedPosts() {
            try {
                setLoading(true);
                const response = await axios.get(`${BACKEND_URL}/api/v1/save/all/${userId}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setLoading(false);
                setSavedPosts(response.data);
            } catch (error) {
                setLoading(false);
            }
        }
        fetchSavedPosts();
    }, []);

    if(loading) {
        return <div><MiniPosts /></div>
    }
  return (
    <div>
        {
            savedPosts && savedPosts.length > 0 ? savedPosts.map((post: any) => (
                <div key={post.id} className="bg-white dark:bg-[#283445] dark:text-white rounded-lg border p-4 my-3 ">
                    {
                        post.isPost ? (
                            <div>
                                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Opensource</span>
                                <a href={`project/${post.project.id}`} className="my-5">
                                    <h1 className="text-lg font-semibold my-5">{post.post.title}</h1>
                                    <h3>{post.post.description}</h3>
                                </a>
                            </div>
                        ) : (
                            <div>
                                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Project</span>
                                <a href={`project/${post.project.id}`} className="my-5">
                                    <h1 className="text-lg font-semibold">{post.project.title}</h1>
                                    <h3>{post.project.description}</h3>
                                </a>
                            </div>
                        )
                    }
                </div>
            )) : <div className='w-full dark:bg-[#283445] h-[150px] flex justify-center align-middle items-center'>
                <div className="flex justify-center flex-col">
                    <h1 className=" text-lg font-semibold">You have No Saved Posts!</h1>
                </div>
            </div>
        }
    </div>
  )
}

export default SavedPosts