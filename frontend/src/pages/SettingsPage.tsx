import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import { CircleUserRound, CircleFadingPlus, Trash } from 'lucide-react';
import ProfileSection from "@/components/Settings/ProfileSection";
import SocalMediaProfiles from "@/components/Settings/SocalMediaProfiles";
import { Toaster } from "sonner";

const SettingsPage = () => {
  const [selected, setSelected] = React.useState("profile");

  const handleSelected = (selected: string) => {
    setSelected(selected);
  };

  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="flex h-[100vh] bg-def dark:bg-dark-body lg:px-[130px] px-5 gap-8 font-spacegotesk">
        <div className="bg-white dark:bg-dark-box p-8 my-5 rounded-xl w-[350px]">
          <h2
            onClick={() => handleSelected("profile")}
            className={`cursor-pointer items-center text-lg font-semibold p-2 rounded ${selected === "profile" ? "bg-button-clr text-white" : "bg-white text-button-clr dark:text-white dark:bg-dark-box"} flex gap-2`}
          >
            <CircleUserRound />
            Edit Profile
          </h2>
          <h2
            onClick={() => handleSelected("social")}
            className={`cursor-pointer text-lg p-2 mt-2 items-center font-semibold rounded ${selected === "social" ? "bg-button-clr text-white" : "bg-white text-button-clr dark:text-white dark:bg-dark-box"} flex gap-2`}
          >
            <CircleFadingPlus />
            Social Media
          </h2>
          <h2
            onClick={() => handleSelected("delete")}
            className={`cursor-pointer text-lg p-2 mt-2 items-center font-semibold rounded ${selected === "delete" ? "bg-button-clr text-white" : "bg-white text-button-clr dark:text-white dark:bg-dark-box"} flex gap-2`}
          >
            <Trash />
            Delete Account
          </h2>
        </div>
        <div className="bg-white dark:bg-dark-box p-8 my-5 rounded-xl w-full">
          {selected === "profile" && (
            <ProfileSection />
          )}
          {selected === "social" && (
            <SocalMediaProfiles />
          )}
          {selected === "delete" && (
            <div>Delete Account Section</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
