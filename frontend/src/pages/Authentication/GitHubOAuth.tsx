import React from 'react';
import axios from "axios"
const GITHUB_CLIENT_ID = 'Ov23ct6yKrCQOfjkoGQP';
const GITHUB_CLIENT_SECRET = '33cc1446326df42f055bf9b57445172d7c35aaa4';
const GITHUB_CALLBACK_URL = 'http://localhost:5173/';

const GitHubOAuth = () => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const handleLogin = async (code) => {
    try {
      // Exchange the code for an access token
      

      // Handle the user profile data (e.g., store it in your database and log the user in)
      
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div>
      <a href={githubOAuthURL}>Sign in with GitHub</a>
    </div>
  );
};

export default GitHubOAuth;