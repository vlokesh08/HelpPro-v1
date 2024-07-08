import { useNavigate } from "react-router-dom";
const Hero = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        // Add your login logic here
        navigate("/login");
    };
  return (
    <div className="w-full h-auto ">
      
      <div className="font-spacegotesk">
        <section className="flex flex-col items-center  bg-white dark:bg-dark-body dark:text-white px-6">
          <div className="w-full max-w-6xl mt-5">
            <img
              src="images/landing.svg" // Update the path to your image file
              alt="Diverse people illustration"
              className="w-full h-[350px] object-cover object-top rounded-xl"
            />
            <div className="text-center mt-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Connect with <span className="text-button-clr">Developers</span>, earn <span className="text-green-500">bounties</span>, 
                <br />
                and discover open-source <span className="text-orange-400">projects</span>.
              </h1>
              <div className="mt-6 flex justify-center space-x-4">
                <button className="px-6 py-2 bg-button-clr text-white rounded-md text-lg font-medium hover:bg-gray-800 transition" onClick={handleLogin}>
                  Get Started
                </button>
                <button className="px-6 py-2 bg-white text-black border border-gray-300 rounded-md text-lg font-medium hover:bg-gray-100 transition flex items-center">
                  <span>Download Now</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                </button>
              </div>
              
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
