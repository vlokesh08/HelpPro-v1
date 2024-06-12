import HelpPro from "@/components/Homepage/HelpPro";
import OpenSource from "@/components/Homepage/OpenSource";
import Navbar from "@/components/Navbar/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HomePage = () => {
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex justify-center w-full">
        <div className=" w-full flex justify-center">
          <Tabs defaultValue="account" className="w-full h-[820px]">
            <div className="flex justify-center">
              <TabsList className="bg-[#caf0f8]">
                <TabsTrigger value="account">Help Pro</TabsTrigger>
                <TabsTrigger value="password">OpenSource Projects</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="account">
              <HelpPro />
            </TabsContent>
            <TabsContent value="password">
              <OpenSource />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* <Homepage /> */}
    </div>
  );
};

export default HomePage;
