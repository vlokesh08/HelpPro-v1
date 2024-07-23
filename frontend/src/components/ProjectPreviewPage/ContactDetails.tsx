import axios from "axios";
import { useEffect } from "react";
import React from "react";
import { Github, Linkedin } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useMessageRequests from "@/hooks/messageRequest";
import { toast } from "sonner";

interface ContactDetailsProps {
  githubLink: string;
  linkedinLink: string;
  portfolio: string;
}

const ContactDetails = ({ id }: { id: string }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const {
    sendRequest,
  } = useMessageRequests(token as string);
  const user = localStorage.getItem("user") || "{}";
  const userId = JSON.parse(user).id;


  const handleSendRequest = async () => {
    try {
      await sendRequest(userId, id);
    } catch (error : any) {
      console.log(error.response?.data?.message);
      if(error.response?.data?.message=="pending") {
        toast.error("Request already sent");
        return;
      }
    }
  };
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

        <div>
          <Dialog>
            <DialogTrigger>
              <Button>Message</Button>
            </DialogTrigger>
            <DialogContent className="w-1/2">
              <DialogHeader>
                <DialogTitle>Send a Message Request?</DialogTitle>
                <DialogDescription>
                  <div>
                    <p>
                      Send a message request to the user to connect with them.
                    </p>
                    <div className="w-full flex justify-end">
                      <Button onClick={handleSendRequest}>Send Request</Button>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
