import { useEffect, ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import axios from "axios";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

// Define a type for the user
interface User {
  id: string;
  username: string;
  name: string;
  details: string;
  profilePic: string;
}

// Define a type for the response data from the fetch and save requests
interface UserDataResponse {
  user: User;
}

const ProfileSection = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
  const user = localStorage.getItem("user");
  const userObj: User = JSON.parse(user as string);
  const userId = userObj.id;
  
  const [username, setUsername] = useState<string>(userObj.username || "");
  const [name, setName] = useState<string>(userObj.name || "");
  const [bio, setBio] = useState<string>(userObj.details || "");
  const [profilePic, setProfilePic] = useState<string>(userObj.profilePic || "");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<User[]>(`${BACKEND_URL}/api/v1/user/${userId}`);
        console.log(data);
        setUsername(data[0].username);
        setName(data[0].name);
        setBio(data[0].details);
        setProfilePic(data[0].profilePic);
      } catch (error) {
        console.error("Error fetching social profiles", error);
      }
    };
    fetchData();
  }, [userId, BACKEND_URL]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post<UserDataResponse>(`${BACKEND_URL}/api/v1/upload/upload/${userId}`, formData);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // Optionally update state with new user data if needed
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.put<User>(`${BACKEND_URL}/api/v1/user/${userId}`, {
        username,
        name,
        details: bio,
        profilePic,
      });
      console.log(data);
      // Optionally update localStorage and state with new user data if needed
    } catch (error) {
      console.error("Error saving social profiles", error);
    }
  };

  return (
    <div className="dark:text-white flex flex-col gap-3">
      <h1 className="text-xl font-bold">Profile</h1>
      <h4 className="text-gray-500">Your profile settings and privacy preferences</h4>
      <div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-5">
            <div className="mt-1">
              <img
                src={profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full cursor-pointer"
                onClick={() => document.getElementById("profilePicInput")?.click()}
              />
              <Input
                type="file"
                id="profilePicInput"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex items-center">
              <Button variant="primary" onClick={handleUpload}>Save Image</Button>
            </div>
          </div>
          <div>
            <label htmlFor="username" className="font-semibold">Username</label>
            <Input
              type="text"
              id="username"
              className="mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name" className="font-semibold">Name</label>
            <Input
              type="text"
              id="name"
              className="mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="bio" className="font-semibold">Bio</label>
            <Textarea
              id="bio"
              className="mt-1"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
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
