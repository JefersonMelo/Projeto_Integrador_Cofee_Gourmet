import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import { useAppContext } from "../../Contexts/AppContext";
import ButtonUserConnect from "../Buttons/ButtonUserConnect";
import BadgeShoppingCar from "../Badge/BadgeShoppingCar";
import SearchBar from "../Searches/SearchBar";
import { getToken, logout } from "../../Services/auth";
import { Button } from "@mui/material";

export default function NavBar({ open }) {
  const [appContext, setAppContext] = useAppContext();
  const navigate = useNavigate();

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
              <Button onClick={()=>{
                logout()
                navigate("/");
                }}>
                <Avatar sx={{ width: 24, height: 24 }}>J</Avatar>
              </Button>
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
