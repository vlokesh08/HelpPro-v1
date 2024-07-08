import React, { ChangeEvent } from "react";

interface Author {
  id: number;
  name: string;
  profilePic: string;
}

interface Reply {
  id: number;
  content: string;
  authorId: number;
  commentId: number;
  author: Author;
  createdAt: string;
}

interface ReplyItemProps {
  reply: Reply;
  commentId: number;
  setEditingReply: React.Dispatch<React.SetStateAction<Reply | null>>;
  handleEditReply: (replyId: number, commentId: number) => void;
  handleDeleteReply: (replyId: number, commentId: number) => void;
  isEditingReply: boolean;
  setIsEditingReply: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReplyItem: React.FC<ReplyItemProps> = ({
  reply,
  commentId,
  setEditingReply,
  handleEditReply,
  handleDeleteReply,
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
