import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { SideBar, Search } from "..";
import { fetchToken, createSessionId, moviesApi } from "../../utils";
import { setUser, userSelector } from "../../features/auth";
import { ColorModeContext } from "../../utils/ToggleColorMode";

function NavBar() {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");
  const colorMode = useContext(ColorModeContext);
  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
  }, [token]);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="Navbar Menu"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            aria-label="Dark and Light Mode"
            color="inherit"
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            height={86}
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <>
            {!isAuthenticated ? (
              <Button
                style={{ minWidth: "0", padding: "0" }}
                color="inherit"
                onClick={fetchToken}
                aria-label="Login"
              >
                {!isMobile && "Login"} &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={NavLink}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
                style={{ minWidth: "0", padding: "0" }}
              >
                {!isMobile && <> {user.username} &nbsp;</>}
                <Avatar
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                />
              </Button>
            )}
          </>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </>
    </>
  );
}

export default NavBar;
