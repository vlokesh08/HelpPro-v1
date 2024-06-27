import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
const NewpostSection = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Have an OpenSource Project?</CardTitle>
          <CardDescription>Add your Project here</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={()=>{navigate("/newpost")}}>Add Project</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewpostSection;
