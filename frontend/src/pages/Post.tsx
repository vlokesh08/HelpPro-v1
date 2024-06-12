import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditPost from "@/components/Post/EditPost";
import DeletePost from "@/components/Post/DeletePost";
import { Toaster } from "sonner";

interface Post {
  id: string;
  title: string;
  content: string;
  description: string;
  authorId: string;
  techstack: string;
  link: string;
}

interface GitHubIssue {
  id: number;
  title: string;
  html_url: string;
  // Add any other relevant fields from GitHub issues
}

const parseGitHubUrl = (url: string) => {
  const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
  const match = url.match(regex);
  if (match) {
    return {
      owner: match[1],
      repo: match[2],
    };
  }
  return null;
};

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
  const navigate = useNavigate();
  const [techStack, setTechStack] = useState<string[]>([]);
  const user: string = localStorage.getItem("user") || "{}";
  const user_id = JSON.parse(user).id;
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get<{ post: Post }>(
          `${BACKEND_URL}/api/v1/post/getPostById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPost(res.data.post);
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

  useEffect(() => {
    const fetchIssues = async () => {
      if (post?.link) {
        const parsedUrl = parseGitHubUrl(post.link);
        if (parsedUrl) {
          const { owner, repo } = parsedUrl;
          try {
            const response = await axios.get<GitHubIssue[]>(
              `https://api.github.com/repos/${owner}/${repo}/issues`,
              {
                params: {
                  per_page: 10,
                  page: page,
                },
              }
            );
            setIssues(response.data);
          } catch (err) {
            console.error(err);
            setError("Error fetching issues");
          }
        }
      }
    };

    fetchIssues();
  }, [post, page]);

  const handleDelete = () => {
    // Add delete logic here
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="lg:px-[20rem] mx-auto p-4">
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
              <DialogContent>
                <EditPost />
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
              <DialogContent>
                <DeletePost />
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
            <p className="text-lg text-justify">{post.description}</p>
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
            <div>
              <a href={post.link} target="__blank" rel="noopener noreferrer">
                <Button>Github</Button>
              </a>
            </div>
            <div>
              <h2 className="font-semibold text-lg">Issues</h2>
              {issues.length > 0 ? (
                <ul className="">
                  {issues.map((issue) => (
                    <li key={issue.id}>
                      <Card className="my-3">
                        <CardHeader>
                          <CardTitle>
                            <div className="flex justify-between">
                              {issue.title}
                              <Button className="ml-2">
                                <a
                                  href={issue.html_url}
                                  target="__blank"
                                  rel="noopener noreferrer"
                                >
                                  Open Issue
                                </a>
                              </Button>
                            </div>
                          </CardTitle>
                          <CardDescription>
                            By {issue.user?.login}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                      {/* <a
                        href={issue.html_url}
                        target="__blank"
                        rel="noopener noreferrer"
                      >
                        {issue.title}
                      </a> */}
                    </li>
                  ))}
                </ul>
              ) : (
                <Card className="my-3">
                  <CardHeader className="flex justify-center">
                    <CardTitle className="text-center">
                      We Found no issues for this Repository
                    </CardTitle>
                  </CardHeader>
                </Card>
              )}
              <div className="flex gap-2">
                <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                  Previous
                </Button>
                <Button onClick={() => setPage(page + 1)}>Next</Button>
              </div>
            </div>
          </div>
        ) : (
          <p>Post not found.</p>
        )}
      </div>
    </div>
  );
};

export default Post;
