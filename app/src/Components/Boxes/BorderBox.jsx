import React from "react";
import Box from "@mui/material/Box";

export default function BorderBox({ Element }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        sx={{
          boxShadow: 3,
          mt: '5rem',
          p: 2,
          border: 1,
          height: "100%",
          width: "50%",
          borderRadius: 3,
        }}
      >
        {<Element />}
      </Box>
    </Box>
  );
}
