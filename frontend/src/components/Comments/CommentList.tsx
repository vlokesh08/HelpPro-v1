import React from "react";
import CommentItem from "./CommentItem";
import { Comment } from "./Interfaces";

interface CommentListProps {
  comments: Comment[];
  setEditingComment: React.Dispatch<any>;
  setEditingReply: React.Dispatch<any>;
  handleEditComment: (commentId: string) => void;
  handleDeleteComment: (commentId: string) => void;
  handleAddReply: (commentId: string, replyContent: string) => void;
  handleEditReply: (replyId: string, commentId: string) => void;
  handleDeleteReply: (replyId: string, commentId: string) => void;
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
