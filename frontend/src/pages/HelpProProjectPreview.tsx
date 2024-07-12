import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Toaster } from "sonner";
import AuthorDetails from "@/components/ProjectPreviewPage/AuthorDetails";
import { Github } from "lucide-react";
import { Send } from "lucide-react";
import HomeScreenLoading from "@/components/LoadingPages/HomeScreenLoading";
import ContactDetails from "@/components/ProjectPreviewPage/ContactDetails";
import Comments from "@/components/Comments/Comments";
import SavePost from "@/components/SavePost";
import DeleteProject from "@/components/Operations/DeleteProject";
import EditProject from "@/components/Operations/EditProject";
interface Post {
  id: string;
  title: string;
  content: string;
  description: string;
  authorId: string;
  techstack: string;
  link: string;
  bounty: boolean;
  bountyValue: string;
  author: {
    name: string;
    username: string;
    profilePic: string;
    verified: boolean;
  };
  completion: string;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  // Define an array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the day, month, and year
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Return the formatted date
  return `${day} ${month} ${year}`;
}

const HelpProProjectPreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>({});
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
  const [techStack, setTechStack] = useState<string[]>([]);
  const user: string = localStorage.getItem("user") || "{}";
  const user_id = JSON.parse(user).id;


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get<{ post: Post }>(
          `${BACKEND_URL}/api/v1/project/getPostById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data.post);
        setPost(res.data.post);
        const user = {
          id: res.data.post.authorId,
          name: res.data.post.author.name,
          username: res.data.post.author.username,
          avatar: res.data.post.author.profilePic,
          verified : res.data.post.author.verified,
        };
        setUserDetails(user);
        setTechStack(res.data.post.techstack.split(","));
      } catch (e) {
        console.error(e);
        setError("Failed to fetch the post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, BACKEND_URL]);

  const handleDelete = () => {
    // Add delete logic here
  };

  if (loading) {
    return (
      <div>
        <HomeScreenLoading />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="animate-fadeIn dark:animate-fadeInDark lg:px-[20rem] mx-auto p-4 font-spacegotesk bg-light-body dark:bg-dark-body dark:text-white h-auto min-h-screen">
        <div>
          <AuthorDetails userDetails={userDetails} />
        </div>

        {user_id === post?.authorId && (
          <div className="flex justify-end gap-5 my-5">
            <Dialog>
              <DialogTrigger>
                <Button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-pencil mr-3"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="flex items-center justify-center w-1/2 h-3/4">
                <EditProject />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger>
                <Button onClick={handleDelete}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trash-2 mr-3"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent className="w-1/2">
                <DeleteProject />
              </DialogContent>
            </Dialog>
          </div>
        )}
        {post ? (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <h1 className="text-5xl font-semibold">{post.title}</h1>
              {post.bounty && (
                <span className="bg-green-100 flex h-12 items-center gap-2 text-green-800 text-sm font-medium px-2.5 py-1 rounded dark:bg-green-900 dark:text-green-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-circle-dollar-sign"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                    <path d="M12 18V6" />
                  </svg>
                  Bounty
                </span>
              )}
            </div>

            <div className="">
              <p className="text-lg w-full text-justify">{post.description}</p>
            </div>
            <div className="flex justify-between">
              <div>
                {post.bountyValue && (
                  <p className="text-lg font-semibold">
                    Bounty: ${post.bountyValue}
                  </p>
                )}
              </div>
              <div>
                {post.completion && (
                  <p className="text-lg font-semibold">
                    Completion: {formatDate(post.completion)}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4 font-semibold">
              <h2>TechStack</h2>
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium px-2.5 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <a href={post.link} target="__blank" rel="noopener noreferrer">
                <Button>
                  <Github size={18} className="mr-1" />
                  Github
                </Button>
              </a>
              <Dialog>
                <DialogTrigger>
                  <Button>
                    <Send size={18} className="mr-1" />
                    Contact
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-1/2">
                  <ContactDetails id={post.authorId} />
                </DialogContent>
              </Dialog>
              <SavePost 
              id={id ?? ""}
              isProject={true}
              isPost={false}
              />
            </div>
            <div className="mt-4">
              <Comments />
            </div>
          </div>
        ) : (
          <p>Post not found.</p>
        )}
      </div>
    </div>
  );
};

export default HelpProProjectPreview;
