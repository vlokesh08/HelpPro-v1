
import { Button } from '../ui/button'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react';
const DeletePost = () => {
    const { id } = useParams<{ id: string }>()
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
    const handleDelete = async () => {
        try {
        await axios.delete(`${BACKEND_URL}/api/v1/post/delete/${id}`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        toast.success('Post deleted successfully')
        } catch (e) {   
        console.error(e)
        toast.error('Failed to delete post')
        }
    }
  return (
    <div className="dark:text-white" >
        <h1 className="mb-2 text-xl font-bold leading-6 text-gray-900 dark:text-white">Delete Post</h1>
        <p>Are you sure you want to delete this post?</p>
        <div className="flex justify-end">

        <Button onClick={handleDelete}>
          <Trash2 className="h-[18px] w-[18px] mr-1" />
          Delete
        </Button>
        </div>
    </div>
  )
}

export default DeletePost