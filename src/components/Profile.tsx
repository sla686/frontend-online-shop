import { Link } from "react-router-dom";

//@ts-ignore
const Profile = ({ user, unAuth }) => {
  return (
    <div>
      <h2>Hello, {user}!</h2>
      <Link
        to="/login"
        onClick={() => {
          unAuth();
        }}
      >
        Sign out
      </Link>
    </div>
  );
};

export default Profile;
