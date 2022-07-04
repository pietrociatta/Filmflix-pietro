import React from 'react';
import { useSelector } from 'react-redux';

import { userSelector } from '../../features/auth';

const Profile = () => {
  const { user } = useSelector(userSelector);
  return (
    <div className="">
      <h1>{user.username}</h1>
    </div>
  );
};

export default Profile;
