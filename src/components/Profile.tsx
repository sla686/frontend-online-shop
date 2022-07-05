import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchAllUsers,
  logoutUsers,
  createUser,
} from "../features/users/usersSlice";
import { logoutCurUser } from "../features/users/currentUserSlice";
import avatarNotFound from "../images/imageNotFound.png";
import { User } from "../types/user";
import { nanoid } from "@reduxjs/toolkit";

const theme = createTheme();

const Profile = () => {
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const allUsers = useAppSelector((state) => state.users.userList);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Use current user check");
    if (currentUser) dispatch(fetchAllUsers(currentUser));
  }, []);

  useEffect(() => {
    console.log("Use effect all users");
    if (allUsers.length) setShowAllUsers(true);
    else setShowAllUsers(false);
  }, [allUsers]);

  //@ts-ignore
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      role: data.get("role"),
      avatar: data.get("avatar"),
    });

    //@ts-ignore
    allUsers.forEach((user) => {
      user.email === data.get("email")
        ? setUserExist(true)
        : setUserExist(false);
    });

    if (!userExist)
      dispatch(
        createUser({
          id: Number(nanoid()),
          //@ts-ignore
          name: data.get("name"),
          //@ts-ignore
          role: data.get("role"),
          //@ts-ignore
          email: data.get("email"),
          //@ts-ignore
          password: data.get("password"),
          //@ts-ignore
          avatar: data.get("avatar"),
        })
      );
  };

  return (
    <div className="profile">
      <Link
        to="/login"
        onClick={() => {
          dispatch(logoutUsers({}));
          dispatch(logoutCurUser({}));
          // We will remove the token so that we won't be automatically logged in back
          // localStorage.removeItem("current_user");
        }}
      >
        Sign out
      </Link>
      <div className="users__user users__profile">
        <img
          src={currentUser?.avatar}
          onError={(e) => {
            //@ts-ignore
            e.target.src = avatarNotFound;
          }}
          alt="avatar"
        />
        <h2>Hello, {currentUser?.name}!</h2>
        <h2>Your email: {currentUser?.email}</h2>
        <h2>Your current role: {currentUser?.role}</h2>
      </div>
      {currentUser?.role === "admin" && (
        <div>
          <p>
            You have an ability to add, change, and remove products on the
            products page.
          </p>
          <p>
            You can also get the information about all the users and create a
            new user below:
          </p>
          <div>
            <h2>Information about all the users:</h2>
            <div className="users__list">
              {showAllUsers &&
                allUsers.map((user: User) => {
                  return (
                    <div
                      key={user.id}
                      className="users__user"
                      onClick={() => navigate(`/users/${user.id}`)}
                    >
                      <img
                        src={user.avatar}
                        onError={(e) => {
                          //@ts-ignore
                          e.target.src = avatarNotFound;
                        }}
                        alt="avatar"
                      />
                      <p>User id: {user.id}</p>
                      <p>Name: {user.name}</p>
                      <p>Email: {user.email}</p>
                      <p>Role: {user.role}</p>
                    </div>
                  );
                })}
            </div>
            <div>
              <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                    sx={{
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography component="h1" variant="h5">
                      Create a new user
                    </Typography>
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <TextField
                        id="filled-basic"
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        label="Name"
                        type="name"
                        autoFocus
                        variant="filled"
                        autoComplete="new-password"
                      />
                      <TextField
                        id="filled-basic"
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        variant="filled"
                        autoComplete="new-password"
                      />
                      <TextField
                        id="filled-basic"
                        margin="normal"
                        required
                        fullWidth
                        name="role"
                        label="Role"
                        type="role"
                        variant="filled"
                        autoComplete="new-password"
                      />
                      <TextField
                        id="filled-basic"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        variant="filled"
                        autoComplete="new-password"
                      />
                      <TextField
                        id="filled-basic"
                        margin="normal"
                        required
                        fullWidth
                        name="avatar"
                        label="Avatar URL"
                        type="avatar"
                        variant="filled"
                        autoComplete="new-password"
                      />
                      {userExist && <p>User with such email already exists!</p>}
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Create
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
