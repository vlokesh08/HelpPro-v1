import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "sonner";

const SignupComponent = ({ isChecked }: any) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const handleSignin = () => {
    isChecked(true);
  };
  const handleSignup = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
        username,
        name: fullname,
        email,
        password,
      });
      console.log(response);
      toast.success("Signup successful. Please login.");
    } catch (e : any) {
      toast.error(e.response.data.message || "Error signing up. Please try again.");
    }
  };
  return (
    <div>
      <Toaster />
      <div>
      <h1 className="text-5xl  font-spacegotesk font-bold mb-6 ">Get Started!</h1>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="my-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="email"
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="my-1">
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
        <div className="my-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="my-2">
          <button
            onClick={handleSignup}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create account
          </button>
        </div>
        <div className="text-center text-sm text-gray-600 cursor-pointer">
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
      {/* <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create a new account. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1 ">
            <Label htmlFor="current">Username</Label>
            <Input id="current"  value={username} onChange={(e)=>{setUsername(e.target.value)}} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="current">Email</Label>
            <Input id="current" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">Password</Label>
            <Input id="new" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSignup}>Signup</Button>
        </CardFooter>
        <CardFooter>
          <Button type="button" className="w-full">
            <svg
              className="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                clip-rule="evenodd"
              />
            </svg>
            Sign in with Github
          </Button>
        </CardFooter>
      </Card> */}
    </div>
  );
};

export default SignupComponent;
