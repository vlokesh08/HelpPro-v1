import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  description: string;
  techstack: string; // Adding techstack to the Post interface
}

const HelpProSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Post[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const handleSearch = async () => {
      if (!query) {
        setResults([]);
        setShowResults(false);
        return;
      }

      try {
        const response = await axios.post<Post[]>(`${BACKEND_URL}/api/v1/search/project`, { query });
        setResults(response.data);
        setShowResults(true);
      } catch (error) {
        console.error('Error searching posts', error);
      }
    };

    handleSearch();
  }, [query, BACKEND_URL]);

  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="Search"
        className=""
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {showResults && (
        <div className="w-full">
          {results.map((post) => (
            <div key={post.id} className="mb-2 p-2 rounded bg-white my-3 dark:bg-dark-box">
              <h2 className="text-2xl text-white p-2">{post.title}</h2>
              <p className="my-1 px-2">{post.description.slice(0, 50)}...</p>
              <div className="flex gap-1">
                {post.techstack.split(",").map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 mx-1 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium px-2.5 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpProSearch;
