import React from "react";
import CommentItem from "./CommentItem";
import { Comment, Reply } from "./Interfaces";

interface CommentListProps {
  comments: Comment[];
  setEditingComment: React.Dispatch<React.SetStateAction<Comment | null>>;
  setEditingReply: React.Dispatch<React.SetStateAction<Reply | null>>;
  handleEditComment: (commentId: number) => void;
  handleDeleteComment: (commentId: number) => void;
  handleAddReply: (commentId: number, replyContent: string) => void;
  handleEditReply: (replyId: number, commentId: number) => void;
  handleDeleteReply: (replyId: number, commentId: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  setEditingComment,
  setEditingReply,
  handleEditComment,
  handleDeleteComment,
  handleAddReply,
  handleEditReply,
  handleDeleteReply,
}) => {
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          setEditingComment={setEditingComment}
          setEditingReply={setEditingReply}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
          handleAddReply={handleAddReply}
          handleEditReply={handleEditReply}
          handleDeleteReply={handleDeleteReply}
        />
      ))}
    </div>
  );
};

export default CommentList;
