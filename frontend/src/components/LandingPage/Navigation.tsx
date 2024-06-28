
import ThemeToggle from "../ThemeToggle";
import { Button } from "../ui/button";
import NavigationMenuComp from "./NavigationMenuComp";
const Navigation = () => {

  return (
    <header className={`flex w-full items-center bg-white dark:bg-[#29394c]`}>
      <div className="container">
        <div className="relative flex items-center justify-between">
          <div className=" px-4">
            <a href="/" className="block w-full py-5">
              <h1 className=" font-bold text-xl text-[#3a86ff] dark:text-white">HelpPro</h1>
            </a>
          </div>
            <div>
                <NavigationMenuComp />
            </div>
            <div className="flex gap-3">
                <ThemeToggle />
                <Button className="bg-button-clr" >Get Started</Button>
            </div>

          </div>
        </div>
    </header>
  );
};

export default Navigation;
