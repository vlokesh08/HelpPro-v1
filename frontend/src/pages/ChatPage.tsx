import ChatPageUi from '@/components/Messages/ChatPageUi';
import Navbar from '@/components/Navbar/Navbar';


const ChatPage = () => {


  return (
    <div className="h-screen">
      <Navbar />
      <ChatPageUi />
    </div>
  );
};

export default ChatPage;
