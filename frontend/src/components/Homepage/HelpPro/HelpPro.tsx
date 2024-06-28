import { useEffect, useRef } from "react";
import HelpProSearch from "./HelpProSearch";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import HelpProPosts from "./HelpProPosts";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../ui/resizable";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const HelpPro = () => {
  const user = localStorage.getItem("user") || "{}";
  const userObj = JSON.parse(user);
  const name = userObj.name;
  const navigate = useNavigate();
  const searchInputRef = useRef(null); // Create a ref for the search input

  useEffect(() => {
    const handleKeyDown = (event : any) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault(); // Prevent the default action
        searchInputRef.current.focus(); // Focus the search input
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div className="w-full container py-5">
        <div className="flex-col hidden md:flex">
          <div className="flex justify-between">
            <div className="flex">
              <Dialog>
                <DialogTrigger>
                  <Input
                    type="text"
                    placeholder="Search"
                    ref={searchInputRef} // Attach the ref to the input
                  ></Input>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
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
            <div>
              <Button
                onClick={() => {
                  navigate("/newproject");
                }}
                className="w-full"
                variant={"primary"}
              >
                Create New Project
              </Button>
            </div>
          </div>
          <div className="w-full mt-5">
            <ResizablePanelGroup
              direction="horizontal"
              className="w-full rounded-lg "
            >
              <ResizablePanel defaultSize={60}>
                <div>
                  <img src="images/OpenSource1.jpeg" alt="Open Source" />
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={40}>
                <div className="flex h-[200px] p-6">
                  <span className="">
                    <div className="dark:text-white">
                      <h1 className="font-semibold text-5xl">Hello</h1>
                      <h1 className="font-light text-5xl text-[#3a86ff] text-justify">
                        {name}!
                      </h1>
                      <p className="text-justify mt-5">
                        Welcome to HelpPro, where you can collaborate with other
                        developers and work on projects together. You can also
                        create your own project and invite others to join.
                      </p>
                    </div>
                  </span>
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
