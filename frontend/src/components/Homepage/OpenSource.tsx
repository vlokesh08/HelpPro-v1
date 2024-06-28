import HomepagePosts from "./HomepagePosts";
import NewpostSection from "./NewpostSection";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import OpenSourceSearch from "./OpenSourceSearch";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

const OpenSource = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user") || "{}";
  const userObj = JSON.parse(user);
  const name = userObj.name;

  return (
    <div className="w-full  container  py-5 ">
      <div className="flex-col hidden md:flex">
        <div className="flex justify-between">
          <div>
            <Dialog>
              <DialogTrigger>
                <Input type="text" placeholder="Search"></Input>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="dark:text-white mb-5">Search</DialogTitle>
                  <DialogDescription>
                  <OpenSourceSearch />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          <div>
            <Button
              onClick={() => {
                navigate("/newpost");
              }}
              className="w-full"
              variant={"primary"}
            >
              Add New Project
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
                <img src="images/OpenSource1.jpeg"></img>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={40}>
              <div className="flex h-[200px] p-6">
                <span className="">
                  <div className="dark:text-white">
                    <h1 className=" font-semibold text-5xl">Hello</h1>
                    <h1 className=" font-light text-5xl text-justify text-[#3a86ff]">{name} !</h1>
                    <h2> </h2>

                    <p className="text-justify mt-5">
                      Welcome to the Open Source Projects page. Here you can find
                      all the open source projects that are available on our
                      platform. You can search for projects, view details and
                      contribute to the projects.
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
              <Separator className="my-4 " />
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
