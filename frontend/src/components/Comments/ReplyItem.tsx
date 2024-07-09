import React, { ChangeEvent } from "react";
import { Reply } from "./Interfaces";

interface ReplyItemProps {
  reply: Reply;
  commentId: string;
  setEditingReply: React.Dispatch<any>;
  handleEditReply: (replyId: string, commentId: string) => void;
  handleDeleteReply: (replyId: string, commentId: string) => void;
  isEditingReply: boolean;
  setIsEditingReply: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReplyItem: React.FC<ReplyItemProps> = ({
  reply,
  commentId,
  setEditingReply,
  handleEditReply,
  isEditingReply,
  setIsEditingReply,
}) => {
  return (
    <div className="reply-item">
      {isEditingReply ? (
        <div>
          <textarea
            value={reply.content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setEditingReply({ ...reply, content: e.target.value })
            }
          ></textarea>
          <button onClick={() => handleEditReply(reply.id, commentId)}>
            Save
          </button>
          <button onClick={() => setIsEditingReply(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{reply.content}</p>
          
        </div>
      )}
    </div>
  );
};

export default ReplyItem;
