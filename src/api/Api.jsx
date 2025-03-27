import axios from "axios";
import rossi from "../assets/rossi.png"




const products = [
  {
    id: 1,
    brand: "Yamaha",
    model: "Crypton FI",
    category: "Frenos",
    name: "Pastillas de freno delanteras",
    oldPrice: 100,
    price: 80,
    rating: 4,
    image:rossi,
    description: "Pastillas de freno de alto rendimiento para máxima seguridad y durabilidad."
  },
  {
    id: 2,
    brand: "Honda",
    model: "CBR 500R",
    category: "Aceites",
    name: "Aceite sintético 10W-40",
    oldPrice: 120,
    price: 95,
    rating: 5,
    image: rossi,
    description: "Aceite de motor sintético premium para máximo rendimiento y protección."
  },
  {
    id: 3,
    brand: "Suzuki",
    model: "GSX-R750",
    category: "Iluminación",
    name: "Faro delantero LED",
    oldPrice: 150,
    price: 130,
    rating: 4.5,
    image: rossi,
    description: "Faro LED de alta potencia para mayor visibilidad y seguridad."
  },
  {
    id: 4,
    brand: "Kawasaki",
    model: "Ninja 650",
    category: "Frenos",
    name: "Disco de freno trasero",
    oldPrice: 200,
    price: 180,
    rating: 4,
    image: rossi,
    description: "Disco de freno de acero inoxidable para una frenada precisa y confiable."
  },
  {
    id: 5,
    brand: "BMW",
    model: "S1000RR",
    category: "Accesorios",
    name: "Manillar ajustable",
    oldPrice: 180,
    price: 160,
    rating: 4.7,
    image: rossi,
    description: "Manillar ajustable ergonómico para mayor comodidad y control."
  },
  {
    id: 6,
    brand: "Ducati",
    model: "Panigale V4",
    category: "Escape",
    name: "Escape deportivo Akrapovic",
    oldPrice: 900,
    price: 850,
    rating: 5,
    image: rossi,
    description: "Escape de alto rendimiento con sonido agresivo y mejor flujo de gases."
  },
  {
    id: 7,
    brand: "Harley-Davidson",
    model: "Street 750",
    category: "Frenos",
    name: "Líquido de frenos DOT4",
    oldPrice: 30,
    price: 25,
    rating: 4.2,
    image: rossi,
    description: "Líquido de frenos de alto punto de ebullición para máxima seguridad."
  },
  {
    id: 8,
    brand: "Triumph",
    model: "Speed Triple",
    category: "Neumáticos",
    name: "Neumático trasero 190/55ZR17",
    oldPrice: 250,
    price: 220,
    rating: 4.8,
    image: rossi,
    description: "Neumático deportivo con excelente agarre y durabilidad."
  },
  {
    id: 9,
    brand: "Aprilia",
    model: "RSV4",
    category: "Suspensión",
    name: "Horquilla delantera ajustable",
    oldPrice: 600,
    price: 550,
    rating: 4.9,
    image: rossi,
    description: "Horquilla delantera con ajuste de compresión y rebote para mejor maniobrabilidad."
  },
  {
    id: 10,
    brand: "KTM",
    model: "Duke 390",
    category: "Accesorios",
    name: "Cúpula parabrisas",
    oldPrice: 90,
    price: 75,
    rating: 4.5,
    image: rossi,
    description: "Cúpula aerodinámica que reduce la resistencia al viento."
  },
  {
    id: 11,
    brand: "Yamaha",
    model: "R1",
    category: "Frenos",
    name: "Disco de freno delantero",
    oldPrice: 210,
    price: 190,
    rating: 4.6,
    image: rossi,
    description: "Disco de freno flotante con mejor disipación de calor."
  },
  {
    id: 12,
    brand: "Honda",
    model: "Africa Twin",
    category: "Suspensión",
    name: "Amortiguador trasero ajustable",
    oldPrice: 400,
    price: 370,
    rating: 4.7,
    image: rossi,
    description: "Amortiguador trasero con ajuste de precarga y rebote."
  },
  {
    id: 13,
    brand: "Suzuki",
    model: "V-Strom 650",
    category: "Accesorios",
    name: "Top case Givi 47L",
    oldPrice: 280,
    price: 250,
    rating: 4.8,
    image: rossi,
    description: "Top case espacioso para almacenamiento seguro en viajes largos."
  },
  {
    id: 14,
    brand: "Kawasaki",
    model: "Z900",
    category: "Escape",
    name: "Escape Yoshimura R-77",
    oldPrice: 750,
    price: 700,
    rating: 5,
    image: rossi,
    description: "Escape Yoshimura con diseño deportivo y sonido envolvente."
  },
  {
    id: 15,
    brand: "BMW",
    model: "R 1250 GS",
    category: "Iluminación",
    name: "Luces auxiliares LED",
    oldPrice: 200,
    price: 180,
    rating: 4.6,
    image: rossi,
    description: "Luces auxiliares LED para mayor visibilidad en rutas nocturnas."
  }
];



export const productsData = async()=>{
 /*  const products = await axios.get("https://fakestoreapiserver.reactbd.com/products") */
  return products;
}



