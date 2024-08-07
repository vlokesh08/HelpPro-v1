import { useEffect, useState } from 'react';
import Post from '../Post';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HomeScreenLoading from '@/components/LoadingPages/HomeScreenLoading';

interface PostType {
  id: number;
  title: string;
  description: string;
  bounty: boolean;
  author: {
    name: string;
    profilePic: string;
  };
  techstack: string;
}

const HelpProPosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/project/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPosts(response.data.posts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };
    fetchPosts();
  }, [BACKEND_URL]);

  if (loading) {
    return <div>
      <HomeScreenLoading />
    </div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="w-full flex justify-center my-12">
        <div className="flex flex-col justify-center items-center">
          <img
            src="images/noposts.svg"
            alt="No Posts"
            className="w-[250px] h-[250px]"
          />
          <h1 className="dark:text-white text-2xl my-5 font-spacegotesk">No Posts at Present!</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-full mt-4">
      {posts.map((post) => (
        <Link to={`/project/${post.id}`}
          // key={post.id}
          // onClick={() => navigate(`/project/${post.id}`)}
          // className="cursor-pointer block"
        >
          <Post
            title={post.title}
            description={post.description}
            bounty={post.bounty}
            author={post.author.name}
            techstack={post.techstack}
            profile = {post.author.profilePic}
          />
        </Link>
      ))}
    </div>
  );
};

export default HelpProPosts;
