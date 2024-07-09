import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { Globe } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { Github } from 'lucide-react';
import { Skeleton } from "../ui/skeleton";
interface SocialProfilesProps {
  githubLink?: string;
  linkedinLink?: string;
  portfolio?: string;
  userId: string;
}

const SocialProfiles = ({
  userId,
  githubLink,
  linkedinLink,
  portfolio,
}: SocialProfilesProps) => {
    const [github, setGithub] = React.useState<string>('');
    const [linkedin, setLinkedin] = React.useState<string>('');
    const [port, setPort] = React.useState<string>('');
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const user = localStorage.getItem("user");
    const userObj = JSON.parse(user as string);
    const loggedinUser = userObj.id;
  const noProfiles =
    !githubLink && !linkedinLink && !portfolio;

    const handleSave = () => {
        try {
            const user = localStorage.getItem("user");
            const userObj = JSON.parse(user as string);
            const userId = userObj.id;
            axios.put(`${BACKEND_URL}/api/v1/user/social/${userId}`, {
                githubLink: github,
                linkedinLink: linkedin,
                portfolio: port
            });
        } catch (error) {
            console.error("Error saving social profiles", error);
        }
    }
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Set a timeout to update the loading state after 1 second (1000 milliseconds)
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
  
      // Clear the timer if the component is unmounted
      return () => clearTimeout(timer);
    }, []);
  
    if (isLoading) {
      return <div className="mt-2">
        <Skeleton className="h-6 w-[180px]"  />
        
      </div>;
    }

  return (
    <div className="mt-2  ">
      {
        noProfiles && userId!==loggedinUser && (
          <div className="text-gray-500">No social media profiles added</div>
        )
      }
      {noProfiles && userId===loggedinUser ? (
        <Dialog>
        <DialogTrigger><Button variant={"primary"}>Add Social Media Profiles</Button></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="my-2">Add your Social Media Profiles</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <label htmlFor="githubLink">Github Link</label>
                    <Input type="text" id="githubLink" className="mt-1" value={githubLink} onChange={(e)=>{setGithub(e.target.value)}} />
                </div>
                <div>
                    <label htmlFor="linkedinLink">LinkedIn Link</label>
                    <Input type="text" id="linkedinLink" className="mt-1" value={linkedin} onChange={(e)=>{setLinkedin(e.target.value)}} />
                </div>
                <div>
                    <label htmlFor="portfolio">Portfolio</label>
                    <Input type="text" id="portfolio" className="mt-1" value={port} onChange={(e)=>{setPort(e.target.value)}}/>
                </div>
                <div className="flex justify-end">
                    <Button variant={"primary"} onClick={handleSave}>Save</Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
      ) : (
        <div className="flex flex-row gap-2">
          {githubLink && (
            <a href={githubLink} className="text-blue-500 hover:underline bg-white p-2 rounded-3xl">
                <Github />
            </a>
          )}
          {linkedinLink && (
            <a href={linkedinLink} className="text-blue-500 hover:underline bg-white p-2 rounded-3xl">
                <Linkedin />
            </a>
          )}
          {portfolio && (
            <a href={portfolio} className="text-blue-500 hover:underline bg-white p-2 rounded-3xl">
              <Globe />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default SocialProfiles;
