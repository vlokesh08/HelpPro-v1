import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import MiniPosts from "../LoadingPages/MiniPosts";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteProject from "../Operations/DeleteProject";
import EditProject from "../Operations/EditProject";

const HelpProProfilePosts = ({ userId }: { userId: string }) => {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
  const user_id = userId;
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/v1/project/getUserPosts/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setPosts(res.data.posts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
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
      <div className="w-full dark:bg-[#283445] h-[150px] flex justify-center align-middle items-center">
        <div className="flex justify-center flex-col">
          <h1 className=" text-lg font-semibold">You have No Posts!</h1>
          <Button
            className=""
            variant={"primary"}
            onClick={() => {
              window.location.href = "/newproject";
            }}
          >
            Create a Post
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post: any) => (
        <div
          key={post.id}
          className="bg-white dark:bg-[#283445] dark:text-white rounded-lg border p-7 my-3 hover:border-button-clr  "
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger>
                  <Button className="h-3/4">
                    <Pencil className="h-[14px] w-[14px] mr-1" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-1/2">
                  <EditProject />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                <Button className="h-3/4">
                <Trash2 className="h-[14px] w-[14px] mr-1" />
              </Button>
                </DialogTrigger>
                <DialogContent className="w-1/2">
                  <DeleteProject />
                </DialogContent>
              </Dialog>

            </div>
          </div>
          <p className="text-gray-500">{post.description}</p>
          {post.techstack.split(",").map((tech: any) => (
            <span
              key={post.id}
              className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
            >
              {tech}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HelpProProfilePosts;
