import LoginComponent from "@/components/LoginPage/LoginComponent";
import SignupComponent from "@/components/LoginPage/SignupComponent";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
const GITHUB_CLIENT_ID = "Ov23ct6yKrCQOfjkoGQP";
const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user`;
import { Toaster, toast } from "sonner";
import Loading from "@/components/Loading";

const Login = () => {
  const [isChecked, setIsChecked] = React.useState(true);
  const [isClicked, setIsClicked] = React.useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleGitHubCallback = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get("code");

      if (code) {
        setLoading(true);
        console.log(isClicked)
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/auth/githublogin`,
          {
            code,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.message === "Retry Please") {
          toast.error("Retry Please");
          setLoading(false);
        }

        if (response.data.message === "Login in successful") {
          localStorage.setItem("token", response.data.jwt);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/");
          setLoading(false);
        }
      }
    };
    handleGitHubCallback();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      <Toaster />
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center p-8 ">
        <img
          src="images/signup.jpg"
          className="mix-blend-multiply"
        ></img>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center rounded-2xl m-5 justify-center p-8 ">
        <div className="max-w-md w-full">
          <div className="space-y-4 ">
            {isChecked ? (
              <LoginComponent isChecked={setIsChecked} />
            ) : (
              <SignupComponent isChecked={setIsChecked} />
            )}
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 text-gray-500">or</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3">
              <a href={githubOAuthURL}>
                <button
                  type="button"
                  onClick={() => {
                    setIsClicked(true);
                  }}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg
                    className="w-5 h-5 me-2"
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
                </button>
              </a>
              {/* {
                isClicked && (
                  <GitHubOAuth />
                )
              } */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
