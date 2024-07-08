import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { Pencil } from 'lucide-react';
import { Skeleton } from "../ui/skeleton";

const AboutSection = ({ about, userId }: {
  about: string;
  userId: string;
}) => {
  const [input,setInput] = React.useState<string>('')
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const user = localStorage.getItem("user");
  const userObj = JSON.parse(user as string);
  const loggedinUser = userObj.id;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to update the loading state after 1 second (1000 milliseconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);
  const handleSave = async () => {
    const data = await axios.put(`${BACKEND_URL}/api/v1/user/details/${userId}`, {
      details: input,
    });
    console.log(data);
  }

  useEffect(() => {
    setInput(about);
  }, [about]);

  if (isLoading) {
    return <div className="flex gap-3 flex-col">
      <Skeleton className="h-6 w-[80px]"  />
      <Skeleton className="h-6 w-[320px]"  />
    </div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Bio</h2>
        {
          userId === loggedinUser && (
          <Dialog>
              <DialogTrigger>
              <Button variant={"primary"} className="h-8 w-12"><Pencil width={18} /></Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="dark:text-white">Add Your Bio</DialogTitle>
                  <DialogDescription>
                    <Textarea className="mt-5" id="name" value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder="Bio" />
                      <div className="w-full flex justify-end">
                        <Button variant={"primary"} className="mt-5" onClick={handleSave}>Save</Button>
                      </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )
        }
        
      </div>
      {about ? (
        <h4 className="text-lg text-gray-400">{about}</h4>
      ) : (
        <div>
          <Dialog>
            <DialogTrigger>
              <Button variant={"primary"} className="mb-5">Add Bio</Button>{" "}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="dark:text-white">Add Your Bio</DialogTitle>
                <DialogDescription>
                  <Textarea className="mt-5" id="name" value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder="Bio" />
                    <div className="w-full flex justify-end">
                      <Button variant={"primary"} className="mt-5" onClick={handleSave}>Save</Button>
                    </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default AboutSection;
