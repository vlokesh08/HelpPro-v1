import React, { useEffect } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

const SocalMediaProfiles = () => {
  const [githubLink, setGithub] = React.useState<string>("");
  const [linkedin, setLinkedin] = React.useState<string>("");
  const [port, setPort] = React.useState<string>("");
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
      } catch (error) {
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
  return (
    <div className="dark:text-white">
      <h1 className="text-xl font-bold">Social Media Profiles</h1>
      <h4 className="text-gray-500">Your Social Media Profiles</h4>

      <div className="mt-5">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="githubLink" className="font-semibold my-2">
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
            />
          </div>
          <div className="my-5 gap-2">
            <label htmlFor="linkedinLink" className="font-semibold my-2">
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
            />
          </div>
          <div>
            <label htmlFor="portfolio" className="font-semibold">
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
