import Navbar from '@/components/Navbar/Navbar'
import Temp from './Temp'
import { useEffect, useState } from 'react';
import HomeScreenLoading from '@/components/LoadingPages/HomeScreenLoading';

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

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
        <Temp />
    </div>
  )
}

export default ProfilePage