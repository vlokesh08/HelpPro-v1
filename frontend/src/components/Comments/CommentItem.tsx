import React, { useState } from "react";
import ReplyItem from "./ReplyItem";
import { MessageCircleMore } from "lucide-react";
import timeAgo from "@/utils/timeCalculator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Comment, Reply } from "./Interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentItemProps {
  comment: Comment;
  setEditingReply: React.Dispatch<React.SetStateAction<Reply | null>>;
  handleEditComment: (commentId: string,editedComment: string) => void;
  handleDeleteComment: (commentId: string) => void;
  handleAddReply: (commentId: string, replyContent: string) => void;
  handleEditReply: (replyId: string, commentId: string) => void;
  handleDeleteReply: (replyId: string, commentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  setEditingReply,
  handleEditComment,
  handleDeleteComment,
  handleAddReply,
  handleEditReply,
  handleDeleteReply,
}) => {
  const [replyContent, setReplyContent] = useState<string>("");
  const [isEditingComment, setIsEditingComment] = useState<boolean>(false);
  const [isEditingReply, setIsEditingReply] = useState<boolean>(false);
  const [replyToggle, setReplyToggle] = useState<boolean>(false);
  const [hideReply, setHideReply] = useState<boolean>(false);
  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user).id : null;
  const profilePic = user ? JSON.parse(user).profilePic : null;
  const name = user ? JSON.parse(user).name : null;
  const [editedComment,setEditedComment] = useState<string>(comment.content);
  return (
    <div className="comment-item">
      {isEditingComment ? (
        <div>
          <div className="flex flex-col gap-4 my-3 border border-slate-700 rounded-lg p-3">
            <div className="flex gap-3">
              <div className="flex gap-2">
                <img
                  src={
                    comment?.author?.profilePic ||
                    "https://github.com/shadcn.png"
                  }
                  alt="profile"
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div className=" bg-slate-200 dark:bg-dark-box w-full p-3 rounded-lg">
                <div className="flex justify-between">
                  <p className="font-semibold">{comment.author?.name}</p>
                </div>
                <Input
                  value={editedComment}
                  onChange={(e: any) =>
                    setEditedComment(e.target.value)
                  }
                ></Input>
                <Button
                  onClick={() => {handleEditComment(comment.id, editedComment)
                    setIsEditingComment(false)}
                  }
                  className="h-[30px] w-[60px] mt-3 mr-3"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setIsEditingComment(false)}
                  className="h-[30px] w-[60px] mt-3"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 my-3 border border-slate-700 rounded-lg p-3">
          <div className="flex gap-3">
            <div className="flex gap-2">
              <img
                src={
                  comment?.author?.profilePic || "https://github.com/shadcn.png"
                }
                alt="profile"
                className="h-10 w-10 rounded-full"
              />
            </div>
            <div className=" bg-slate-200 dark:bg-dark-box w-full p-3 rounded-lg">
              <div className="flex justify-between">
                <p className="font-semibold">{comment.author?.name}</p>
                <div className="flex">
                  <p className="text-xs text-gray-500">
                    {timeAgo(comment?.createdAt)}
                  </p>
                  {userId === comment.authorId ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div className="flex ml-2 cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-grip-horizontal"
                          >
                            <circle cx="12" cy="9" r="1" />
                            <circle cx="19" cy="9" r="1" />
                            <circle cx="5" cy="9" r="1" />
                          </svg>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => setIsEditingComment(true)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : null}
                </div>
              </div>
              <p>{comment.content}</p>
              {replyToggle ? (
                <div className="flex flex-col gap-3">
                  <p
                    onClick={() => setReplyToggle(false)}
                    className="cursor-pointer"
                  >
                    Cancel
                  </p>
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={profilePic} alt={`@${name}`} />
                      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Input
                      value={replyContent}
                      onChange={(e: any) => setReplyContent(e.target.value)}
                      placeholder="Add a reply"
                    ></Input>
                    <Button
                      onClick={() => handleAddReply(comment.id, replyContent)}
                    >
                      Add Reply
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="cursor-pointer flex gap-1 items-center mt-2"
                  onClick={() => setReplyToggle(true)}
                >
                  <MessageCircleMore className="h-5 w-5" />
                  <p>Reply</p>
                </div>
              )}
            </div>
          </div>
          <div>
            {comment.replies && comment.replies.length > 0 ? (
              hideReply === true ? (
                <p
                  onClick={() => {
                    setHideReply(false);
                  }}
                  className="cursor-pointer ml-[50px]"
                >
                  Hide Replies
                </p>
              ) : (
                <p
                  onClick={() => {
                    setHideReply(true);
                  }}
                  className="cursor-pointer ml-[50px]"
                >
                  Show Replies
                </p>
              )
            ) : null}
            {comment.replies &&
            comment.replies.length > 0 &&
            hideReply === true ? (
              <div className="replies  ">
                {comment.replies.map((reply) => (
                  <div className="ml-[60px]">
                    <div className="flex space-y-5">
                      <img
                        src={
                          reply?.author?.profilePic ||
                          "https://github.com/shadcn.png"
                        }
                        alt="profile"
                        className="h-10 w-10 rounded-full m-2"
                      />
                      <div className="w-full bg-slate-300 dark:bg-dark-box p-3 rounded-lg">
                        <div className="flex justify-between">
                          <p>{reply?.author?.name}</p>
                          <div className="flex gap-2">
                            <p className="text-xs text-gray-500">
                              {timeAgo(reply.createdAt)}
                            </p>
                            {userId === reply.authorId ? (
                              <DropdownMenu>
                                <DropdownMenuTrigger>
                                  <div className="flex ml-2 cursor-pointer">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="lucide lucide-grip-horizontal"
                                    >
                                      <circle cx="12" cy="9" r="1" />
                                      <circle cx="19" cy="9" r="1" />
                                      <circle cx="5" cy="9" r="1" />
                                    </svg>
                                  </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem
                                    onClick={() => setIsEditingReply(true)}
                                  >
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleDeleteReply(reply.id, comment.id)
                                    }
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            ) : null}
                          </div>
                        </div>

                        <ReplyItem
                          key={reply.id}
                          reply={reply}
                          commentId={comment.id}
                          setEditingReply={setEditingReply}
                          handleEditReply={handleEditReply}
                          handleDeleteReply={handleDeleteReply}
                          isEditingReply={isEditingReply}
                          setIsEditingReply={setIsEditingReply}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
