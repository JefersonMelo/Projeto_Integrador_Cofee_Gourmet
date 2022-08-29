import * as React from "react";
import Button from "@mui/material/Button";
import { openInNewTab } from "../../Helpers/Helpers";

export default function ButtonTipWeek() {
  return (
    <Button
      variant="contained"
      onClick={() => openInNewTab("http://blog.clubecafe.net.br/")}
    >
      Acesse Nosso Blog Com Dicas Sobre Café
    </Button>
  );
}
