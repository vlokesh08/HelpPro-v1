import { useEffect, useState } from 'react';
import useSavePost from "../hooks/savePost"; // Adjust the path as necessary
import { Button } from './ui/button';
import { Bookmark, Loader2 } from 'lucide-react';

const SavePost = ({ 
  id,
    isPost,
    isProject 
 } : { 
  id : string
    isPost? : boolean
    isProject? : boolean
  }) => {
  const {
    bookmarkBlog,
    unbookmarkBlog,
    checkIfBookmarkedProject,
  } = useSavePost();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      const bookmarked = await checkIfBookmarkedProject(id);
      console.log(bookmarked);
      setIsBookmarked(bookmarked);
      setLoading(false);
    };

    checkBookmarkStatus();
  }, [id, checkIfBookmarkedProject]);

  const handleBookmark = async () => {
    setLoading(true);
    const result = isBookmarked
      ? await unbookmarkBlog({id,isPost, isProject})
      : await bookmarkBlog({ id: id, isPost, isProject });
    if (!result.error) {
      setIsBookmarked(!isBookmarked);
    }
    setLoading(false);
  };

  if (loading) {
    return 
    (
      <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
    );
  }

  return (
    <Button onClick={handleBookmark}>
      <Bookmark className={`mr-1 ${isBookmarked ? "fill-white dark:fill-black" : "fill-none"}`}/>
      {isBookmarked ? 'Unbookmark' : 'Bookmark'}
    </Button>
  );
};

export default SavePost;
