import { useParams } from "react-router-dom";

import useUser from "../features/users/useUser";
import imageNotFound from "../images/imageNotFound.png";

const SingleUser = () => {
  const { userId } = useParams();
  const user = useUser(userId);

  return (
    <div>
      {/* @ts-ignore */}
      {user ? (
        <div className="singleUser">
          <img
            src={user?.avatar}
            //@ts-ignore
            onError={(e) => (e.target.src = imageNotFound)}
            alt="avatar"
          />
          <p>User ID: {user?.id}</p>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
        </div>
      ) : (
        <div>
          The user does not exist or it's unavailable to recieve the information
          about this user!
        </div>
      )}
    </div>
  );
};

export default SingleUser;
