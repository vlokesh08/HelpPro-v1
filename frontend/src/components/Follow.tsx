import { UserPlus } from 'lucide-react';
import React from 'react';
import { useSubscribe } from "../hooks/subscriber"; // Adjust the path as necessary
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

interface FollowButtonProps {
  userId: string;
  className?: string;
}

const Follow: React.FC<FollowButtonProps> = ({ userId, className }) => {
  const { loading, subscribed, error, subscribe, unsubscribe, isSameUser } = useSubscribe(userId);

  if (isSameUser) {
    return null; // Don't show the button if the user is viewing their own profile
  }

  if(loading) {
    return(
      <Skeleton className='w-20 h-4 rounded-md' />
    )
  }

  return (
    <div className={className}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button onClick={subscribed ? unsubscribe : subscribe} disabled={loading} className={`${className} flex items-center `}>
        <UserPlus className="mr-2 h-[18px] w-[18px]" />
        {subscribed ? 'UnFollow' : 'Follow'}
      </Button>
    </div>
  );
};

export default Follow;
