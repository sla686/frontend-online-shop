import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../features/users/currentUserSlice";
//@ts-ignore
export default function Login() {
  const [auth, setAuth] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

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

  const checkNotEmpty = (item: string, setItem: (arg0: boolean) => void) => {
    if (!item.trim()) {
      setItem(true);
    } else setItem(false);
  };

  //@ts-ignore
  const handleSubmit = (event) => {
    event.preventDefault();

    checkNotEmpty(email, setEmailEmpty);
    checkNotEmpty(password, setPasswordEmpty);

    if (!emailEmpty && !passwordEmpty)
      dispatch(
        //@ts-ignore
        login({ email: email, password: password })
      );

    // If the store is still empty then it means we typed incorrect credentials. However it's a sync operation relying on the async info :(
    if (!currentUser) {
      setTimeout(() => {
        setEmailEmpty(true);
        setPasswordEmpty(true);
        setTryAgain(true);
      }, 1250);
    }
  };

  return (
    <div className="login">
      {auth && <Navigate to="/profile" replace />}
      <h3>
        Authentication required to get access to your user profile as well as to
        get access for additional options (if you are an admin)
      </h3>
      {tryAgain && <h3>Incorrect username or password!</h3>}

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
              error={emailEmpty}
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="filled"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
    </div>
  );
}
