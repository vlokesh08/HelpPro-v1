import Navbar from '@/components/Navbar/Navbar'
import Temp from './Temp'
import { useEffect, useState } from 'react';
import HomeScreenLoading from '@/components/LoadingPages/HomeScreenLoading';

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to update the loading state after 1 second (1000 milliseconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>
      <HomeScreenLoading />
    </div>;
  }
  return (
    <div>
        <Navbar />
        {/* <Profile /> */}
        <Temp />
    </div>
  )
}

export default ProfilePage