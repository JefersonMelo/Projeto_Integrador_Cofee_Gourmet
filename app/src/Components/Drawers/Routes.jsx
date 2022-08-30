import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FormatClearIcon from "@mui/icons-material/FormatClear";
import CoffeeIcon from "@mui/icons-material/Coffee";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";

export const drawerListRoutesGround = [
  { name: "Fino", icon: EmojiFoodBeverageIcon, url: "/ground/fine" },
  { name: "Médio", icon: CoffeeIcon, url: "/ground/medium" },
  { name: "Granulado", icon: CoffeeMakerIcon, url: "/ground/granulated" },
  { name: "Aroma Especial", icon: AutoAwesomeIcon, url: "/ground/special" },
];

export const drawerListRoutesBeans = [
  { name: "Torra Média", icon: LocalFireDepartmentIcon, url: "/beans/medium" },
  { name: "Sem Torra", icon: FormatClearIcon, url: "/beans/no/roast" },
  { name: "Aroma Especial", icon: AutoAwesomeIcon, url: "/beans/special" },
];
