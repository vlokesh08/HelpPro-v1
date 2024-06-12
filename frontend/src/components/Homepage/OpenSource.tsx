import HomepagePosts from "./HomepagePosts";
import NewpostSection from "./NewpostSection";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import OpenSourceSearch from "./OpenSourceSearch";
import { Button } from "../ui/button";
const OpenSource = () => {
  return (
    <div className="w-full h-screen container">
      <div className="flex-col h-screen hidden md:flex">
        <div className="flex">

        <OpenSourceSearch />
        <div>
          <Button className="w-full">Create New Project</Button>
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
