
const MessageList = ({ messages } : {messages:any}) => {
  return (
    <div>
      {messages.map((message : any) => (
        <div key={message.id}>
          <strong>{message.sender}</strong>: {message.content}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
