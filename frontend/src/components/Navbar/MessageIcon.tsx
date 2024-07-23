import React from "react";

import { MessageSquare  } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";



const MessageIcon: React.FC = () => {


  return (
    <Link to="/chat">
    <div className="flex gap-2 font-spacegotesk mr-3">
      <Button variant="outline" size="icon" className="border-none dark:bg-dark-box">
            <div className="hidden dark:block">
              <MessageSquare  color="white" className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all " />
            </div>
            <div className="block dark:hidden">
              <MessageSquare  color="black" className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all " />
            </div>
          </Button>
    </div>
    </Link>
  );
};

export default MessageIcon;
