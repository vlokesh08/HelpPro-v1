import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import MiniPosts from "../LoadingPages/MiniPosts";

const OpenSourceProfilePosts = ({ userId }: { userId: string }) => {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
  const user = localStorage.getItem("user");
  const userObj = JSON.parse(user as string);
  const loggedUserId = userObj.id;

  const user_id = userId;
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/v1/post/getUserPosts/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPosts(res.data.posts);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div>
        <MiniPosts />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div>
        {userId === loggedUserId ? (
          <div className="w-full dark:bg-[#283445] h-[150px] flex justify-center align-middle items-center">
            <div className="flex justify-center flex-col">
              <h1 className=" text-lg font-semibold">You have No Posts!</h1>
              <Button
                className=""
                variant={"primary"}
                onClick={() => {
                  window.location.href = "/newpost";
                }}
              >
                Create a Post
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full dark:bg-[#283445] h-[150px] flex justify-center align-middle items-center">
            <div className="flex justify-center flex-col">
              <h1 className=" text-lg font-semibold">No Posts Found!</h1>
            </div>
          </div>
        )
      }
      </div>
    );
  }

  return (
    <div>
      {posts.map((post: any) => (
        <div
          key={post.id}
          className="bg-white dark:bg-[#283445] dark:text-white rounded-lg border border-slate-300 hover:border-button-clr p-4 my-3 "
        >
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-500 my-3">{post.description}</p>
          <p className=" overflow-hidden">
            TechStack:{" "}
            {post?.techstack.split(",").map((tech : any, index : any) => (
              <span
                key={index}
                className="bg-gray-200 mx-1 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium px-2.5 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OpenSourceProfilePosts;
