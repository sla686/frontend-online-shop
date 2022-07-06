import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchAllUsers,
  logoutUsers,
  createUser,
  updateUserAPI,
} from "../features/users/usersSlice";
import { logoutCurUser } from "../features/users/currentUserSlice";
import avatarNotFound from "../images/imageNotFound.png";
import { User } from "../types/user";

const Profile = () => {
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [modify, setModify] = useState(false);

  // Add user form states
  const [id, setId] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<"admin" | "customer">("customer");
  const [avatar, setAvatar] = useState<string>("");

  // To check if form is filled up correctly and notify the user in case of an error
  const [nameEmpty, setNameEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [avatarEmpty, setAvatarEmpty] = useState(false);

  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const allUsers = useAppSelector((state) => state.users.userList);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    if (currentUser) dispatch(fetchAllUsers(currentUser));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allUsers.length) setShowAllUsers(true);
    else setShowAllUsers(false);
  }, [allUsers]);

  const checkNotEmpty = (item: string, setItem: (arg0: boolean) => void) => {
    if (!item.trim()) {
      setItem(true);
    } else setItem(false);
  };

  //@ts-ignore
  const handleSubmit = (event) => {
    event.preventDefault();

    // Checking if our form items are not empty
    checkNotEmpty(name, setNameEmpty);
    checkNotEmpty(email, setEmailEmpty);
    checkNotEmpty(password, setPasswordEmpty);
    checkNotEmpty(avatar, setAvatarEmpty);

    if (!nameEmpty && !emailEmpty && !passwordEmpty && !avatarEmpty) {
      axios
        .post("https://api.escuelajs.co/api/v1/users/is-available", {
          email: email,
        })
        .then((response) => {
          const updateUser = allUsers.find((user) => user.id === id);
          if (response.data.isAvailable) {
            setUserExist(false);
            setEmailEmpty(false);
            if (!modify)
              dispatch(
                createUser({
                  id: Number(nanoid()),
                  name: name,
                  role: role,
                  email: email,
                  password: password,
                  avatar: avatar,
                })
              );
            else {
              dispatch(
                updateUserAPI({
                  id: id,
                  name: name,
                  role: role,
                  email: email,
                  password: password,
                  avatar: avatar,
                })
              );
            }
            setName("");
            setEmail("");
            setRole("customer");
            setPassword("");
            setAvatar("");
          } else if (updateUser?.email === email) {
            dispatch(
              updateUserAPI({
                id: id,
                name: name,
                role: role,
                email: email,
                password: password,
                avatar: avatar,
              })
            );
            setName("");
            setEmail("");
            setRole("customer");
            setPassword("");
            setAvatar("");
          } else {
            setEmailEmpty(true);
            setUserExist(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // const onChangeUser = (id: number) => {
  //   console.log(id);
  //   //@ts-ignore
  //   formRef.current.scrollIntoView();
  //   setModify(true);
  //   const updateUser = allUsers.find((user) => user.id === id);
  //   if (updateUser) {
  //     setId(updateUser?.id);
  //     setName(updateUser?.name);
  //     setEmail(updateUser?.email);
  //     setRole(updateUser?.role);
  //     setPassword(updateUser?.password);
  //     setAvatar(updateUser?.avatar);
  //   }
  // };

  const onCancel = () => {
    setModify(false);
    setId(0);
    setName("");
    setEmail("");
    setRole("customer");
    setPassword("");
    setAvatar("");

    setNameEmpty(false);
    setEmailEmpty(false);
    setPasswordEmpty(false);
    setAvatarEmpty(false);
  };

  return (
    <div className="profile">
      <Link
        to="/login"
        onClick={() => {
          dispatch(logoutUsers({}));
          dispatch(logoutCurUser({}));
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
                    <div key={user.id} className="users__user">
                      <div onClick={() => navigate(`/users/${user.id}`)}>
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
                      {/* API update call doesn't work! */}
                      {/* <IconButton
                        aria-label="Update user information"
                        onClick={() => onChangeUser(user.id)}
                        size="large"
                      >
                        <ManageAccountsIcon fontSize="large" />
                      </IconButton> */}
                    </div>
                  );
                })}
            </div>
            <div className="form" ref={formRef}>
              <form className="form__add" onSubmit={handleSubmit}>
                <Box
                  className="form-control"
                  sx={{
                    minWidth: 100,
                    fontSize: 20,
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Create a new user
                  </Typography>
                  <TextField
                    id="filled-basic"
                    error={nameEmpty}
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Name"
                    type="name"
                    autoFocus
                    variant="filled"
                    autoComplete="new-password"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    id="filled-basic"
                    error={emailEmpty}
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    variant="filled"
                    autoComplete="new-password"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    id="filled-basic"
                    error={passwordEmpty}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    variant="filled"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="label-role">Role</InputLabel>
                    <Select
                      labelId="label-role"
                      id="role-select"
                      value={role}
                      label="role"
                      // sx={{ fontSize: 20 }}
                      onChange={(e) => {
                        if (
                          e.target.value === "customer" ||
                          e.target.value === "admin"
                        )
                          setRole(e.target.value);
                      }}
                    >
                      <MenuItem value={"customer"}>Customer</MenuItem>
                      <MenuItem value={"admin"}>Admin</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="filled-basic"
                    error={avatarEmpty}
                    margin="normal"
                    required
                    fullWidth
                    name="avatar"
                    label="Avatar URL"
                    type="avatar"
                    variant="filled"
                    autoComplete="new-password"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                  {userExist && <p>User with such email already exists!</p>}
                  {modify && (
                    <button
                      type="button"
                      className="btn btn-block"
                      onClick={onCancel}
                    >
                      Cancel
                    </button>
                  )}
                  <Button
                    aria-label="add user"
                    fullWidth
                    type="submit"
                    className="btn btn-block"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                    {/* <AddBoxIcon /> */}
                  </Button>
                </Box>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
/*
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <FormControl required fullWidth margin="normal">
            <InputLabel sx={{ fontSize: 20 }} id="label-role">
              Role
            </InputLabel>
            <Select
              labelId="label-role"
              id="role-select"
              value={role}
              label="role"
              sx={{ fontSize: 20 }}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value={"admin"}>Done</MenuItem>
              <MenuItem value={"customer"}>In Progress</MenuItem>
            </Select>
          </FormControl>
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
</div>;
*/

export default Profile;
