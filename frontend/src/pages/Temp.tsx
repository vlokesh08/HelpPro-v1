import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SocialProfiles from "@/components/ProfilePage/SocialProfiles";
import AboutSection from "@/components/ProfilePage/AboutSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HelpProProfilePosts from "@/components/ProfilePage/HelpProProfilePosts";
import OpenSourceProfilePosts from "@/components/ProfilePage/OpenSourceProfilePosts";
import SavedPosts from "@/components/ProfilePage/SavedPosts";
import HomeScreenLoading from "@/components/LoadingPages/HomeScreenLoading";
import { useParams } from "react-router-dom";
import Follow from "@/components/Follow";
import { Flag } from "lucide-react";

interface User {
  id: number;
  name: string;
  username: string;
  details: string;
  profilePic: string;
  subscribedTo: Subscriber[];
  subscribers: Subscriber[];
}

interface Subscriber {
  id : string,
  subscriberId: string,
  userId : string,
  createdAt: string,
}

interface SocialLinks {
  portfolio: string;
  githubLink: string;
  linkedinLink: string;
}

const Temp = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const userId = useParams<{ id: string }>().id;
  const user = localStorage.getItem("user");
  const userObj = JSON.parse(user as string);
  const loggedUserId = userObj.id;
  const [userData, setUserData] = React.useState<User>({} as User);
  const [socialLinks, setSocialLinks] = React.useState<SocialLinks>(
    {} as SocialLinks
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log(userId, loggedUserId);
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/user/${userId}`
        );
        console.log(response.data);
        setUserData(response.data[0]);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    const getLinks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/user/social/${userId}`
        );
        console.log(response.data);
        setSocialLinks(response.data);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    getLinks();
    fetchData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div>
        <HomeScreenLoading />
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-gray-100 dark:bg-[#212c3c] dark:text-white font-spacegotesk">
      <header className="bg-cover bg-center h-40   bg-blue-400">
        <div className="container mx-auto p-6 flex justify-between items-center">
          {/* <input type="text" placeholder="Search" className="border p-2 rounded-md"/> */}
        </div>
      </header>

      <div className="container mx-auto p-6 w-full">
        <div className="flex flex-col  md:flex-row md:items-start md:space-x-6 w-full">
          <div className="absolute top-[150px] left-[70px] lg:left-[150px] w-[120px] h-[120px] lg:w-[150px] lg:h-[150px]">
            <img
              src={
                userData.profilePic ||
                "https://avatars.githubusercontent.com/u/124599?v=4"
              }
              alt="Profile"
              className="rounded-full border-4 border-white"
            />
          </div>
          <div className="flex pr-20 pl-20 md:flex-row flex-col justify-between w-full">
            <div className="mt-4 md:mt-0 ml-[130px] text-center md:text-left">
              <h1 className="text-3xl font-bold">{userData.name}</h1>
              <p className="text-gray-600">@{userData.username}</p>
            </div>
            <div className="flex space-x-4">
              <Button className="border p-2 rounded-md">
                <Flag className="mr-2 h-[18px] w-[18px]" />
                Report
              </Button>
              <Follow userId={userId ?? ""} />
            </div>
          </div>
        </div>

        <div className="mt-8 pr-5 pl-5 lg:pr-20 lg:pl-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <section className="bg-white dark:bg-dark-box rounded-xl p-5">
              <AboutSection about={userData.details} userId={userId ?? ""} />
            </section>

            <section className="bg-white dark:bg-dark-box rounded-xl p-5">
              <h2 className="text-2xl font-bold">Posts</h2>
              <div className="flex justify-start">
                <Tabs
                  defaultValue="account"
                  className="w-full mt-4 flex flex-col justify-start"
                >
                  <div className="flex justify-start">
                    <TabsList className="dark:bg-[#44546b]">
                      <TabsTrigger value="account">Projects</TabsTrigger>
                      <TabsTrigger value="password">OpenSource</TabsTrigger>
                      {userId === loggedUserId ? (
                        <TabsTrigger value="saved">Saved</TabsTrigger>
                      ) : null}
                    </TabsList>
                  </div>
                  <TabsContent value="account">
                    <HelpProProfilePosts userId={userId ?? ""} />
                  </TabsContent>
                  <TabsContent value="password">
                    <OpenSourceProfilePosts userId={userId ?? ""} />
                  </TabsContent>
                  {userId === loggedUserId ? (
                    <TabsContent value="saved">
                      <SavedPosts userId={userId ?? ''} />
                    </TabsContent>
                  ) : null}
                </Tabs>
              </div>
            </section>
          </div>

          <aside className="md:col-span-1 space-y-6 bg-white dark:bg-dark-box rounded-xl p-5 h-[250px]">
            <section>
              <div className="flex gap-3">
              <h2 className="text-xl font-semibold text-slate-400">{userData?.subscribers?.length} followers</h2>
              <h2 className="text-xl font-semibold text-slate-400">{userData?.subscribedTo?.length} following</h2>
              </div>

            </section>
            <section>
              <h2 className="text-2xl font-bold">Contact Details</h2>
              <div className=" flex flex-col">
                <SocialProfiles
                  githubLink={socialLinks.githubLink}
                  linkedinLink={socialLinks.linkedinLink}
                  portfolio={socialLinks.portfolio}
                />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Temp;
