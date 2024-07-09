export interface Author {
    id: string;
    name: string;
    profilePic: string;
  }
  
  export interface Reply {
    id: string;
    content: string;
    authorId: string;
    commentId: string;
    author: Author;
    createdAt: string;
  }
  
 export interface Comment {
    id: string;
    content: string;
    postId: string;
    authorId: string;
    author: Author;
    replies: Reply[];
    createdAt: string;  
  }

