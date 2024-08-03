import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

const MarkdownEditor = ( {
  description,
  setDescription,
} : {
  description: string,
  setDescription: (description: string) => void,
}) => {

  const handleChange = (content : any, delta : any, source : any, editor : any) => {
    console.log(content, delta, source);
    setDescription(editor.getHTML());
  };

  return (
    <div>
      <ReactQuill
        value={description}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Write something..."
        theme='snow'
        className="border-none bg-red"
      />
      
    </div>
  );
};

// Optional: Customize the toolbar and other modules
const modules = {
  toolbar: [
    [{ header: '1'}, { header: '2'}, { font: [] }],
    [{ list: 'ordered'}, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['link', 'image'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ['clean'] // remove formatting button
  ],
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet',
  'link', 'image', 'align', 'color', 'background'
];

export default MarkdownEditor;
