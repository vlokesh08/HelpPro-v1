import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AuthorDetailsProps {
    userDetails: {
        name: string;
        username: string;
        avatar: string;
    };
}

const AuthorDetails: React.FC<AuthorDetailsProps> = ({ userDetails }) => {
  const { name, username, avatar } = userDetails;

  return (
    <div className="mb-5 flex gap-5 items-center">
      <div>
        <Avatar>
          <AvatarImage src={avatar} alt={`@${username}`} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-gray-500">@{username}</p>
      </div>
    </div>
  );
};

export default AuthorDetails;
