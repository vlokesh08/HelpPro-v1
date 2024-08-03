import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DeleteAccount = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
  const user = localStorage.getItem("user");
  const userObj = JSON.parse(user as string);
  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/user/${userObj.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Account deleted successfully");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className="dark:text-white">
      <h1 className="font-spacegotesk dark:text-white text-2xl font-semibold my-3">
        DeleteAccount
      </h1>
      <div>
        <h2 className="my-3 dark:text-white">
          If you delete your account you will not be getting the account back
        </h2>
        <Dialog>
          <DialogTrigger>
            <Button className="bg-button-clr hover:bg-blue-600">Delete</Button>
          </DialogTrigger>
          <DialogContent className="w-1/2 dark:text-white">
            <DialogHeader>
              <DialogTitle>Are you sure to delete your account?</DialogTitle>
              <DialogDescription>
                <Button onClick={handleDelete} className="mt-5">
                  Delete
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default DeleteAccount;
