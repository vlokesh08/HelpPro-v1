import { Button } from '../ui/button'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
const DeleteProject = () => {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
    const handleDelete = async () => {
        try {
        await axios.delete(`${BACKEND_URL}/api/v1/project/delete/${id}`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        toast.success('Post deleted successfully')
        navigate('/')
        } catch (e) {   
        console.error(e)
        toast.error('Failed to delete post')
        }
    }
  return (
    <div  className="dark:text-white"  >
        <h1 className="mb-2 text-sm font-medium leading-6 dark:text-white text-gray-900">Delete Post</h1>
        <p>Are you sure you want to delete this post?</p>
        <div className="flex justify-end">

        <Button onClick={handleDelete}>Delete</Button>
        </div>
    </div>
  )
}

export default DeleteProject