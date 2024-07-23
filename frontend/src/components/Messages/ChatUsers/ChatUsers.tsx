import { MailPlus } from 'lucide-react';
import RejectedChats from './PendingChats';
import AcceptedChats from './AcceptedChats';
import { useState } from 'react';
const ChatUsers = ({clicked,setClicked} : any) => {
  const [clickedEvent, setClickedEvent] = useState(false);
  return (
    <div className='h-full'>
      <div className="flex justify-between p-5 items-center">
        <h1 className=" font-medium text-lg">Messages</h1>
        <div className="cursor-pointer border p-2 rounded-lg" onClick={()=>{setClickedEvent(!clickedEvent)}}>
          <MailPlus size={18} />
        </div>
      </div>
      {
        clickedEvent ? (
          <RejectedChats />
        ) : (
          <AcceptedChats clicked={clicked} setClicked={setClicked} />
        )
      }
    </div>
  )
}

export default ChatUsers