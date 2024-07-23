import Navigation from "./Navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb, Bug, MessageSquareText } from "lucide-react";
import { Button } from "../ui/button";

const Feedback = () => {
  return (
    <div className="min-h-screen dark:bg-dark-body">
      <Navigation />
      <div className="font-spacegotesk dark:text-white py-12">
        <div className="absolute inset-0 -z-10 overflow-hidden dark:opacity-50">
          <svg
            aria-hidden="true"
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg
              x="50%"
              y={-1}
              className="overflow-visible fill-gray-50 dark:fill-gray-700"
            >
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-center mt-10">
            How can we make <span className="text-blue-400">HelpPro</span>{" "}
            better?
          </h2>
          <h3 className="text-xl text-center mt-5">
            Below, you’ll find all the options to directly communicate your
            needs to our team.
          </h3>
        </div>
        <div className="flex flex-wrap gap-6 justify-center items-center mt-12 p-8">
          <CardComponent
            title={<Lightbulb size={24} />}
            description="Feature request"
          >
            <div>
              <h4 className="text-justify py-2 pb-5">
                Have an idea for a new feature? Click below to submit it.
              </h4>
              <a href="https://github.com/vlokesh08/HelpPro-v1/discussions/new/choose" target="__blank" className="text-blue-400 hover:underline">
                <Button>Feedback</Button>
              </a>
            </div>
          </CardComponent>
          <CardComponent
            title={<Bug size={24} />}
            description="Report a bug"
          >
            <div>
              <h4 className="text-justify py-2 pb-5">
                Found a bug? Please help us fix it by submitting an issue.
              </h4>
              <a href="https://github.com/vlokesh08/HelpPro-v1/issues/new" target="__blank" className="text-blue-400 hover:underline">
                <Button>Bug Reports</Button>
              </a>
            </div>
          </CardComponent>
          <CardComponent
            title={<MessageSquareText size={24} />}
            description="Send us a message or ask for help."
          >
            <div>
              <h4 className="text-justify py-2  pb-5">
                Need help or have a question? Click below to contact us.
              </h4>
              <a href="https://v223h3hasom.typeform.com/to/WLj8Xl7B" target="__blank"   className="text-blue-400 hover:underline">
                <Button>Ask here</Button>
              </a>
            </div>
          </CardComponent>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

const CardComponent = ({
  title,
  description,
  children,
}: {
  title: any;
  description: string;
  children?: React.ReactNode;
}) => {
  return (
    <Card className="bg-white dark:bg-dark-box dark:text-white dark:border-slate-500 w-full max-w-sm sm:w-[380px] flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>{children}</CardFooter>
    </Card>
  );
};
