import React, { useEffect } from 'react'
import Post from './Post'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const HomepagePosts = () => {
  const [posts, setPosts] = React.useState([])
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/post/all`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(res => {
      setPosts(res.data.posts)
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="grid grid-cols-2 gap-8 w-full">
        {
          posts.length>0 &&  posts.map((post: any) => {
            return (
              <div onClick={()=>{navigate(`/post/${post.id}`)}} className=' cursor-pointer'>
                <Post title={post.title} description={post.description} bounty={post.bounty} author={post.authorId} techstack={post.techstack} />
              </div>
            )

          })
        }

    </div>
  )
}

export default HomepagePosts