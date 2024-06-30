import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HomepagePosts from "./HomepagePosts";
import NewpostSection from "./NewpostSection";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import OpenSourceSearch from "./OpenSourceSearch";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import SearchBox from "../SearchBox";

const OpenSource: React.FC = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user") || "{}";
  const userObj = JSON.parse(user);
  const name = userObj.name;
  const dialogTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        dialogTriggerRef.current?.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full container py-5 font-spacegotesk">
      <div className="flex-col hidden md:flex">
        <div className="flex h-[100px] w-full justify-center items-center align-middle">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={75} className="flex align-middle">
              <div className="flex w-full justify-center items-center align-middle">
                <Dialog>
                  <DialogTrigger ref={dialogTriggerRef} className="w-full flex justify-center items-center border-none">
                    <SearchBox />
                  </DialogTrigger>
                  <DialogContent className="border-none w-3/4">
                    <DialogHeader>
                      <DialogTitle className="dark:text-white mb-5">
                        Search
                      </DialogTitle>
                      <DialogDescription>
                        <OpenSourceSearch />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </ResizablePanel>
            {/* <ResizableHandle /> */}
            <ResizablePanel defaultSize={25} className="flex align-middle">
              <div className="p-5 h-full flex justify-center items-center">
                <Button
                  onClick={() => navigate("/newpost")}
                  className="w-full h-full text-lg bg-light-button hover:bg-blue-200 dark:bg-dark-box dark:border-slate-500 dark:text-white dark:hover:bg-slate-600 border border-button-clr text-button-clr text-justify"
                >
                  Add New Project
                </Button>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <div className="w-full mt-5">
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full rounded-lg"
          >
            <ResizablePanel defaultSize={60}>
              <div>
                <img src="images/OpenSource1.jpeg" className="h-[330px] object-cover w-full" alt="Open Source" />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={40}>
              <div className="flex h-[200px] p-6">
                <div>
                  <h1 className="font-semibold text-5xl font-spacegotesk dark:text-white">Hello</h1>
                  <h1 className="font-semibold text-5xl text-justify font-spacegotesk text-[#3a86ff]">{name}!</h1>
                  <p className="text-justify mt-5 font-spacegotesk dark:text-white">
                    Welcome to the Open Source Projects page. Here you can find all the open source projects that are available on our platform. You can search for projects, view details and contribute to the projects.
                  </p>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <div className="flex my-4 w-full gap-3 items-center align-middle">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">Projects</h1>
          </div>
          <div className="w-full">
            <Separator className="my-4" />
          </div>
        </div>
        <div className="mt-5 flex justify-center">
          <HomepagePosts />
        </div>
      </div>
      <div className="block md:hidden m-5">
        <NewpostSection />
        <HomepagePosts />
      </div>
    </div>
  );
};

export default OpenSource;
