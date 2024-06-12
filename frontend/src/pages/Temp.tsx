import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import axios from "axios";
import SocialProfiles from "@/components/ProfilePage/SocialProfiles";
import AboutSection from "@/components/ProfilePage/AboutSection";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
    details : string;
    portfolio : string;
    githubLink : string;
    linkedinLink : string;
    profilePic: string;
    }

const Temp = () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const user = localStorage.getItem("user");
    const userObj = JSON.parse(user as string);
    const userId = userObj.id;
    const [userData, setUserData] = React.useState<User>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/${userId}`);
                console.log(response.data);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching courses", error);
            }
        };

        fetchData();
    }, []);

  const courses = [
    {
      image: "https://via.placeholder.com/100",
      title: "How to share your files",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit donec ullamcorper...",
    },
    {
      image: "https://via.placeholder.com/100",
      title: "How to keep your files safe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit donec ullamcorper...",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-cover bg-center h-64 bg-blue-400">
        <div className="container mx-auto p-6 flex justify-between items-center">
          {/* <input type="text" placeholder="Search" className="border p-2 rounded-md"/> */}
        </div>
      </header>

      <div className="container mx-auto p-6 w-full">
        <div className="flex flex-col  md:flex-row md:items-start md:space-x-6 w-full">
          <div className="absolute top-[280px] w-[150px] h-[150px]">
            <img
              src="https://avatars.githubusercontent.com/u/124599?v=4"
              alt="Profile"
              className="rounded-full border-4 border-white"
            />
          </div>
          <div className="flex md:flex-row flex-col justify-between w-full">
            <div className="mt-4 md:mt-0 ml-[150px] text-center md:text-left">
              <h1 className="text-3xl font-bold">{userData.name}</h1>
              <p className="text-gray-600">@{userData.username}</p>
            </div>
            <div className="flex space-x-4">
              <Button className="border p-2 rounded-md">Report</Button>
              <Button className="border p-2 rounded-md">+ Follow</Button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <section>
                <AboutSection about={userData.details} />
            </section>

            <section>
              <h2 className="text-2xl font-bold">Courses</h2>
              <div className="mt-4 space-y-4">
                {courses.map((course, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded shadow flex flex-col md:flex-row"
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full md:w-1/3 rounded"
                    />
                    <div className="md:ml-4 mt-4 md:mt-0">
                      <h3 className="text-xl font-bold">{course.title}</h3>
                      <p className="text-gray-600 mt-2">{course.description}</p>
                      <div className="flex space-x-4 mt-4">
                        <button className="px-4 py-2 bg-gray-200 rounded">
                          Play
                        </button>
                        <button className="px-4 py-2 bg-gray-200 rounded">
                          Save for later
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="md:col-span-1 space-y-6">
            <section>
              <h2 className="text-2xl font-bold">Social Profiles</h2>
                <div className="mt-4 flex flex-col space-y-2">
                    <SocialProfiles githubLink={userData.githubLink} linkedinLink={userData.linkedinLink} portfolio={userData.portfolio} />
                    </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Skills</h2>
              <div className="mt-4 flex flex-wrap space-x-2">
                {["Managing", "Figma", "UX design", "+8"].map(
                  (skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-200 rounded">
                      {skill}
                    </span>
                  )
                )}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Locations</h2>
              <div className="flex space-x-2 mt-4">
                <span className="rounded-full bg-gray-200 p-2">🇩🇰</span>
                <span className="rounded-full bg-gray-200 p-2">🇬🇧</span>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Contact</h2>
              <p className="mt-2">E-mail: {userData.email}</p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Temp;
