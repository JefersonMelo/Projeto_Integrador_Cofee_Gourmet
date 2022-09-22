import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { useAppContext } from "../../Contexts/AppContext";
import ButtonUserConnect from "../Buttons/ButtonUserConnect";
import BadgeShoppingCar from "../Badge/BadgeShoppingCar";
import SearchBar from "../Searches/SearchBar";
import { getToken } from "../../Services/auth";
import UserAvatar from "../Avatars/UserAvatar";

export default function NavBar({ open }) {
  const [appContext, setAppContext] = useAppContext();

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            COFFEE BREAK
          </Typography>
          <Box sx={{ flexGrow: 2 }}>
            <SearchBar placeholder={"Pesquisar"} width={"70%"} />
          </Box>

          {getToken() ? (
            <>
              <UserAvatar />
              <BadgeShoppingCar badgeContent={1} />
            </>
          ) : (
            <ButtonUserConnect />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
