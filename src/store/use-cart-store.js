import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      productData: [],
      userInfo: null,

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.productData.find((item) => item.id === product.id);
      
          if (existingItem) {
            const newQuantity = Math.min(
              existingItem.quantity + (product.quantity),
              existingItem.quantity_stock
            );
      
            return {
              productData: state.productData.map((item) =>
                item.id === product.id ? { ...item, quantity: newQuantity } : item
              ),
            };
          }
      
          return {
            productData: [
              ...state.productData,
              { ...product, quantity: Math.min(product.quantity, product.quantity_stock) },
            ],
          };
        }),

      deleteFromCart: (id) =>
        set((state) => ({
          productData: state.productData.filter((item) => item.id !== id),
        })),

      resetCart: () => set({ productData: [] }),

      incrementQuantity: (id) =>
        set((state) => ({
          productData: state.productData.map((item) =>
            item.id === id && item.quantity < item.quantity_stock
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decrementQuantity: (id) =>
        set((state) => ({
          productData: state.productData.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
          ),
        })),

      addUser: (user) => set({ userInfo: user }),

      removeUser: () => set({ userInfo: null }),
    }),
    {
      name: "bazar-storage",
      getStorage: () => localStorage, // Especifica que se use sessionStorage // Asegura que se usa localStorage correctamente
    }
  )
);
