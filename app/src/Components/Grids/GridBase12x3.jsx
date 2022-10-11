import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useProductContext } from "../../Contexts/ProductContext";

export default function GridBase12x3({ Element }) {
  const [productContext,] = useProductContext();
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Box
          sx={{
            p: 2,
            bgcolor: "background.default",
            display: "grid",
            gridTemplateColumns: { md: "1fr 1fr 1fr" },
            gap: 2,
          }}
        >
          {productContext.products?.map((row, index) => (
            <Box key={index}>
              <Element id={index} row={row} />
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
