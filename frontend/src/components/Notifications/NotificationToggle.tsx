import { Bell, BellDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useEffect, useState } from "react";
import timeAgo from "@/utils/timeCalculator";

interface Notification {
  id: string;
  link: string;
  type: string;
  content: string;
  seen: boolean;
  subscriber: {
    id: string;
    username: string;
    profilePic: string;
    name: string;
  };
  user:string;
  createdAt: string;
}

const NotificationItem = ({ notification }: { notification: any }) => {
  return (
    <DropdownMenuItem key={notification.id}>
      <a href={notification.link} className="w-full">
        <div className="flex items-center gap-3 ">
          <img
            src={notification.subscriber.profilePic}
            alt={notification.subscriber.username}
            className="w-8 h-8 rounded-full"
          />
          <div className="w-full">
            <div className="flex justify-between w-full">
              <p className="text-sm font-bold">{notification.subscriber.name}</p>
              <p>{timeAgo(notification.createdAt)}</p>
            </div>
            <p className="text-sm">{notification.content}</p>
          </div>
        </div>
      </a>
    </DropdownMenuItem>
  );
};

export default function NotificationToggle() {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const getNotifications = async () => {
    console.log("Fetching notifications...")
    try {
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/notifications/get-notifications`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Notifications:", response.data);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);


  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="border-none" asChild onClick={getNotifications}>
        <Button variant="ghost" size="icon" className="border-none dark:bg-dark-box" >
            <div className="hidden dark:block">
              <Bell color="white" className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all " />
            </div>
            <div className="block dark:hidden">
              <BellDot color="black" className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all " />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[380px] dark:bg-slate-700">
          {
            notifications.length > 0 ? (
              notifications.map((notification: Notification) => (
                <div>
                  <NotificationItem notification={notification} />
                </div>
              ))
            ) : <DropdownMenuItem>No notifications</DropdownMenuItem>
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
