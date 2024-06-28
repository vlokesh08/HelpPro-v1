
import Footer from "@/components/Footer";
import HelpPro from "@/components/Homepage/HelpPro/HelpPro";
import OpenSource from "@/components/Homepage/OpenSource";
import Navbar from "@/components/Navbar/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = 'HelpPro'; // Quick solution
}, []);
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex  justify-center bg-[#f5f7f7] w-full dark:bg-[#212c3c] h-auto">
        <div className=" w-full flex justify-center">
          <Tabs defaultValue="account" className="w-full mt-4">
            <div className="flex justify-center">
              <TabsList className="dark:bg-[#44546b] bg-[#f0f4ff]">
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
      <Footer />
      {/* <Homepage /> */}
    </div>
  );
};

export default HomePage;
