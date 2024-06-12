import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddNewProject from './pages/AddNewProject'
import Post from './pages/Post'
import ProfilePage from './pages/ProfilePage'
import LandingPage from './pages/LandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/newproject" element={<AddNewProject />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/temp" element={<LandingPage />} />

        <Route path="*" element={<div>Not Found</div>} />


      </Routes>
    </>
  )
}

export default App
