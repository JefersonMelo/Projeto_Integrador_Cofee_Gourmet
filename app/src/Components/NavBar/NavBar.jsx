import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { useAppContext } from "../../Contexts/AppContext";
import ButtonUserConnect from "../Buttons/ButtonUserConnect";
import ButtonBadgeShopCar from "../Badge/ButtonBadgeShopCar";
// import SearchBar from "../Searches/SearchBar";
import { useUserContext } from "../../Contexts/UserContext";
import UserAvatar from "../Avatars/UserAvatar";
import { Button } from "@mui/material";

export default function NavBar({ open }) {
  const [appContext, setAppContext] = useAppContext();
  const [userContext] = useUserContext();

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${appContext.drawerWidth}px)`,
      marginLeft: `${appContext.drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const handleDrawerOpen = () => {
    setAppContext((appContext) => ({
      ...appContext,
      drawerOpened: true,
    }));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Button sx={{ color: "inherit" }}>COFFEE BREAK</Button>
          </Box>

          {/* <Box sx={{ flexGrow: 2 }}>
            <SearchBar placeholder={"Pesquisar"} width={"70%"} />
          </Box> */}

          {userContext.token ? (
            <>
              <UserAvatar />
              <ButtonBadgeShopCar />
            </>
          ) : (
            <ButtonUserConnect />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
