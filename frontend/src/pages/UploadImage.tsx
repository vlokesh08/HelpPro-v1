import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

interface UploadResponse {
  imageUrl: string;
}

const UploadImage: React.FC = () => {
  const user = localStorage.getItem("user");
  const userObj = JSON.parse(user as string);
  const userId = userObj.id;
  const token = localStorage.getItem("token");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageKey, setImageKey] = useState<string>('');
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try{
      const response = await fetch(`${BACKEND_URL}/api/v1/upload/upload`, {
        method: 'POST',
        body: formData,
      });
      console.log(response);
    }
    catch(err){
      console.log(err);
    }

  };

  const handleUpdate = async () => {
    if (!image) {
      alert('Please select an image to update.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post<UploadResponse>(`http://localhost:8787/update/${imageKey}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImageUrl(response.data.imageUrl);
      alert('Image updated successfully');
    } catch (error) {
      console.error('Error updating image', error);
      alert('Image update failed');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/delete/${imageKey}`);
      setImageUrl('');
      setImageKey('');
      alert('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image', error);
      alert('Image delete failed');
    }
  };

  return (
    <div>
      <h1>Image Uploader</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {/* <button onClick={handleUpdate} disabled={!imageKey}>Update</button>
      <button onClick={handleDelete} disabled={!imageKey}>Delete</button> */}
      {imageUrl && (
        <div>
          <h2>Uploaded Image</h2>
          <img src={imageUrl} alt="Uploaded" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
