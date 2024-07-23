import { useSelector } from "react-redux";

const UserNotSelected = () => {
  const chatData = useSelector((state: any) => {
    return state.chat;
  });
  return <div>{chatData?.receiverId}</div>;
};

export default UserNotSelected;
