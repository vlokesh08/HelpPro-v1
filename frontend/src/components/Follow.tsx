import { UserPlus } from 'lucide-react';
import React from 'react';
import { useSubscribe } from "../hooks/subscriber"; // Adjust the path as necessary
import { Button } from './ui/button';

interface FollowButtonProps {
  userId: string;
}

const Follow: React.FC<FollowButtonProps> = ({ userId }) => {
  const { loading, subscribed, error, subscribe, unsubscribe, isSameUser } = useSubscribe(userId);

  if (isSameUser) {
    return null; // Don't show the button if the user is viewing their own profile
  }

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button onClick={subscribed ? unsubscribe : subscribe} disabled={loading}>
        <UserPlus className="mr-2 h-[18px] w-[18px]" />
        {subscribed ? 'UnFollow' : 'Follow'}
      </Button>
    </div>
  );
};

export default Follow;
