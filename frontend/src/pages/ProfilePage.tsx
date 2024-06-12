import Navbar from '@/components/Navbar/Navbar'
import Profile from '@/components/ProfilePage/Profile'
import React from 'react'
import Temp from './Temp'

const ProfilePage = () => {
  return (
    <div>
        <Navbar />
        {/* <Profile /> */}
        <Temp />
    </div>
  )
}

export default ProfilePage