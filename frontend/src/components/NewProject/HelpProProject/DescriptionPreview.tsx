import { useEffect, useState } from 'react';
import  edit  from '../../../utils/DescriptionEditor';
const DescriptionPreview = ({description} : {description : any}) => {
  const [data, setData] = useState("");
  useEffect(() => {
    setData(edit(description));
  }, [description]);

  return (
    <div className="w-full">
        <div dangerouslySetInnerHTML={{ __html : data}} className="w-full"></div>
    </div>
  )
}
export default DescriptionPreview