import React, { useEffect } from "react";
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

const AboutSection = ({ about }: any) => {
  const [input,setInput] = React.useState<string>('')
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const user = localStorage.getItem("user");
  const userObj = JSON.parse(user as string);
  const userId = userObj.id;
  const handleSave = async () => {
    const data = await axios.put(`${BACKEND_URL}/api/v1/user/details/${userId}`, {
      details: input,
    });
    console.log(data);
  }

  useEffect(() => {
    setInput(about);
  }, [about]);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Bio</h2>
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
