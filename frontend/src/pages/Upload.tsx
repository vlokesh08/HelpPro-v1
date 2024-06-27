import { useState } from 'react';

const Upload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Extract user from localStorage
  const user = localStorage.getItem('user');
  const user_temp = user ? JSON.parse(user) : null;
  const user_id = user_temp ? user_temp.id : null;

  // Handle image change event
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setErrorMessage(null); // Clear error message on new file selection
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      setErrorMessage('Please select an image to upload.');
      return;
    }

    if (!user_id) {
      setErrorMessage('User not found. Please log in again.');
      return;
    }

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
      setErrorMessage('Error uploading file. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fileInput">Upload Image:</label>
        <input type="file" onChange={handleImageChange} name="file" id="fileInput" />
      </div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <button type="submit">Upload</button>
    </form>
  );
};

export default Upload;
