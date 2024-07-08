import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HelpProSearch from "./HelpProSearch";
import { Button } from "../../ui/button";
import HelpProPosts from "./HelpProPosts";
import { ResizablePanel, ResizablePanelGroup } from "../../ui/resizable";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SearchBox from "@/components/SearchBox";

const HelpPro: React.FC = () => {
  const user = localStorage.getItem("user") || "{}";
  const userObj = JSON.parse(user);
  const name = userObj.name;
  const navigate = useNavigate();
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
    <div>
      <div className="w-full container py-5 font-spacegotesk">
        <div className="flex-col hidden md:flex">
          <div className="flex h-[100px] w-full justify-center items-center align-middle">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={75} className="flex align-middle">
                <div className="flex w-full justify-center items-center align-middle">
                  <Dialog>
                    <DialogTrigger
                      ref={dialogTriggerRef}
                      className="w-full flex justify-center items-center border-none"
                    >
                      <SearchBox />
                    </DialogTrigger>
                    <DialogContent className="border-none w-3/4 bg-dark-body">
                      <DialogHeader className="bg-dark-body">
                        <DialogTitle className="dark:text-white mb-5">
                          Search
                        </DialogTitle>
                        <DialogDescription>
                          <HelpProSearch />
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
                    onClick={() => navigate("/newproject")}
                    className="w-full h-full text-lg bg-light-button dark:bg-dark-box dark:border-slate-500 dark:text-white dark:hover:bg-slate-600 border hover:bg-blue-200 border-button-clr text-button-clr text-justify"
                  >
                    Create New Project
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
                  <img
                    src="images/helppro.jpeg"
                    alt="Open Source"
                    className="h-[330px] object-cover w-full"
                  />
                </div>
              </ResizablePanel>
              <ResizablePanel defaultSize={40}>
                <div className="flex h-[200px] p-6">
                  <div className="dark:text-white">
                    <h1 className="font-semibold text-5xl font-spacegotesk">
                      Hello
                    </h1>
                    <h1 className="font-semibold font-spacegotesk text-5xl text-[#3a86ff] text-justify">
                      {name}!
                    </h1>
                    <p className="text-justify mt-5 font-spacegotesk">
                      Welcome to HelpPro, where you can collaborate with other
                      developers and work on projects together. You can also
                      create your own project and invite others to join.
                    </p>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
          <div className="flex my-4 w-full gap-3 items-center align-middle">
            <div>
              <h1 className="text-3xl font-bold dark:text-white font-spacegotesk">
                Projects
              </h1>
            </div>
            <div className="w-full">
              <Separator className="my-4" />
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <HelpProPosts />
          </div>
        </div>
        <div className="block md:hidden m-5">
          <HelpProSearch />
        </div>
      </div>
      <div className="block md:hidden m-5">
        <HelpProPosts />
      </div>
    </div>
  );
};

export default HelpPro;
