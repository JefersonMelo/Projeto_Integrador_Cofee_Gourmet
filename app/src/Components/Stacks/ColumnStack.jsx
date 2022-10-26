import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";
import ButtonReturnShop from "../Buttons/ButtonReturnShop";

export default function ColumnStack({ Element, values }) {
  return values ? (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        // minHeight: "100vh",
      }}
    >
      <Stack
        spacing={2}
        divider={<Divider flexItem />}
      >
        {values?.map((row, index) => (
          <Box key={index}>
            <Element id={index} row={row} />
          </Box>
        ))}
      </Stack>
    </Box>
  ) : (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
      }}
    >
      <ButtonReturnShop/>
    </Box>
  );
}
