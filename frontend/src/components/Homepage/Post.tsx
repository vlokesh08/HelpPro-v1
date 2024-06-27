import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PostProps {
  title: string;
  description: string;
  bounty: boolean;
  author: string;
  techstack: string;
  profile: string;
}

const Post = ({ title, description, bounty, author, techstack, profile }: PostProps) => {
  return (
    <div className="w-full">
      <Card className="dark:bg-[#283445] hover:border-[#3a86ff] hover:border-2">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              {
                <div className="flex items-center gap-3">
                  
                  <img
                    src={profile || "https://avatars.githubusercontent.com/u/54230353?v=4"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <h1 className=" text-lg font-semibold">{author}</h1>
                </div>

              }
              
              {bounty && (
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
            </div>
          </CardTitle>
          <CardDescription><h1 className="text-lg font-bold">{title}</h1></CardDescription>
        </CardHeader>
        <CardContent>
        {description.slice(0,50)+" ..."}
        </CardContent>
        <CardFooter>
          <p>
            TechStack:{" "}
            {techstack.split(",").map((tech, index) => (
              <span
                key={index}
                className="bg-gray-200 mx-1 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium px-2.5 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
