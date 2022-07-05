import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { createTheme } from "@mui/material";
import { deepOrange, grey, orange, yellow } from "@mui/material/colors";

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

function App() {
  const [auth, setAuth] = useState(false);
  const [mode, setMode] = useState<"dark" | "light">("dark");

  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: yellow,
            text: {
              primary: grey[900],
              secondary: grey[500],
            },
          }
        : {
            primary: orange,
            text: {
              primary: deepOrange[900],
              secondary: deepOrange[500],
            },
          }),
    },
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ offset: 0, limit: 10 }));
  }, []);

  useEffect(() => {
    if (currentUser) setAuth(true);
    else setAuth(false);
  }, [currentUser]);

  // @ts-ignore
  // const AuthWrapper = () => {
  //   return authenticated ? (
  //     <Navigate to="/profile" replace />
  //   ) : (
  //     <Navigate to="/login" replace />
  //   );
  // };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
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
    </div>
  );
}

export default App;
