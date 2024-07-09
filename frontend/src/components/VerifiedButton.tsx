import { BadgeCheck } from "lucide-react";

const VerifiedButton = () => {
  return (
    <div>
      <div className="relative group inline-block">
        <BadgeCheck className="h-5 w-5 text-blue-500" />
        <div className="opacity-0 w-32 bg-gray-800 text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 transition-opacity duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
          Verified
          <svg
            className="absolute text-gray-800 h-2 w-full left-0 top-full"
            viewBox="0 0 255 255"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VerifiedButton;
