import './App.css';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddNewProject from './pages/AddNewProject';
import Post from './pages/Post';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import HelpProNewProject from './pages/HelpProNewProject';
import Upload from './pages/Upload';
import HelpProProjectPreview from './pages/HelpProProjectPreview';
import SettingsPage from './pages/SettingsPage';
import PrivateRoute from './PrivateRoute';
import LoadingPage from './pages/LoadingPage';
import Developers from './pages/Developers';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/lala" element={<LoadingPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/newpost"
          element={
            <PrivateRoute>
              <AddNewProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/newproject"
          element={
            <PrivateRoute>
              <HelpProNewProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <PrivateRoute>
              <Post />
            </PrivateRoute>
          }
        />
        <Route
          path="/project/:id"
          element={
            <PrivateRoute>
              <HelpProProjectPreview />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/temp"
          element={
            <PrivateRoute>
              <LandingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Upload />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
