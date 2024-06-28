import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons
import { useNavigate } from "react-router-dom";

const SignupComponent = ({ isChecked } : any) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSignin = () => {
    isChecked(true);
  };

  const handleSignup = async () => {
    if (!username || !email || !password || !fullname) {
      toast.error("Please fill all the fields.");
      return;
    }
    try {
      await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
        username,
        name: fullname,
        email,
        password,
      });
      toast.success("Signup successful. Please login.");
      navigate("/login");
    } catch (e) { 
      toast.error(
        "Error signing up. Please try again."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    document.title = 'SignUp | HelpPro'; // Quick solution
}, []);

  return (
    <div>
      <Toaster />
      <div>
        <h1 className="text-5xl  font-spacegotesk font-bold mb-6 text-button-clr ">
          HelpPro
        </h1>
        <h1 className="text-5xl  font-spacegotesk font-bold mb-6 ">
          Get Started!
        </h1>
        <div className="my-3 font-spacegotesk">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="my-3 font-spacegotesk">
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="my-3 font-spacegotesk">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="my-3 font-spacegotesk">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500 opacity-65" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500 opacity-65" />
              )}
            </button>
          </div>
        </div>
        <div className="my-3 font-spacegotesk">
          <button
            onClick={handleSignup}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create account
          </button>
        </div>
        <div className="text-center text-sm text-gray-600 cursor-pointer font-spacegotesk">
          <p className="flex gap-2">
            Already have an account?{" "}
            <p
              onClick={handleSignin}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
