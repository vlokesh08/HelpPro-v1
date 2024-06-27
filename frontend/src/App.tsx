import './App.css'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddNewProject from './pages/AddNewProject'
import Post from './pages/Post'
import ProfilePage from './pages/ProfilePage'
import LandingPage from './pages/LandingPage'
import HelpProNewProject from './pages/HelpProNewProject'
import Upload from './pages/Upload'
import HelpProProjectPreview from './pages/HelpProProjectPreview'
import SettingsPage from './pages/SettingsPage'
function App() {

  return (
    <>
     
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/newpost" element={<AddNewProject />} />
        <Route path="/newproject" element={<HelpProNewProject />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/project/:id" element={<HelpProProjectPreview />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/temp" element={<LandingPage />} />
        <Route path="/upload" element={<Upload />} />


        <Route path="*" element={<div>Not Found</div>} />


      </Routes>
    </>
  )
}

export default App
