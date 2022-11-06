import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppRoutes from "./Routes/AppRoutes"


export default function App() {

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ display: "flex", overflow: "hidden" }}>
        <Box component={"main"} sx={{ mt: 0.01, width: "100%", height: "100%" }}>
          <AppRoutes />
        </Box>
      </Box>
    </React.Fragment>
  );
}