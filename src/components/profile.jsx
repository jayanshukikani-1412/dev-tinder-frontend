import React from "react";
import EditProfile from "./edit-profile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store?.user);
  return (
    <div>
      {user ? (
        <EditProfile user={user} />
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;
