import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  description: string;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Post[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.post<Post[]>(`${BACKEND_URL}/api/v1/search/search`, {
          query: query
        });
        setResults(response.data);
      } catch (error) {
        console.error('Error searching posts', error);
      }
    };

    if (query) {
      handleSearch();
      setShowResults(true);
    } else {
      setShowResults(false);
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <Input
        type="text"
        placeholder="Search"
        className="w-[450px]"
        value={query}
        onChange={(e) => { setQuery(e.target.value) }}
      />
      {showResults && (
        <div className="w-[450px] absolute">
          {results.map((post) => (
            <div key={post.id} className="mb-2 p-2 border rounded bg-white">
              <h2 className="text-2xl">{post.title}</h2>
              <p>{post.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
