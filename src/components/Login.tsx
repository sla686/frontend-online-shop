import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

//@ts-ignore
export default function Login({ authorize }) {
  const [auth, setAuth] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);

  //@ts-ignore
  const users = useSelector((state) => state.users);

  //@ts-ignore
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
    //@ts-ignore
    users.forEach((el) => {
      if (
        data.get("username") === el.username &&
        data.get("password") === el.password
      ) {
        console.log("authorized!");
        setAuth(true);
        console.log(el.username);
        setTryAgain(false);
        authorize(el.username);
      } else {
        setTryAgain(true);
      }
    });
  };

  return (
    <div className="login">
      {auth && <Navigate to="/profile" replace />}
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
                label="Username"
                name="username"
                type="text"
                autoComplete="username"
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
