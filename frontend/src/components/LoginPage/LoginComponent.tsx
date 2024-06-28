import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ isChecked } : any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSignup = () => {
    isChecked(false);
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, {
        email,
        password,
      });

      const data = response.data;
      console.log(data);
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));
      setLoading(false);
      navigate("/");
      toast.success("Login successful. Redirecting to dashboard.");
    } catch (e) {
      setLoading(false);
      toast.error("Invalid email or password. Please try again.");
      console.log(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    document.title = 'Login | HelpPro'; // Quick solution
}, []);

const handleKeyDown = (event : any) => {
  if (event.key === "Enter") {
    handleSignup();
  }
};  

  return (
    <div>
      <Toaster />
      <div>
        {loading === true ? (
          <div className="text-center text-sm text-gray-600 cursor-pointer">
            <p className="flex gap-2">
              <p className="font-medium text-indigo-600 hover:text-indigo-500">
                <Loader2 className="w-4 mr-3 h-4 animate-spin" />
                Please wait
              </p>
            </p>
          </div>
        ) : null}
      </div>
      <div className="font-spacegotesk">
        <h1 className="text-5xl font-bold mb-6 font-spacegotesk">
          Welcome back!
        </h1>
        <div className="my-3">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 my-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="my-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="current-password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              onKeyDown={handleKeyDown}
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
        <div className="my-4">
          <button
            onClick={handleClick}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Signin
          </button>
        </div>
        <div className="text-center text-sm text-gray-600 cursor-pointer">
          <p className="flex gap-2">
            New Here? Create an Account{" "}
            <p
              onClick={handleSignup}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
