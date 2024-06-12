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
}

const Post = ({ title, description, bounty, author, techstack }: PostProps) => {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold">{title}</h1>
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
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">Author: {author}</p>
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