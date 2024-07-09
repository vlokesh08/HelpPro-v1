import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Follow from "../Follow";
import VerifiedButton from "../VerifiedButton";

interface UserProfile {
  id: number;
  name: string;
  username: string;
  profilePic: string;
  verified: boolean;
}

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<UserProfile[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/user/search/${query}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error searching posts", error);
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
    <div className="flex gap-2 font-spacegotesk mr-3">
      <Dialog>
        <DialogTrigger>
          <Button variant="outline" size="icon" className="border-none">
            <Search className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-1/2">
          <DialogHeader>
            <DialogTitle className="font-spacegotesk">Search User Profiles</DialogTitle>
            <DialogDescription>
              <div className="w-full mt-2">
                <Input
                  type="text"
                  placeholder="Search"
                  className="w-full border-slate-300 focus-visible:ring-neutral-200"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
                {showResults && (
                  <div className="w-full mt-2 font-spacegotesk">
                    {results.map((post) => (
                    <a href={`/profile/${post.id}`}>
                      <div
                        key={post.id}
                        className="mb-2 p-2 border rounded bg-white flex gap-3 items-center w-full"
                      >
                        <div>
                          <img
                            src={post.profilePic}
                            alt="profile"
                            className="w-10 h-10 rounded-full"
                          />
                        </div>
                        <div className="flex justify-between w-full items-center">
                          <div>
                            <div className="flex gap-1 items-center">
                              <h2 className="text-2xl">{post.name}</h2>
                              {post.verified && (
                                <VerifiedButton />
                              )}
                            </div>
                            <p>@{post.username}</p>
                          </div>
                          <div>
                            <Follow userId = {post.id.toString() ?? ""} />
                          </div>
                        </div>
                      </div>
                    </a>
                    ))}
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchComponent;
