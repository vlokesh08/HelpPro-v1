import { useSelector } from "react-redux";

const UserNotSelected = () => {
  const chatData = useSelector((state: any) => {
    return state.chat;
  });
  return (
    <div className="w-full h-full flex justify-center items-center">
        <div className="flex justify-center items-center align-middle">
            <h1 className="text-2xl text-gray-400">Select a user to start chat</h1>
        </div>
    </div>
  )
};

export default UserNotSelected;
