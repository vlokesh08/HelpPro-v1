import React, { useEffect } from 'react'
import axios from 'axios'
import { Skeleton } from "@/components/ui/skeleton"

import { useNavigate } from 'react-router-dom'
const PostsSkeleton = () => {
  const [posts, setPosts] = React.useState([])
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()


  const skeletonTemplates = [];
  for (let i = 0; i < 5; i++) {
      skeletonTemplates.push(<SkeletonTemplate />);
  }
  
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
          {skeletonTemplates}
      </div>
  )
}

const SkeletonTemplate = () => {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
      </div>
    )
}


export default PostsSkeleton