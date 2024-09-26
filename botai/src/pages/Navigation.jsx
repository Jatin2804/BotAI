import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Link,
} from "react-router-dom"; // Added Link import
import Home from "./Home";
import AIBot from "./AIBot";
import ChatBot from "./ChatBot";
import Saved from "./Saved";
import { useTheme } from "@mui/material/styles"; // Import useTheme and useMediaQuery
import useMediaQuery from "@mui/material/useMediaQuery";
import "./style.css";
import { useDarkmode } from "../context/Darkmode";
import BookmarkIcon from '@mui/icons-material/Bookmark';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { darkMode, toggleMode } = useDarkmode();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [savedChats, setSavedChats] = React.useState([]);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };
 
  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        height: "100%",
      }}
    >
      <Toolbar />
      {darkMode ? (
        <Box className="bulb" onClick={toggleMode}>
          <img src="images/bulboff.png" height="100px" width="50px" alt="" />
        </Box>
      ) : (
        <Box className="bulb" onClick={toggleMode}>
          <img src="images/bulbon.png" height="100px" width="80px" alt="" />
        </Box>
      )}

      <Box
        component={Link} // Using Link to navigate to chatbot
        to="/home"
      >
        <img src="./images/hero.png" height="200px" width="200px" alt="Hero" />
      </Box>
      <Divider />

      {/* ChatBot Link */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link} // Using Link to navigate to chatbot
            to="/chatbot"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <img src="images/chatbot.png" height="50px" width="50px" alt="" />
            <ListItemText primary="ChatBot" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      {/* AIBot Link */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link} // Using Link to navigate to aibot
            to="/"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <img src="images/aibot.png" height="50px" width="50px" alt="" />
            <ListItemText primary="AIBot" />
          </ListItemButton>
        </ListItem>
      </List>

      {/* Saved */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link} // Using Link to navigate to aibot
            to="/saved"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
           <BookmarkIcon/>
            <ListItemText primary="Saved" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <CssBaseline />
      {!isLargeScreen && (
        <AppBar
          position="fixed"
          sx={{
            width: {
              md: "0",
              xs: isMediumScreen ? `calc(100% - ${drawerWidth}px)` : "100%",
            },
            ml: isMediumScreen ? `${drawerWidth}px` : 0,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: theme.palette.secondary.dark,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: theme.palette.secondary.dark,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, mt: isLargeScreen ? 0 : 8 }}
      >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/chatbot" element={<ChatBot savedChats={savedChats} setSavedChats={setSavedChats} />} />
          <Route path="/" element={<AIBot savedChats={savedChats} setSavedChats={setSavedChats} />} />
          <Route path="/saved" element={< Saved savedChats={savedChats} setSavedChats={setSavedChats}/>} />
        </Routes>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
