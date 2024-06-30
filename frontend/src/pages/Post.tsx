import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EditPost from "@/components/Operations/EditPost";
import DeletePost from "@/components/Operations/DeletePost";
import { Toaster } from "sonner";
import { Star } from "lucide-react";
import LoadingPage from "./LoadingPage";

interface Post {
  id: string;
  title: string;
  content: string;
  description: string;
  authorId: string;
  techstack: string;
  link: string;
  bounty: number;
}

interface GitHubIssue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

interface GitHubRepo {
  stargazers_count: number;
  topics: string[];
  updated_at: string;
}

const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

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
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [starCount, setStarCount] = useState<number>(0);
  const [topics, setTopics] = useState<string[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
  const user: string = localStorage.getItem("user") || "{}";
  const user_id = JSON.parse(user).id;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get<{ post: Post }>(`${BACKEND_URL}/api/v1/post/getPostById/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPost(res.data.post);
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
            const response = await axios.get<GitHubIssue[]>(`https://api.github.com/repos/${owner}/${repo}/issues`, {
              params: {
                per_page: 10,
                page: page,
              },
            });
            setIssues(response.data);
          } catch (err) {
            console.error(err);
            setError("Error fetching issues");
          }
        }
      }
    };

    const getDetails = async () => {
      if (post?.link) {
        const parsedUrl = parseGitHubUrl(post.link);
        if (parsedUrl) {
          const { owner, repo } = parsedUrl;
          try {
            const response = await axios.get<GitHubRepo>(`https://api.github.com/repos/${owner}/${repo}`);
            setStarCount(response.data.stargazers_count);
            setTopics(response.data.topics);
            setLastUpdated(response.data.updated_at);
          } catch (err) {
            console.error(err);
            setError("Error fetching repository details");
          }
        }
      }
    };

    if (post) {
      fetchIssues();
      getDetails();
    }
  }, [post, page]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="lg:px-[20rem] mx-auto p-4 font-spacegotesk bg-light-body dark:bg-dark-body dark:text-white">
        {post ? (
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h1 className="text-5xl font-semibold">{post.title}</h1>
              {post.bounty && (
                <span className="bg-green-100 flex items-center gap-2 text-green-800 text-sm font-medium px-2.5 py-1 rounded dark:bg-green-900 dark:text-green-300">
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
              {user_id === post.authorId && (
                <div className="flex gap-5">
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
            </div>
            <div className="w-full text-justify">
              <p className="text-lg">{post.description}</p>
            </div>
            <div className="flex gap-4 font-semibold">
              <h2>TechStack</h2>
              {post.techstack.split(",").map((tech, index) => (
                <span key={index} className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium px-2.5 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <div>
                  <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    <Star width={18} className="mr-2" /> {starCount} Stars
                  </span>
                </div>
                <div>
                  <span className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium px-2.5 py-1 rounded">
                    Last Updated: {timeAgo(lastUpdated)}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="font-semibold p-2">Topics</h2>
                <div className="dark:bg-gray-800 bg-gray-200 rounded-lg p-4">
                  <span className="text-gray-800 dark:text-gray-200 text-sm font-medium py-1 rounded">
                    {topics.join(", ")}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <a href={post.link} target="__blank" rel="noopener noreferrer">
                <Button>Github</Button>
              </a>
            </div>
            <div>
              <h2 className="font-semibold text-lg">Issues</h2>
              {issues.length > 0 ? (
                <ul>
                  {issues.map((issue) => (
                    <li key={issue.id}>
                      <Card className="my-3">
                        <CardHeader>
                          <CardTitle>
                            <div className="flex justify-between">
                              {issue.title}
                              <Button className="ml-2">
                                <a href={issue.html_url} target="__blank" rel="noopener noreferrer">
                                  Open Issue
                                </a>
                              </Button>
                            </div>
                          </CardTitle>
                          <CardDescription>By {issue.user?.login}</CardDescription>
                        </CardHeader>
                      </Card>
                    </li>
                  ))}
                </ul>
              ) : (
                <Card className="my-3">
                  <CardHeader className="flex justify-center">
                    <CardTitle className="text-center">
                      We found no issues for this repository
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
