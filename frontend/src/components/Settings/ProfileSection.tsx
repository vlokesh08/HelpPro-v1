import React, { useEffect } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { Textarea } from "../ui/textarea";
import { set } from "date-fns";
import { Button } from "../ui/button";

interface User {
  id: number;
  username: string;
  name: string;
  details: string;
  profilePic: string; 
}

const ProfileSection = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const user = localStorage.getItem("user");
  const userObj = JSON.parse(user as string);
  const userId = userObj.id;
  const [userData, setUserData] = React.useState<User>({});
  const [username, setUsername] = React.useState<string>('');
    const [name, setName] = React.useState<string>('');
    const [bio, setBio] = React.useState<string>('');
    const [profilePic, setProfilePic] = React.useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`${BACKEND_URL}/api/v1/user/${userId}`);
        console.log(data);
        setUserData(data.data[0]);
        setUsername(data.data[0].username);
        setName(data.data[0].name);
        setBio(data.data[0].details);
        setProfilePic(data.data[0].profilePic);
      } catch (error) {
        console.error("Error fetching social profiles", error);
      }
    };
    fetchData();
  }, []);

    const handleSave = async () => {
        try {
        const data = await axios.put(`${BACKEND_URL}/api/v1/user/${userId}`, {
            username: username,
            name: name,
            details: bio,
            profilePic: profilePic
        });
        console.log(data);
        } catch (error) {
        console.error("Error saving social profiles", error);
        }
    };
  return (
    <div className="dark:text-white">
      <h1 className="text-xl font-bold">Profile</h1>
      <h4 className="text-gray-500">
        Your profile settings and privacy preferences
      </h4>
      <div>
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <Input type="text" id="email" className="mt-1" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <Input type="text" id="name" className="mt-1" value={name} onChange={(e)=>{setName(e.target.value)}} />
          </div>

          <div>
            <label htmlFor="bio" className="font-semibold">
              Bio
            </label>
            <Textarea id="bio" className="mt-1" value={bio} onChange={(e)=>{setBio(e.target.value)}} />
          </div>
          <div className="flex justify-end">
            <Button className="bg-[#3a86ff] text-white px-4 py-2 rounded-lg" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
