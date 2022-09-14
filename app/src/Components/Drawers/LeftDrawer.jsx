import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import MenuList from "@mui/material/MenuList";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NavBar from "../NavBar/NavBar";
import { useAppContext } from "../../Contexts/AppContext";
import { drawerListRoutesBeans, drawerListRoutesGround } from "./Routes";
import { Link } from "react-router-dom";
import { Theme } from "../../Helpers/Theme";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function LeftDrawer({ Element }) {
  const theme = useTheme();
  const colors = Theme.palette;
  const [appContext, setAppContext] = useAppContext();

  const handleDrawerClose = () => {
    setAppContext((appContext) => ({
      ...appContext,
      drawerOpened: false,
    }));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar open={appContext.drawerOpened} />
      <Drawer
        sx={{
          width: appContext.drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: appContext.drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={appContext.drawerOpened}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography sx={{ ml: "2%" }} variant="h6">
          Café Moído
        </Typography>
        <MenuList>
          {drawerListRoutesGround.map((item, index) => (
            <Link
              key={index}
              to={{ pathname: item.url }}
              style={{ textDecoration: "none", color: colors.common.coffee }}
            >
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{<item.icon />}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </MenuList>
        <Divider />
        <Typography sx={{ ml: "2%" }} variant="h6">
          Café em Grãos
        </Typography>
        <MenuList>
          {drawerListRoutesBeans.map((item, index) => (
            <Link
              key={index}
              to={{ pathname: item.url }}
              style={{ textDecoration: "none", color: colors.common.coffee }}
            >
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{<item.icon />}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </MenuList>
      </Drawer>
      <Element />
    </Box>
  );
}
