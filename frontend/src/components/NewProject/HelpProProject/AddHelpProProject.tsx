import { useState } from "react";
import { Input } from "../../ui/input";
import BountyCheck from "../BountyCheck";
import BountyValue from "./BountyValue";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import MultiSelect from "../MultiSelect";
import axios from "axios";
import { Toaster, toast } from "sonner";
import DatePicker from "./DatePicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DescriptionPreview from "./DescriptionPreview";
import MarkdownEditor from "@/pages/DescriptionEditor";

const AddHelpProProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [githubLink, setGithubLink] = useState("");
  const [techStack, setTechStack] = useState("");
  const [bountyValue, setBountyValue] = useState("0");
  const [currency, setCurrency] = useState("INR");
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();
  const user: string = localStorage.getItem("user") || "{}";
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
    console.log(
      title,
      description,
      bountyValue,
      isChecked,
      githubLink,
      endDate
    );
    // make a post request to the backend
    try {
      axios.post(
        `${BACKEND_URL}/api/v1/project/create`,
        {
          title,
          description,
          bounty: isChecked,
          bountyValue: bountyValue,
          currency: currency,
          endDate,
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
    <div className="lg:px-[12rem] min-h-screen mx-auto p-4 dark:bg-[#212c3c] dark:text-white font-spacegotesk">
      <Toaster />
      <div>
        <h2 className="text-5xl font-semibold leading-7 dark:text-white text-gray-900 mb-5 mt-5">
          Add New Project
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 mb-10">
          Fill in the details to add a new project
          </p>
          
      </div>
      <div className="flex gap-5 w-full">
        <div className="flex flex-col gap-5 w-full">
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
          <div className="">
            <h2 className="mb-2 block text-sm font-medium leading-6 dark:text-white text-gray-900">
              Do you include bounty in this Project?
            </h2>
            <div className="flex gap-5">
              <BountyCheck isChecked={isChecked} setIsChecked={setIsChecked} />
              {isChecked === true && (
                <BountyValue
                  bountyValue={bountyValue}
                  setBountyValue={setBountyValue}
                  currency={currency}
                  setCurrency={setCurrency}
                />
              )}
            </div>
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
            <h2 className="mb-2 block text-sm font-medium leading-6 dark:text-white text-gray-900">
              Pick up an end Date
            </h2>
            <DatePicker date={endDate} setEndDate={setEndDate} />
          </div>
        </div>
        <div className="w-full bg-slate-500 dark:bg-slate-700 p-5 rounded-xl">
          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="account">Description</TabsTrigger>
              <TabsTrigger value="password">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              {/* <Description
                description={description}
                setDescription={setDescription}
              /> */}
              <MarkdownEditor 
                description={description}
                setDescription={setDescription}
              />
            </TabsContent>
            <TabsContent value="password">
              <DescriptionPreview description={description} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="w-full flex justify-end gap-3 my-8">
        <Button
          className="bg-primary text-black border"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </Button>
        <Button variant={"primary"} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddHelpProProject;
