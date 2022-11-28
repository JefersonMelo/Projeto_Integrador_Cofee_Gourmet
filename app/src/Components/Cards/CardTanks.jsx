import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { UseWindowSize } from "../../Helpers/UseWindowSize";
import ButtonReturnShop from "../Buttons/ButtonReturnShop"

export default function CardTanks() {
  const [width] = UseWindowSize();
  return (
    <Card
      sx={{
        elevation: 12,
        display: width >= 503 ? "flex" : "auto",
        width: width >= 503 ? "100%" : "auto",
        backgroundColor: '#fffafa'
      }}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Valeu Por Estar Aqui!
        </Typography>

        <Typography paragraph color="text.secondary">
          Gostaria de te agradecer por ter reservado um pouco do seu tempo para
          testar esta aplicação. Você poderia estar fazendo outras coisas
          legais, mas parou suas atividades e chegou aqui. Seu feedback é
          fundamental para a melhora da aplicação e entrega do projeto.
          <br />
          Meus sinceros agradecimentos!
          <br />
          Que o Todo Poderoso Te Abençoe Ricamente!
        </Typography>
        <ButtonReturnShop title={"Feedback"}/>
      </CardContent>
    </Card>
  );
}
