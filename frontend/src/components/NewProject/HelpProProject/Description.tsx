import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

const Description = ({ description, setDescription } : {
  description: string;
  setDescription: (description: string) => void;
}) => {
  const handleChange = (content : any, delta : any, source : any, editor : any) => {
    console.log(content, delta, source);
    setDescription(editor.getHTML()); // Use editor.getHTML() to get the HTML content
  };

  return (
    <div>
      <ReactQuill
        value={description}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Write something..."
        className=" border-slate-700 rounded-lg dark:text-white dark:bg-dark-body react-quill-no-border"
      />
    </div>
  );
};

// Optional: Customize the toolbar and other modules
const modules = {
  toolbar: [
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    ['link', 'image'],
    [{ align: [] }],
  ],
};

const formats = [
  'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'link', 'image', 'align', 'color', 'background'
];

export default Description;
