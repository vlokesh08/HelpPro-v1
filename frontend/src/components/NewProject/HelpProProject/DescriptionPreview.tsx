import ReactQuill from "react-quill"

const DescriptionPreview = ({description} : {description : any}) => {
  return (
    <div className="w-full">
        <ReactQuill
        value={description}
        placeholder="Write something..."
        readOnly={true}
        modules={{ toolbar: false }}
        className="rounded-lg dark:text-white dark:bg-dark-body"
        theme={'bubble'}
      />
    </div>
  )
}
export default DescriptionPreview