import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import BountyCheck from "./BountyCheck";
import { Button } from "../ui/button";
import Issues from "./Issues";
import { useNavigate } from "react-router-dom";
import MultiSelect from "./MultiSelect";
import axios from "axios";
import { Toaster, toast } from "sonner";

const AddNewProjectComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [githubLink, setGithubLink] = useState("");
  const [techStack, setTechStack] = useState("");
  const navigate = useNavigate();
  const user : string  = localStorage.getItem("user") || "{}";
  const id = JSON.parse(user).id;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = () => {
    console.log({
      title,
      description,
      isChecked,
      githubLink,
      techStack,
    });
    if (!title) {
      toast.error("Title cannot be empty");
      return;
    }
    if (!description) {
      toast.error("Description cannot be empty");
      return;
    }
    if (!techStack) {
      toast.error("TechStack cannot be empty");
      return;
    }
    if (!githubLink) {
      toast.error("Github Link cannot be empty");
      return;
    }

    // make a post request to the backend
    try {
      axios.post(
        `${BACKEND_URL}/api/v1/post/create`,
        {
          title,
          description,
          bounty: isChecked,
          techstack: techStack,
          authorId: id,
          link: githubLink,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Project added successfully");
    } catch (e) {
      toast.error("Error adding project");
    }
  };

  return (
    <div className="lg:px-[22rem] mx-auto p-4 dark:bg-[#212c3c]">
      <Toaster />
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="text-2xl font-semibold leading-7 dark:text-white text-gray-900">
            Add New Project
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
        <div className="">
          <h2 className="mb-2 block text-sm font-medium leading-6 dark:text-white text-gray-900">
            Title
          </h2>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <h2 className="mb-2 block text-sm font-medium leading-6 dark:text-white text-gray-900">
            Description
          </h2>
          <Textarea
            placeholder="Type your message here."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="">
          <h2 className="mb-2 block text-sm font-medium leading-6 dark:text-white text-gray-900">
            Do you include bounty in this Project?
          </h2>
          <BountyCheck isChecked={isChecked} setIsChecked={setIsChecked} />
        </div>
        <div>
          <h2 className="mb-2 block text-sm font-medium leading-6 dark:text-white text-gray-900">
            TechStack
          </h2>
          <MultiSelect techStack={techStack} settechStack={setTechStack} />
        </div>
        <div>
          <h2 className="mb-2 block text-sm font-medium leading-6 dark:text-white text-gray-900">
            Github Link
          </h2>
          <Input
            placeholder="Add link of your Github repository"
            value={githubLink}
            onChange={(e) => {
              setGithubLink(e.target.value);
            }}
          />
        </div>
        <div>
          <Issues link={githubLink} />
        </div>
        <div className="w-full flex justify-end gap-3">
          <Button
            className="bg-primary text-black border"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
          <Button variant={"primary"} onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProjectComponent;
