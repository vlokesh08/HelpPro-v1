import { useParams } from "react-router-dom"
const Temp = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <div>{id}</div>
  )
}

export default Temp