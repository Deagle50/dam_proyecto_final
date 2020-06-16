//Constants file, with all the constants to be used on the project
import Images from '../../images'//Images are stored on the images file's index.js

export const appUrl='https://play.google.com/store/apps/details?id=com.fingersoft.hcr2&gl=ES';
export const iosAppUrl='https://apps.apple.com/nz/app/hill-climb-racing-2/id1146465836'

export const navSize = "56rem";//Bottom navigation bar's size

//Welcome msg
export const title = "BIENVENIDO A COCTELPEDIA";

//Welcome msg text
export const coctelText =   'En esta aplicación encontrarás un listado muy amplio con '+
                            '(casi) todas las bebidas alcohólicas del mercado, marcando '+
                            'si son veganas o vegetarianas, y también algunos juegos '+
                            'para hacer con tus amigos cuando estéis bebiendo. '

//Coctels
export const coctels=[
    {name:'Batido de Bailey`s', image:Images.coctels.baileysshake, graduation:17, type:'Coctel', priceH:4, priceB:7, vegetarian:true, vegan:false, description:'Para los más golosos, hasta se suele tomar como postre. Un batido que esconde un pequeño secreto: el Bailey`s', making:'Licuar 6 cl de Bailey`s, 1.5 de whiskey y 10 de leche evaporada. Servir frío y añadir nata o crema en la copa.'},
    {name:"Jäggermeister", image:Images.coctels.jaggermeister, graduation:35, type:"Shot", priceH:1, priceB:3, vegetarian:true, vegan:false, description:"Tiene un sabor fuerte, pero que a la vez es pasable. No falta en ninguna barra", making:'Servir bien frío 3 cl en un vaso de chupito y tomar rápido.'},
    {name:"Mojito", image:Images.coctels.mojito, graduation:40, type:"Cóctel", priceH:2.5, priceB:5, vegetarian:true, vegan:true, description:"Uno de los cócteles más conocidos, tiene un toque a menta que no deja indiferente", making:"En una copa de cóctel, poner hielo picado, 4 cl de ron blanco, 3 cl de zumo de  lima, unas hojas de menta, azúcar al gusto, remover y disfrutar."},
    {name:"Tequila", image:Images.coctels.tequila, graduation:40, type:"Chupito", priceH:1.5, priceB:3, vegetarian:true, vegan:true, description:"Bebida muy fuerte, que se suele acompañar con limón y sal para reducir el impacto de su sabor", making:"En un vaso de chupito servir aproximadamente 3 cl de tequila. Antes de beberlo, poner sal en la piel entre el índice y el pulgar. Chupar la sal, tomar el chupito, y acto seguido chupar una rodaja de limón."},
    {name:"Daiquiri", image:Images.coctels.daiquiri, graduation:40, type:"Cóctel",priceH:2.2, priceB:5, vegetarian:true, vegan:true, description:"Cóctel también muy reconocido, que tiene un sabor con una mezcla ácida y dulce que gustará a los paladares más exquisitos.", making:"En la copa, añadir 4cl de ron blanco, zumo de limón natural y azúcar al gusto. Frotar el borde de la copa con el limón le da un toque ácido espectacular."},
    {name:"Ginkas", image:Images.coctels.ginkas, graduation:37.5, type:"Combinado", priceH:2.5, priceB:7, vegetarian:true, vegan:true, description:"Cubata con toque ácido, de sabor agradable, muy popular entre los jóvenes.", making:"Añadir hielo, de 5 a 7 cl de Ginebra, y unos 20cl de kas o fanta (refresco) de limón, con una rodaja de limón en vaso de sidra/cubata/copa grande."},
    {name:"Blue-hawaii", image:Images.coctels.blueHawaii, graduation:37, type:"Cóctel", priceH:3, priceB:7, vegetarian:true, vegan:true, description:"Típico cóctel de color azul eléctrico con un paraguas como adorno, de sabor dulce y reconocido por todos.", making:"Mezclar 6cl de ron , 3 de Curaçao azul, 6 de zumo de piña, 3 de zumo de naranja y hielo."},
    {name:"Sangría", image:Images.coctels.sangria, graduation:13, type:"Combinado", priceH:3, priceB:6, vegetarian:true, vegan:true, description:"Casi como un refresco cualquiera, solo que con este hay que tener cuidado. Es dulce y entra bien", making:"Disolver una cucharada de azúcar en agua caliente. En un bol poner vino y el azúcar disuelto, añadir un poco de zumo de melocotón, naranja plátano y limón. Reposar y servir bien frío."},
    {name:"Piña colada", image:Images.coctels.pinacolada, graduation:37, type:"Coctel", priceH:4.5, priceB:8, vegetarian:true, vegan:false, description:"De sabor más suave y agradable para todo el mundo, un cóctel del que uno no se cansa", making:"En una batidora, mezclar 6 cl de ron, 40 cl de leche (dos tazas), unas gotas de esencia de coco y rodajas de piña. Azúcar al gusto. Batir y servir frío con hielos. "},


]

//Different order types for "CoctelpediaFragment"'s topview with filters
export const ordenar=["Sin orden",
                        "Nombre, a > z", 
                        "Nombre, z > a", 
                        "Precio en casa, € a €€€", 
                        "Precio en casa, €€€ a €",
                        "Precio en bar, € a €€€",
                        "Precio en bar, €€€ a €",
                        "Tipo, a > z",
                        "Tipo, z > a",
                        "Graduación, de baja a alta",
                        "Graduación, de alta a baja",];

//Types of coctels 
export const tipos=["Todos", "Cóctel", "Chupito", "Combinado"]

//Players key to get players from asyncStorage
export const PLAYERS_KEY = '@storage_players'

export const API_DIRECTION = 'http://192.168.0.20:5000'