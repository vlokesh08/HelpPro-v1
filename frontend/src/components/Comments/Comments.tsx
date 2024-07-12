import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import { Comment, Reply } from "./Interfaces";
import MiniPosts from "../LoadingPages/MiniPosts";

const Comments: React.FC = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState<string>("");
  const [editingReply, setEditingReply] = useState<Reply | null>(null);
  const postId = id;
  const user = localStorage.getItem("user") || "{}";
  const userId = JSON.parse(user).id;

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true); 
      const response = await axios.get<Comment[]>(
        `${BACKEND_URL}/api/v1/comments/post/${postId}/comments`
      );
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post<Comment>(
        `${BACKEND_URL}/api/v1/comments/add-comment`,
        {
          content: newComment,
          projectId: postId,
          authorId: userId,
        }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEditComment = async (commentId: string, editedComment: string) => {
    if (!editedComment) return;

    try {
      const response = await axios.put<Comment>(
        `${BACKEND_URL}/api/v1/comments/edit-comment/${commentId}`,
        {
          content: editedComment,
        }
      );

      setComments(
        comments.map((comment) =>
          comment.id === commentId ? response.data : comment
        )
      );
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axios.delete(
        `${BACKEND_URL}/api/v1/comments/delete-comment/${commentId}`
      );
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleAddReply = async (commentId: string, replyContent : string ) => {
    try {
      const response = await axios.post<Reply>(
        `${BACKEND_URL}/api/v1/comments/add-reply`,
        {
          content: replyContent,
          commentId,
          authorId: userId,
        }
      );
      console.log(response.data);
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, response.data] }
            : comment
        )
      );
      setEditingReply(null);
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleEditReply = async (replyId: string, commentId: string) => {
    if (!editingReply) return;
    try {
      const response = await axios.put<Reply>(
        `${BACKEND_URL}/api/v1/comments/edit-reply/${replyId}`,
        {
          content: editingReply.content,
        }
      );
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === replyId ? response.data : reply
                ),
              }
            : comment
        )
      );
      setEditingReply(null);
    } catch (error) {
      console.error("Error editing reply:", error);
    }
  };

  const handleDeleteReply = async (replyId: string, commentId: string) => {
    try {
      await axios.delete(
        `${BACKEND_URL}/api/v1/comments/delete-reply/${replyId}`
      );
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply.id !== replyId
                ),
              }
            : comment
        )
      );
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  if(loading) {
    return (
      <MiniPosts />
    )
  }

  return (
    <div className="App animate-fadeIn dark:animate-fadeInDark ease-linear">
      <h1>Comments</h1>
      <div className="flex gap-3 my-3">
        <Input
          value={newComment}
          onChange={(e: any) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        ></Input>
        <Button onClick={handleAddComment}>Add Comment</Button>
      </div>
      <CommentList
        comments={comments}
        setEditingReply={setEditingReply}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment}
        handleAddReply={handleAddReply}
        handleEditReply={handleEditReply}
        handleDeleteReply={handleDeleteReply}
      />
    </div>
  );
};

export default Comments;
