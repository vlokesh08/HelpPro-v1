import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Follow from "../Follow";
import VerifiedButton from "../VerifiedButton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface AuthorDetailsProps {
  userDetails: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
}

const AuthorDetails: React.FC<AuthorDetailsProps> = ({ userDetails }) => {
  const { id, name, username, avatar, verified } = userDetails;

  return (
    <div className="mb-5 flex gap-5 items-center">
      <div>
        <Avatar>
          <AvatarImage src={avatar} alt={`@${username}`} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="w-full">
        <div className="flex gap-4 items-center w-full justify-start">
          <div className="w-full">
            <div className="w-full flex gap-2 items-baseline">
              <HoverCard>
                <HoverCardTrigger>
                  <a href={`/profile/${id}`}>
                    <h1 className="text-2xl font-bold hover:underline hover:cursor-pointer">
                      {name}
                    </h1>
                  </a>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex gap-5 items-center">
                    <div>
                      <Avatar>
                        <AvatarImage src={avatar} alt={`@${username}`} />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-lg font-bold">{name}</h1>
                      <p className="text-gray-500 mb-1">@{username}</p>
                      <div className="w-3/4 h-3/4 justify-start">
                        <Follow userId={id} className="w-[115px] h-[30px]" />
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              {verified && <VerifiedButton />}
            </div>
            <p className="text-gray-500">@{username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
