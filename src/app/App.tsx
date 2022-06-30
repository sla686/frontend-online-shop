import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch } from "./hooks";

import "../styles/style.scss";

import Cart from "../components/Cart";
import HomePage from "../components/HomePage";
import Products from "../components/Products";
import Profile from "../components/Profile";
import Navigation from "../components/Navigation";
import Login from "../components/Login";
import RequireAuth from "../helpers/RequireAuth";
import { fetchProducts } from "../features/products/productsSlice";

function App() {
  const [auth, setAuth] = useState(false);
  // const [users, setUsers] = useState([{ username: "sla686", password: "123" }]);
  const [authUser, setAuthUser] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ offset: 0, limit: 10 }));
  });

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
          <Route path="products" element={<Products />} />
          <Route
            path="profile"
            element={
              <RequireAuth authenticated={auth}>
                <Profile
                  user={authUser}
                  unAuth={() => {
                    setAuth(false);
                    setAuthUser("");
                  }}
                />
              </RequireAuth>
            }
          />
          <Route
            path="login"
            element={
              <Login
                authorize={(user: string) => {
                  setAuth(true);
                  setAuthUser(user);
                }}
              />
            }
          />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
