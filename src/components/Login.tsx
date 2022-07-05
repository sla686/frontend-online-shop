import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginByToken, login } from "../features/users/currentUserSlice";

const theme = createTheme();

//@ts-ignore
export default function Login() {
  const [auth, setAuth] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  // const token = localStorage.getItem("current_user");

  useEffect(() => {
    // Checking if we are logged in
    if (currentUser) {
      setTryAgain(false);
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [currentUser]);

  // if (!currentUser && token) {
  //   // If we have a token we can easily log in automatically
  //   dispatch(loginByToken(token));
  // }

  //@ts-ignore
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    dispatch(
      //@ts-ignore
      login({ email: data.get("email"), password: data.get("password") })
    );

    // If the store is still empty then it means we typed incorrect credentials. However it's a sync operation relying on the async info :(
    if (!currentUser) setTryAgain(true);
  };

  return (
    <div className="login">
      {auth && <Navigate to="/profile" replace />}
      <h3>
        Authentication required to get access to your user profile as well as to
        get access for additional options (if you are an admin)
      </h3>
      {tryAgain && <h3>Incorrect username or password!</h3>}
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
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
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                variant="filled"
              />
              <TextField
                id="filled-basic"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
