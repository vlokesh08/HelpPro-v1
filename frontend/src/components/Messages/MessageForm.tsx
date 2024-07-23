import  { useState } from 'react';

const MessageForm = ({ sendMessage } : {sendMessage : any}) => {
  const [content, setContent] = useState('');
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');

  const handleSubmit = (e : any) => {
    e.preventDefault();
    sendMessage({ content, sender, receiver });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Sender"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Receiver"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;
