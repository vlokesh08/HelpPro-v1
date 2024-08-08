import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '../ui/input';
import BountyCheck from '../NewProject/BountyCheck';
import MultiSelect from '../NewProject/MultiSelect';
import { Button } from '../ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { ScrollArea } from "@/components/ui/scroll-area"
import MiniPosts from '../LoadingPages/MiniPosts';
import MarkdownEditor from '@/pages/DescriptionEditor';


interface Post {
  id: string;
  title: string;
  description: string;
  bounty: boolean;
  techstack: string;
  link: string;
  bountyValue: string;
}

const EditProject = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [bountyValue, setBountyValue] = useState("");
  const [techStack, setTechStack] = useState<string>("");
  const [githubLink, setGithubLink] = useState("");
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get<{ post: Post }>(
          `${BACKEND_URL}/api/v1/project/getPostById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { title, description, bounty, techstack, link, bountyValue } = res.data.post;
        setTitle(title);
        setDescription(description);
        setIsChecked(bounty);
        setBountyValue(bountyValue);
        setTechStack(techstack);
        setGithubLink(link);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Error fetching post details");
      }
    };
    fetchPost();
  }, [id]);

  const handleEdit = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${BACKEND_URL}/api/v1/project/update/${id}`,
        {
          title,
          description,
          bounty: isChecked,
          techstack: techStack,
          link: githubLink,
          bountyValue: bountyValue,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(res.data.message);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error("Error editing post");
    }
  };

  if (loading) {
    return <div><MiniPosts /></div>;
  }

  return (
    <ScrollArea className="h-full w-full dark:text-white">
    <div className="container p-4 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Edit Post</h1>
      <div className="mb-4">
        <h2 className="mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-white">Title</h2>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4 dark:text-white">
        <h2 className="mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-white">Description</h2>
        {/* <Textarea
          placeholder="Type your message here."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /> */}
        <MarkdownEditor description={description} setDescription={setDescription} />
      </div>
      <div className="mb-4">
        <h2 className="mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-white">Do you include bounty in this Project?</h2>
        <div className="flex gap-3">
        <BountyCheck isChecked={isChecked} setIsChecked={setIsChecked} />
        {
          isChecked && (
            <Input
              placeholder="Add bounty value"
              value={bountyValue}
              className="w-1/4"
              onChange={(e) => setBountyValue(e.target.value)}
            />
          )
        }
        </div>

      </div>
      <div className="mb-4">
        <h2 className="mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-white">TechStack</h2>
        <MultiSelect techStack={techStack} settechStack={setTechStack} />
      </div>
      <div className="mb-4">
        <h2 className="mb-2 text-sm font-medium leading-6 text-gray-900 dark:text-white">Github Link</h2>
        <Input
          placeholder="Add link of your Github repository"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
        />
      </div>
      <div className="my-2 flex justify-end">
        <Button onClick={handleEdit}>Edit Post</Button>
      </div>
    </div>
    </ScrollArea>
  );
};

export default EditProject;
