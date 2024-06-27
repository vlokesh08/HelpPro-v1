import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

interface IssuesProps {
  link: string;
}

const Issues: React.FC<IssuesProps> = ({ link }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const parsedUrl = parseGitHubUrl(link);
  const owner = parsedUrl?.owner;
  const repo = parsedUrl?.repo;

  const fetchIssues = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues`,
        {
          params: {
            per_page: 10,
            page: page,
          },
        }
      );

      setIssues(response.data);

      const linkHeader = response.headers.link;
      if (linkHeader) {
        const lastPageMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
        if (lastPageMatch) {
          setTotalPages(Number(lastPageMatch[1]));
        }
      } else {
        setTotalPages(1);
      }
    } catch (err) {
      setError("Error fetching issues");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (owner && repo) {
      fetchIssues(currentPage);
    }
  }, [owner, repo, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (loading) {
    return <p className="dark:text-white">Add Github Link to get the Issues</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Issues</h2>
      {issues.length === 0 ? (
        <Card>
          <CardHeader className="flex justify-center">
            <CardTitle className="text-center">We Found no issues for this Repository</CardTitle>
          </CardHeader>
        </Card>
      ) : (
        <ul className="list-disc pl-5">
          {issues.map((issue) => (
            <li key={issue.id} className="mb-2">
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {issue.title}
              </a>
              <p className="text-sm text-gray-600">By {issue.user.login}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Issues;
