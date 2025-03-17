import { create } from "zustand";
import rossi from "../assets/rossi.png";

export const useProductStore = create((set, get) => ({
  products: [],

  fetchProducts: async () => {
    if (get().products.length > 0) {
      console.log("segui de largo");
      return; // Evita recargar datos si ya existen
    }

    try {
      console.log("llame la api");

      // Datos base para generar productos aleatorios
      const brands = ["Suzuki", "Kawasaki", "BMW", "Honda", "Yamaha", "Ducati"];
      const models = ["V-Strom 650", "Z900", "R 1250 GS", "CBR600RR", "MT-09", "Panigale V4"];
      const categories = ["Accesorios", "Escape", "Iluminación", "Neumáticos", "Suspensión", "Electrónica"];
      const names = ["Top case Givi 47L", "Escape Yoshimura R-77", "Luces auxiliares LED", "Casco Shoei", "Llantas Michelin", "Amortiguadores Öhlins"];
      const descriptions = [
        "Producto de alta calidad para mejorar tu experiencia en la moto.",
        "Ideal para largas rutas y mayor seguridad.",
        "Mejora la estética y el rendimiento de tu moto.",
        "Equipamiento premium para los más exigentes."
      ];

      // Función para generar un producto aleatorio
      const generateRandomProduct = (id) => ({
        id,
        brand: brands[Math.floor(Math.random() * brands.length)],
        model: models[Math.floor(Math.random() * models.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        name: names[Math.floor(Math.random() * names.length)],
        oldPrice: Math.floor(Math.random() * 1000) + 100, // Precio antiguo aleatorio entre 100 y 1100
        price: Math.floor(Math.random() * 900) + 100, // Precio actual aleatorio entre 100 y 1000
        rating: (Math.random() * 2 + 3).toFixed(1), // Rating entre 3.0 y 5.0
        image: rossi,
        description: descriptions[Math.floor(Math.random() * descriptions.length)]
      });

      // Generar 1000 productos aleatorios
      const products = Array.from({ length: 1000 }, (_, index) => generateRandomProduct(index + 1));

      // Guardar en Zustand
      set({ products });

      console.log("Productos generados:", products.length);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  }
}));
