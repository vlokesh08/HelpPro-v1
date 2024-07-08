import axios from "axios";
import { useEffect } from "react";
import React from "react";
import { Github, Linkedin } from "lucide-react";
interface ContactDetailsProps {
  githubLink: string;
  linkedinLink: string;
  portfolio: string;
}

const ContactDetails = ({ id }: { id: string }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [contactDetails, setContactDetails] =
    React.useState<ContactDetailsProps>({} as ContactDetailsProps);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/user/social/${id}`
        );
        setContactDetails(response.data);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="font-spacegotesk  dark:bg-dark-body">
      <h1 className="p-3 font-bold text-lg">Contact Details</h1>
      <div className="flex flex-col gap-3 mt-4 bg-light-body rounded-lg p-4">
        {contactDetails.githubLink && (
          <div className="">
            <h2 className="font-bold">Github</h2>
            <a href={`${contactDetails.githubLink}`} target="__blank">
              <div className="flex flex-row gap-2 my-2 cursor-pointer">
                <Github />
                <p>{contactDetails.githubLink}</p>
              </div>
            </a>
          </div>
        )}
        {contactDetails.linkedinLink && (
          <div className="">
            <h2 className="font-bold">Linkedin</h2>
            <a href={`${contactDetails.linkedinLink}`} target="__blank">
              <div className="flex flex-row gap-2 my-2">
                <Linkedin />
                <p>{contactDetails.linkedinLink}</p>
              </div>
            </a>
          </div>
        )}
        {contactDetails.portfolio && (
          <div className="">
            <h2 className="font-bold">Portfolio</h2>
            <a href={`${contactDetails.portfolio}`} target="__blank">
              <div className="flex flex-row gap-2 my-2">
                <Github />
                <p>{contactDetails.portfolio}</p>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDetails;
