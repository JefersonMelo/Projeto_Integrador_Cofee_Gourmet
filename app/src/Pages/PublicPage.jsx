import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useAppContext } from "../Contexts/AppContext";
import GridBase12x3 from "../Components/Grids/GridBase12x3";
import CardHome from "../Components/Cards/CardHome";
import ButtonTipWeek from "../Components/Buttons/ButtonTipWeek";
import ImgCoffeeCup from "../Static/Imgs/coffee-cup-and-beans.jpg";
import { Main } from "../Pages/Config/MainStyle";

const data = [
  {
    ProdutoID: 1,
    ProdutoNome: "Café A",
    Valor: 20.5,
    Peso: 1,
    Fornecedor: "Café Maroto",
    DescResumida:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    DescDetalhada:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    ProdutoID: 2,
    ProdutoNome: "Café B",
    Valor: 20.5,
    Peso: 1,
    Fornecedor: "Café Maroto",
    DescResumida:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    DescDetalhada:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    ProdutoID: 3,
    ProdutoNome: "Café C",
    Valor: 20.5,
    Peso: 1,
    Fornecedor: "Café Maroto",
    DescResumida:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    DescDetalhada:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    ProdutoID: 4,
    ProdutoNome: "Café D",
    Valor: 20.5,
    Peso: 1,
    Fornecedor: "Café Maroto",
    DescResumida:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    DescDetalhada:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    ProdutoID: 5,
    ProdutoNome: "Café E",
    Valor: 20.5,
    Peso: 1,
    Fornecedor: "Café Maroto",
    DescResumida:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    DescDetalhada:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    ProdutoID: 6,
    ProdutoNome: "Café F",
    Valor: 20.5,
    Peso: 1,
    Fornecedor: "Café Maroto",
    DescResumida:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    DescDetalhada:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

export default function PublicPage() {
  const [appContext, ] = useAppContext();

  return (
    <Box sx={{ mt: 7, flexGrow: 12 }}>
      <Main open={appContext.drawerOpened} context={appContext}>
        <Box sx={{ m: 2 }}>
          <Paper>
            <Box
              component="img"
              sx={{ width: "100%", height: "300px" }}
              src={ImgCoffeeCup}
              alt="Xícara de Café. Dica da Semana"
            />
            <br />
            <ButtonTipWeek />
          </Paper>
        </Box>
        <Box sx={{ mt: 5 }}>
          <GridBase12x3 Element={CardHome} data={data} />
        </Box>
      </Main>
    </Box>
  );
}
