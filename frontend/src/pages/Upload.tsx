import React, { useState } from 'react';

const Upload = () => {
  const [image, setImage] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const user = localStorage.getItem('user');
  const user_temp = JSON.parse(user);
  const user_id = user_temp.id;
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', image);
    formData.append('userId', user_id);

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/upload/file`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Upload Image:
          <input type="file" onChange={handleImageChange} name="file" />
        </label>
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default Upload;
