import React, { useEffect } from 'react'
import axios from 'axios'
import { Button } from '../ui/button'

const OpenSourceProfilePosts = () => {
  const [posts, setPosts] = React.useState([])
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string
  const user = localStorage.getItem('user')
  const user_temp = JSON.parse(user as string)
  const user_id = user_temp.id;
  useEffect(() => { 
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/post/getUserPosts/${user_id}`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(res.data)
        setPosts(res.data.posts)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  }, [])

  if(posts.length === 0){
    return (
      <div className='w-full dark:bg-[#283445] h-[150px] flex justify-center align-middle items-center'> 
        <div className="flex justify-center flex-col">
            <h1 className=" text-lg font-semibold">You have No Posts!</h1>
            <Button className=''
              variant={'primary'}
            onClick={()=>{window.location.href='/newpost'}}>Create a Post</Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {
        posts.map((post: any) => (
          <div key={post.id} className="bg-white dark:bg-[#283445] dark:text-white rounded-lg shadow-lg p-4 my-3 ">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-500">{post.description}</p>
            <p className="text-gray-500">TechStack: {post.techstack}</p>
            <p className="text-gray-500">Bounty: {post.bounty ? 'Yes' : 'No'}</p>
            <p className="text-gray-500">Bounty Value: {post.bountyValue}</p>
            <p className="text-gray-500">Currency: {post.currency}</p>
            <p className="text-gray-500">End Date: {post.endDate}</p>
            <p className="text-gray-500">Link: <a href={post.link} target="_blank" rel="noreferrer">{post.link}</a></p>
          </div>
        ))
      }
    </div>
  )
}

export default OpenSourceProfilePosts