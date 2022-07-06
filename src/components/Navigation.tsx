import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";

const Navigation = ({ colorModeContext }: any) => {
  const theme = useTheme();
  const colorMode = useContext(colorModeContext);

  return (
    <div>
      <nav className="nav__top">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
        <div>
          {`${theme.palette.mode[0].toUpperCase()}${theme.palette.mode.slice(
            1
          )}`}{" "}
          Mode
          <IconButton
            sx={{ ml: 1 }}
            // @ts-ignore
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness4Icon />
            ) : (
              <Brightness7Icon />
            )}
          </IconButton>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navigation;
