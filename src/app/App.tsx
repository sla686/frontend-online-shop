import { createContext, useEffect, useState, useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { yellow, blue } from "@mui/material/colors";

import "../styles/style.scss";
import { useAppDispatch, useAppSelector } from "./hooks";
import Cart from "../components/Cart";
import HomePage from "../components/HomePage";
import Products from "../components/Products";
import Profile from "../components/Profile";
import Navigation from "../components/Navigation";
import Login from "../components/Login";
import RequireAuth from "../helpers/RequireAuth";
import { fetchProducts } from "../features/products/productsSlice";
import SingleProduct from "../components/SingleProduct";
import SingleUser from "../components/SingleUser";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [auth, setAuth] = useState(false);

  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const dispatch = useAppDispatch();

  // const theme = createTheme({
  //   // palette: {
  //   //   mode,
  //   //   ...(mode === "light"
  //   //     ? {
  //   //         primary: yellow,
  //   //         text: {
  //   //           primary: grey[900],
  //   //           secondary: grey[500],
  //   //         },
  //   //       }
  //   //     : {
  //   //         primary: orange,
  //   //         text: {
  //   //           primary: deepOrange[900],
  //   //           secondary: deepOrange[500],
  //   //         },
  //   //       }),
  //   // },
  // });

  useEffect(() => {
    dispatch(fetchProducts({ offset: 0, limit: 10 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUser) setAuth(true);
    else setAuth(false);
  }, [currentUser]);

  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: blue,
          secondary: yellow,
          mode,
        },
      }),
    [mode]
  );

  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box>
            <Routes>
              <Route
                path="/"
                element={<Navigation colorModeContext={ColorModeContext} />}
              >
                <Route index element={<HomePage />} />
                <Route path="products">
                  <Route index element={<Products />} />
                  <Route path=":productId" element={<SingleProduct />} />
                </Route>
                <Route path="users">
                  <Route
                    path=":userId"
                    element={
                      <RequireAuth authenticated={auth}>
                        <SingleUser />
                      </RequireAuth>
                    }
                  />
                </Route>
                <Route
                  path="profile"
                  element={
                    <RequireAuth authenticated={auth}>
                      <Profile />
                    </RequireAuth>
                  }
                />
                <Route path="login" element={<Login />} />
                <Route path="cart" element={<Cart />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
