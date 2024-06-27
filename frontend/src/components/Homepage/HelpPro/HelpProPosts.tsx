import React, { useEffect } from 'react'
import Post from '../Post'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import image from "../../../../public/images/noposts.svg"
import { Skeleton } from '@/components/ui/skeleton'
const HelpProPosts = () => {
  const [posts, setPosts] = React.useState([])
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/project/all`,{
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

  if(posts.length === 0){
    return (
      <div className="w-full dark:bg-[] flex justify-center my-12">
        <div className="flex flex-col justify-center items-center">
          <img src="../../../../public/images/noposts.svg" className="w-[250px] h-[250px]"></img>
          <h1 className="dark:text-white text-2xl my-5">No Posts at Present!</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
        {
          posts.length>0 &&  posts.map((post: any) => {
            return (
              <div onClick={()=>{navigate(`/project/${post.id}`)}} className=' cursor-pointer'>
                <Post title={post.title} description={post.description} bounty={post.bounty} author={post.author.name} techstack={post.techstack} />
              </div>
            )

          })
        }

    </div>
  )
}

export default HelpProPosts