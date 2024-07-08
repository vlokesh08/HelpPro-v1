export interface Author {
    id: number;
    name: string;
    profilePic: string;
  }
  
  export interface Reply {
    id: number;
    content: string;
    authorId: number;
    commentId: number;
    author: Author;
  }
  
 export interface Comment {
    id: number;
    content: string;
    postId: number;
    authorId: number;
    author: Author;
    replies: Reply[];
    createdAt: string;  
  }

