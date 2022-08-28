import * as React from "react";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Home Usuário Conectado
      </Box>
    </>
  );
}
