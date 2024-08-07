import React, { useEffect } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
const SocalMediaProfiles = () => {
  const [githubLink, setGithub] = React.useState<string>("");
  const [linkedin, setLinkedin] = React.useState<string>("");
  const [port, setPort] = React.useState<string>("");
  const [loading, setLoading] = React.useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const user = localStorage.getItem("user");
  const userObj = JSON.parse(user as string);
  const userId = userObj.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          `${BACKEND_URL}/api/v1/user/social/${userId}`
        );
        console.log(data);
        setGithub(data.data.githubLink);
        setLinkedin(data.data.linkedinLink);
        setPort(data.data.portfolio);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching social profiles", error);
      }
    };
    fetchData();
  }, []);
  const handleSave = () => {
    try {
      const user = localStorage.getItem("user");
      const userObj = JSON.parse(user as string);
      const userId = userObj.id;
      axios.put(`${BACKEND_URL}/api/v1/user/social/${userId}`, {
        githubLink: githubLink,
        linkedinLink: linkedin,
        portfolio: port,
      });
      toast.success("Social profiles saved successfully");
    } catch (error) {
      toast.error("Failed to save social profiles");
    }
  };

  useEffect(() => {
    // Set a timeout to update the loading state after 1 second (1000 milliseconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  if(loading) {
    return <div>
      <Skeleton className="h-6 w-[80px]" />
      <Skeleton className="h-6 w-[320px]" />
    </div>
  }
  return (
    <div className="dark:text-white">
      <h1 className="text-xl font-bold">Social Media Profiles</h1>
      <h4 className="text-gray-500">Your Social Media Profiles</h4>

      <div className="mt-5">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="githubLink" className="font-semibold p-1">
              Github Link
            </label>
            <Input
              type="text"
              id="githubLink"
              className="mt-1"
              value={githubLink}
              onChange={(e) => {
                setGithub(e.target.value);
              }}
            ></Input>
          </div>
          <div className="">
            <label htmlFor="linkedinLink" className="font-semibold p-1">
              LinkedIn Link
            </label>
            <Input
              type="text"
              id="linkedinLink"
              className="mt-1"
              value={linkedin}
              onChange={(e) => {
                setLinkedin(e.target.value);
              }}
            > </Input>
          </div>
          <div>
            <label htmlFor="portfolio" className="font-semibold p-1">
              Portfolio
            </label>
            <Input
              type="text"
              id="portfolio"
              className="mt-1"
              value={port}
              onChange={(e) => {
                setPort(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-end">
            <Button variant={"primary"} onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocalMediaProfiles;
