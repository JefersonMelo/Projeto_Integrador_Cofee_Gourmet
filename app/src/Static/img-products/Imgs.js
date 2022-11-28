import ImgCoffeeCup from "./coffee-cup-and-beans.jpg";
import ImgCoffeeBeansSpecial from "./grao-e-canela.jpg";
import ImgCoffeeGroundSpecial from "./moido-especial.jpg";
import ImgCoffeeBeansNoRoast from "./grao-sem-torra.jpg";
import ImgCoffeeGroundFine from "./po-e-colher.jpg";
import ImgCoffeeGroundMedium from "./grao-e-po.jpg";
import ImgCoffeeGroundGranulated from "./granulado.jpg";
import ImgCoffeeGroundMedium2 from "./moagem-media.jpg";
import ImgCoffeeGroundSpecial2 from "./po-e-grao.jpg";
import jefvermelho from "./01vermelho.jpg";
import jefbranco from "./02branco.jpg";
import jefpreto from "./03preto.jpg";
import nocoffee from "./sem-cafe.jpg";

const ListImgs = [
    { img: ImgCoffeeCup, id: 1 },
    { img: ImgCoffeeGroundFine, id: 2 },
    { img: ImgCoffeeGroundSpecial2, id: 3 },
    { img: ImgCoffeeGroundMedium, id: 4 },
    { img: ImgCoffeeGroundMedium2, id: 5 },
    { img: ImgCoffeeBeansNoRoast, id: 6 },
    { img: ImgCoffeeGroundSpecial, id: 7 },
    { img: ImgCoffeeGroundGranulated, id: 8 },
    { img: ImgCoffeeBeansSpecial, id: 9 },
    { img: jefvermelho, id: 10 },
    { img: jefbranco, id: 11 },
    { img: jefpreto, id: 12 },
]



export const img = (id) => {
    let img = ListImgs.filter((img) => img.id === id)
    return img[0] ? img[0].img : nocoffee
}  
